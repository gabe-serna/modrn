"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDateToLocal, getShippingMessage } from "@/utils/dates";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface CartData {
  id: string;
  created_at: string;
  name: string;
  total: number;
  order_status: string;
  shipment_status: string;
  ship_to: string;
  city: string;
  line1: string;
  line2: string;
  state: string;
  postal_code: string;
  order_items: {
    id: string;
    quantity: number;
    products: {
      name: string;
      image_url: string;
    };
  }[];
}

export default function OrderList({ activeTab }: { activeTab: string }) {
  const [orders, setOrders] = useState<CartData[] | null>(null);

  useEffect(() => {
    async function fetchOrders(activeTab: string) {
      switch (activeTab) {
        case "new": {
          setOrders(null);
          const supabase = createClient();
          const { data, error: err } = await supabase
            .from("orders")
            .select(
              "id, created_at, name, total:amount_total, order_status, shipment_status, ship_to, city, line1, line2, state, postal_code, order_items(id, quantity, products(name, image_url))",
            )
            .eq("shipment_status", "UNKNOWN")
            .order("created_at", { ascending: true })
            .returns<CartData[]>();
          if (err) {
            console.error(err);
            return;
          }
          setOrders(data);
          break;
        }
        case "transit": {
        }
        case "fulfilled": {
        }
        case "all":
        default: {
        }
      }
    }
    fetchOrders(activeTab);
  }, [activeTab]);

  if (!orders) {
    return (
      <Table className="size-full max-w-[1000px]">
        <TableBody>
          {Array.from({ length: 2 }).map((_value, index) => (
            <TableRow key={index}>
              <TableCell className="flex pb-16 pl-20 pt-9">
                <div className="flex flex-col">
                  <Skeleton className="h-5 w-44" />
                  <div className="mt-4 flex w-max space-x-4">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <div className="mt-4 flex flex-col space-y-4">
                    <div className="flex">
                      <Skeleton className="size-16" />
                      <div className="flex flex-col space-y-2 pl-4">
                        <Skeleton className="h-5 w-44" />
                        <Skeleton className="h-5 w-1/3" />
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-bold align-baseline text-xl">
                <div className="flex w-max flex-col pl-48">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="mt-2 h-5 w-32" />
                  <div className="mt-4 flex w-max flex-col space-y-1">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="mt-4 h-12 w-[17rem]" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  if (orders.length > 0) {
    return (
      <Table className="size-full max-w-[1000px]">
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="flex pb-16 pl-20 pt-8">
                <div className="flex flex-col">
                  <h1 className="relative text-xl font-bold tracking-wide text-foreground">
                    {order.name || "Guest"}
                  </h1>
                  <div className="flex w-max">
                    <h2 className="relative font-sans text-base text-stone-500">
                      {order.id}
                    </h2>
                    <p className="ml-4 text-base text-muted-foreground">
                      <span className="text-gold-500">$ </span>
                      {order.total / 100}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-col space-y-4">
                    {order.order_items.map((orderItem) => (
                      <div key={orderItem.id} className="flex">
                        <div className="relative size-16">
                          <Image
                            src={orderItem.products.image_url}
                            alt={orderItem.products.name}
                            width={64}
                            height={64}
                            className="min-h-min min-w-min"
                            priority
                          />
                        </div>
                        <div className="flex flex-col pl-4">
                          <Link
                            href={`/${orderItem.products.name}`}
                            className="text-lg text-foreground"
                          >
                            {orderItem.products.name}
                          </Link>
                          <p className="text-sm text-stone-500">
                            <b>{orderItem.quantity}</b>
                            {orderItem.quantity > 1 ? ` items` : ` item`}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-bold align-baseline text-xl">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-foreground">
                    {getShippingMessage(order.created_at)}
                  </h1>
                  <p className="text-sm text-stone-500">
                    Ordered {formatDateToLocal(order.created_at, true)}
                  </p>
                  <div className="mt-4 flex flex-col space-y-1 text-xs">
                    <h2 className="sr-only">Ship to</h2>
                    <p className="font-bold text-muted-foreground">
                      {order.ship_to}
                    </p>
                    <p className="text-muted-foreground">
                      {order.city}, {order.state}
                    </p>
                  </div>
                  <Button className="mt-4 bg-gold-800 text-base font-bold tracking-wide text-foreground hover:bg-gold-700">
                    Buy Shipping Label
                  </Button>
                </div>
              </TableCell>
              <TableCell className="align-baseline">
                <EllipsisVertical className="translate-y-2 cursor-pointer stroke-foreground transition-colors hover:stroke-muted-foreground" />
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
