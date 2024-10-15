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
import { ChevronRight, ShoppingBasket } from "lucide-react";
import ShopNowButton from "@/components/ShopNowButton";
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

export default async function Orders() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    console.error(error);
    return;
  }

  const { data, error: err } = await supabase
    .from("orders")
    .select(
      "id, created_at, total:amount_total, order_status, shipment_status, order_items(id, quantity, products(name, image_url))",
    )
    .eq("user_id", user.id)
    .returns<CartData[]>();
  if (err) {
    console.error(err);
    return;
  }

  if (data.length > 0) {
    return (
      <div className="w-[75vw] max-w-[1000px]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="uppercase">
              <TableHead className="tracking-wide text-gold-500">
                Your Orders
              </TableHead>
              <TableHead className="tracking-wide text-gold-500">
                Total
              </TableHead>
              <TableHead className="w-[100px] tracking-wide text-gold-500">
                Status
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="flex">
                  <div className="flex flex-col">
                    <h1 className="relative text-2xl text-foreground">
                      <span className="absolute -left-3.5 -top-1 text-xl text-gold-500">
                        {item.id.slice(0, 1)}
                      </span>
                      {item.id.slice(1)}
                    </h1>
                    <p className="text-sm text-stone-500">
                      {formatDateToLocal(item.created_at)}
                    </p>
                  </div>
                  <div className="ml-16 flex flex-col space-y-4">
                    {item.order_items.map((orderItem) => (
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
                <TableCell className="text-bold align-baseline text-xl">
                  <span className="text-gold-500">$ </span>
                  {item.total / 100}
                </TableCell>
                <TableCell className="text-bold align-baseline text-lg font-bold tracking-wide text-stone-500">
                  {item.order_status}
                </TableCell>
                <TableCell className="pt-[1.275rem] align-top">
                  <ChevronRight className="cursor-pointer stroke-foreground transition-colors hover:stroke-muted-foreground" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  } else
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center">
        <div
          style={{
            maskImage:
              "linear-gradient(black 0%, rgba(0,0,0,0.25) 70%, transparent 95%)",
          }}
        >
          <ShoppingBasket className="size-24 stroke-gold-500" />
        </div>
        <h1 className="text-4xl font-bold">Your Have no Orders</h1>
        <p className="mt-2 font-sans italic text-muted-foreground">
          Get started by adding items to your cart
        </p>
        <ShopNowButton />
      </div>
    );
}

function formatDateToLocal(dateString: string) {
  const date = new Date(dateString);

  const localDate = date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `${localDate}`;
}
