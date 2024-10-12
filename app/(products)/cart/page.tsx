"use server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { createClient } from "@/utils/supabase/server";
import { TrashIcon } from "lucide-react";
import Image from "next/image";

export default async function Cart() {
  //if there is a user get the items in their cart
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    //get items through state
    console.error(error);
    return;
  }

  interface CartItem {
    quantity: number;
    products: { name: string; price: number; image_url: string };
  }

  const { data: rawData, error: err } = await supabase
    .from("cart_items")
    .select(
      "id, quantity, products!product_id(name, price, image_url, amount_in_stock, category)",
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
        amount_in_stock: number;
        category: string;
      },
    };
  });

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
                ></Image>
                <div className="pl-8">
                  <h1 className="text-xl font-bold">{item.products.name}</h1>
                  <p className="font-sans text-sm text-muted-foreground">
                    {item.products.category.slice(0, 1).toUpperCase() +
                      item.products.category.slice(1)}
                  </p>
                  {item.products.amount_in_stock <= 50 ? (
                    <p className="mt-2 inline-block font-sans text-sm italic text-gold-600">
                      <b>{item.products.amount_in_stock}</b> left in stock
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
                {item.quantity}
              </TableCell>
              <TableCell>
                <TrashIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr className="border-gold-800" />
      <div className="w-full py-8 text-right text-xl">
        Subtotal:{" "}
        <b>${data.reduce((acc, item) => acc + item.products.price, 0)}</b>
      </div>
    </div>
  );
}
