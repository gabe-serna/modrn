"use server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import TrashCartItem from "./TrashCartItem";
import { Gem } from "lucide-react";
import ShopNowButton from "./ShopNowButton";
import CartQuantity from "./CartQuantity";
import CheckoutButton from "./CheckoutButton";

export default async function CartTableServer() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    console.error(error);
    return;
  }

  const { data: rawData, error: err } = await supabase
    .from("cart_items")
    .select(
      "id, quantity, products!product_id(name, price, image_url, available_stock, category, stripe_price_id)",
    )
    .eq("user_id", user.id);
  if (err) {
    console.error(err);
    return;
  }

  // Type assertion to treat products as a single object
  const data = rawData?.map((item) => {
    return {
      id: item.id,
      quantity: item.quantity,
      products: item.products as unknown as {
        name: string;
        price: number;
        image_url: string;
        available_stock: number;
        category: string;
        stripe_price_id: string;
      },
    };
  });

  if (data.length > 0) {
    return (
      <div className="w-[75vw] max-w-[1000px]">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="w-[100px]">Quantity</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex">
                  <Image
                    src={item.products.image_url}
                    alt={item.products.name}
                    width={150}
                    height={150}
                    priority
                  />
                  <div className="pl-8">
                    <h1 className="text-xl font-bold">{item.products.name}</h1>
                    <p className="font-sans text-sm text-muted-foreground">
                      {item.products.category.slice(0, 1).toUpperCase() +
                        item.products.category.slice(1)}
                    </p>
                    {item.products.available_stock <= 50 ? (
                      <p className="mt-2 inline-block font-sans text-sm italic text-gold-600">
                        <b>{item.products.available_stock}</b> left in stock
                      </p>
                    ) : (
                      <p className="mt-2 inline-block font-sans text-sm italic text-gold-600">
                        In stock
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-bold text-xl">
                  ${item.products.price}
                </TableCell>
                <TableCell className="text-bold text-xl">
                  <CartQuantity item={item} />
                </TableCell>
                <TableCell>
                  <TrashCartItem id={item.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <hr className="border-gold-800" />
        <div className="w-full py-8 text-right text-xl">
          <div>
            Subtotal:{" "}
            <b>
              $
              {data.reduce(
                (total, item) => total + item.products.price * item.quantity,
                0,
              )}
            </b>
          </div>
          <CheckoutButton data={data} />
        </div>
      </div>
    );
  } else
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <div
          style={{
            maskImage:
              "linear-gradient(black 0%, rgba(0,0,0,0.25) 50%, transparent 90%)",
          }}
        >
          <Gem className="size-24 stroke-gold-500" />
        </div>
        <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
        <p className="mt-2 font-sans italic text-muted-foreground">
          Explore uncompromising elegance for work and home
        </p>
        <ShopNowButton />
      </div>
    );
}
