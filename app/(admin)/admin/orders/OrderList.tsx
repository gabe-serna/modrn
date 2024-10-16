import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDateToLocal } from "@/utils/formatDate";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface CartData {
  id: string;
  created_at: string;
  total: number;
  order_status: string;
  shipment_status: string;
  order_items: {
    id: string;
    quantity: number;
    products: {
      name: string;
      image_url: string;
    };
  }[];
}

export default async function OrderList() {
  const supabase = createClient();
  const { data: orders, error: err } = await supabase
    .from("orders")
    .select(
      "id, created_at, total:amount_total, order_status, shipment_status, order_items(id, quantity, products(name, image_url))",
    )
    .eq("order_status", "UNFULFILLED")
    .returns<CartData[]>();
  if (err) {
    console.error(err);
    return;
  }

  if (orders.length > 0) {
    return (
      <Table className="size-full max-w-[1000px]">
        <TableHeader>
          <TableRow className="uppercase">
            <TableHead className="tracking-wide text-gold-500">
              Your Orders
            </TableHead>
            <TableHead className="tracking-wide text-gold-500">Total</TableHead>
            <TableHead className="w-[100px] tracking-wide text-gold-500">
              Status
            </TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="flex py-12">
                <div className="flex flex-col">
                  <h1 className="relative text-2xl text-foreground">
                    <span className="absolute -left-3.5 -top-1 text-xl text-gold-500">
                      {order.id.slice(0, 1)}
                    </span>
                    {order.id.slice(1)}
                  </h1>
                  <p className="text-sm text-stone-500">
                    {formatDateToLocal(order.created_at)}
                  </p>
                </div>
                <div className="ml-16 flex flex-col space-y-4">
                  {order.order_items.map((orderItem) => (
                    <div key={orderItem.id} className="flex">
                      <div className="relative h-16 w-16">
                        <Image
                          src={orderItem.products.image_url}
                          alt={orderItem.products.name}
                          width={64}
                          height={64}
                          className="min-h-min min-w-min"
                          priority
                        />
                      </div>
                      <div className="ml-4 flex flex-col">
                        <Link
                          href={`/${orderItem.products.name}`}
                          className="text-lg text-foreground"
                        >
                          {orderItem.products.name}
                        </Link>
                        <p className="text-sm text-stone-500">
                          Qty: {orderItem.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-bold align-center text-xl">
                <span className="text-gold-500">$ </span>
                {order.total / 100}
              </TableCell>
              <TableCell className="text-bold align-center text-lg font-bold tracking-wide text-stone-500">
                {order.order_status}
              </TableCell>
              <TableCell className="align-center pt-3">
                <ChevronRight className="cursor-pointer stroke-foreground transition-colors hover:stroke-muted-foreground" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else
    return (
      <>
        <h3 className="text-2xl font-bold tracking-tight">
          You have no products
        </h3>
        <p className="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button className="mt-4">Add Product</Button>
      </>
    );
}
