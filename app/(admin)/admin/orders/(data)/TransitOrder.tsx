import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { CartData } from "../OrderList";
import Link from "next/link";
import {
  formatDateToLocal,
  getShippingMessage,
  getTransitMessage,
} from "@/utils/dates";
import { EllipsisVertical, Mail, Truck } from "lucide-react";

export function TransitOrder({ orders }: { orders: CartData[] | null }) {
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
  } else if (orders.length > 0) {
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
                      {order.amount_total / 100}
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
                    {getTransitMessage(order.created_at)}
                  </h1>
                  <p className="text-sm text-stone-500">
                    Ordered {formatDateToLocal(order.created_at, true)}
                  </p>
                  <div className="mt-2 flex w-full flex-col space-y-1 rounded-lg border border-stone-800 p-3 pr-0">
                    <div className="flex space-x-2">
                      <Truck className="size-4 stroke-gold-700" />
                      <p className="text-xs text-stone-500">
                        {order.tracking_number}
                      </p>
                    </div>
                    <p className="text-xs text-stone-600">
                      Shipped on {formatDateToLocal(order.shipped_at, true)}{" "}
                      <span className="font-bold underline">Print</span>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-col space-y-1 text-xs">
                    <h2 className="sr-only">Ship to</h2>
                    <p className="font-bold text-muted-foreground">
                      {order.ship_to}
                    </p>
                    <p className="text-muted-foreground">
                      {order.city}, {order.state}
                    </p>
                  </div>
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
      <div className="flex max-h-[calc(100vh-12rem)] min-h-[calc(100vh-12rem)] w-full flex-col items-center justify-center">
        <div
          style={{
            maskImage:
              "linear-gradient(black 0%, rgba(0,0,0,0.25) 60%, transparent 95%)",
          }}
        >
          <Truck className="size-24 stroke-gold-500" />
        </div>
        <h1 className="text-4xl font-bold">No Orders in Transit</h1>
        <p className="mb-20 mt-2 font-sans italic text-muted-foreground">
          Relax, you're all caught up for now.
        </p>
      </div>
    );
}
