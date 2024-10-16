import type { Stripe } from "stripe";

import { NextResponse } from "next/server";

import { stripe } from "@/utils/stripe/server";
import { createAdminClient } from "@/utils/supabase/admin";

interface LineItem {
  id: number;
  quantity: number;
  stock: number;
}

interface LineItems {
  data: LineItem[];
}

export async function POST(req: Request) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      await (await req.blob()).text(),
      req.headers.get("stripe-signature") as string,
      process.env.STRIPE_WEBHOOK_SECRET as string,
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    // On error, log and return the error message.
    if (err! instanceof Error) console.log(err);
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 },
    );
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    let data;

    try {
      switch (event.type) {
        case "checkout.session.completed":
          data = event.data.object as Stripe.Checkout.Session;

          // Create new Order Entry in Supabase
          const supabaseAdmin = createAdminClient();

          const { data: order, error: orderError } = await supabaseAdmin
            .from("orders")
            .insert([
              {
                user_id: data.metadata?.user_id || null,
                email: data.customer_details?.email,
                amount_total: data.amount_total,
                amount_subtotal: data.amount_subtotal,
                stripe_order_id: data.id,
              },
            ])
            .select()
            .single();

          if (orderError || !order) {
            console.log("❌ Order creation failed: ", orderError);
            return NextResponse.json(
              { message: "Order creation failed" },
              { status: 500 },
            );
          }

          // Add Order Items to Order Entry
          const lineItems = JSON.parse(
            data.metadata?.order_items || "",
          ) as LineItem[];
          const { error: orderItemsError } = await supabaseAdmin
            .from("order_items")
            .insert(
              lineItems.map((item) => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
              })),
            );
          if (orderItemsError) {
            console.log("❌ Order items creation failed: ", orderItemsError);
            return NextResponse.json(
              { message: "Order items creation failed" },
              { status: 500 },
            );
          }

          // Update Product Stock
          lineItems.forEach(async (item) => {
            const newStock = item.stock - item.quantity;
            const { error: stockError } = await supabaseAdmin
              .from("products")
              .update({ available_stock: newStock })
              .eq("id", item.id);
            if (stockError) {
              console.log("❌ Stock update failed: ", stockError);
            }
          });

          // Empty Authenticated User Cart
          if (!data.metadata?.user_id) break;

          const { error: cartError } = await supabaseAdmin
            .from("cart_items")
            .delete()
            .eq("user_id", data.metadata.user_id);
          if (cartError) {
            console.log("❌ Clearing User Cart failed");
          }

          break;
        case "payment_intent.payment_failed":
          data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 },
      );
    }
  }
  // Return a response to acknowledge receipt of the event.
  return NextResponse.json({ message: "Received" }, { status: 200 });
}
