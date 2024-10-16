import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { useEffect } from "react";

export default async function OrderList() {
  const supabase = createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("order_status", "UNFULFILLED");

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {orders ? (
        orders.map((order) => (
          <div key={order.id} className="flex flex-col items-center gap-1">
            <h1>{order.id}</h1>
            <p>{order.email}</p>
          </div>
        ))
      ) : (
        <>
          <h3 className="text-2xl font-bold tracking-tight">
            You have no products
          </h3>
          <p className="text-sm text-muted-foreground">
            You can start selling as soon as you add a product.
          </p>
          <Button className="mt-4">Add Product</Button>
        </>
      )}
    </div>
  );
}
