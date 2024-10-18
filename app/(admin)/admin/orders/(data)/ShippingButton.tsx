"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartData } from "../OrderList";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function ShippingButton({ order }: { order: CartData }) {
  function generateRandomNumber() {
    const length = 13;
    const randomPart = Math.floor(Math.random() * Math.pow(10, length - 1));
    return `9${randomPart}`;
  }
  async function handleShipping() {
    const supabase = createClient();

    //Update the order to mark it as shipped
    const { error } = await supabase
      .from("orders")
      .update({
        shipment_status: "PRE_TRANSIT",
        shipped_at: new Date(),
        tracking_number: generateRandomNumber(),
        carrier: "USPS",
      })
      .eq("id", order.id);
    if (error) {
      toast({ title: "Error", description: error.message });
      return;
    }

    //Update product stock
    for (let item of order.order_items) {
      const { error: productError } = await supabase
        .from("products")
        .update({ total_stock: item.products.total_stock - item.quantity })
        .eq("id", item.products.id);
      if (productError) {
        toast({
          title: "Completed with Error",
          description: productError.message,
        });
        return;
      }
    }

    window.location.pathname = "/admin/orders";
    toast({ title: "Success", description: "Order marked as shipped" });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-4 bg-gold-800 text-base font-bold tracking-wide text-foreground hover:bg-gold-700">
          Buy Shipping Label
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Buy Shipping Label
          </DialogTitle>
          <DialogDescription>
            Insert weight and dimensions to get a shipping label.
            <Button
              className="mt-4 bg-gold-800 font-serif text-base font-bold tracking-wide text-foreground hover:bg-gold-700"
              onClick={handleShipping}
            >
              Mark as Shipped
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
