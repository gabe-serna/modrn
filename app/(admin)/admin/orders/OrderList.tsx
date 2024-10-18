"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { OrderTab } from "./page";
import NewOrders from "./(data)/NewOrders";
import TransitOrders from "./(data)/TransitOrders";
import FulfilledOrders from "./(data)/FulfilledOrders";

export default function OrderList({ activeTab }: { activeTab: OrderTab }) {
  const [orders, setOrders] = useState<CartData[] | null>(null);

  useEffect(() => {
    async function fetchOrders(activeTab: OrderTab) {
      setOrders(null);
      const supabase = createClient();

      let filter;
      switch (activeTab) {
        case "new":
          filter = "UNKNOWN";
          break;
        case "transit":
          const { data, error: err } = await supabase
            .from("orders")
            .select(
              "*, order_items(id, quantity, products(id, name, image_url, total_stock))",
            )
            .or("shipment_status.eq.TRANSIT,shipment_status.eq.PRE_TRANSIT")
            .order("created_at", { ascending: true })
            .returns<CartData[]>();
          if (err) {
            console.error(err);
            return;
          }
          setOrders(data);
          return;
        case "fulfilled":
          filter = "DELIVERED";
          break;
      }

      const { data, error: err } = await supabase
        .from("orders")
        .select(
          "*, order_items(id, quantity, products(id, name, image_url, total_stock))",
        )
        .eq("shipment_status", filter)
        .order("created_at", { ascending: true })
        .returns<CartData[]>();
      if (err) {
        console.error(err);
        return;
      }
      setOrders(data);
    }
    fetchOrders(activeTab);
  }, [activeTab]);

  switch (activeTab) {
    case "new":
      return <NewOrders orders={orders} />;
    case "transit":
      return <TransitOrders orders={orders} />;
    case "fulfilled":
      return <FulfilledOrders orders={orders} />;
  }
}

export interface CartData {
  id: string;
  created_at: string;
  shipped_at: string;
  delivered_at: string;
  user_id: string;
  name: string;
  amount_total: number;
  order_status: string;
  shipment_status: string;
  tracking_number: string;
  carrier: string;
  ship_to: string;
  city: string;
  line1: string;
  line2: string;
  state: string;
  postal_code: string;
  stripe_order_id: string;
  order_items: {
    id: string;
    quantity: number;
    products: {
      id: number;
      name: string;
      image_url: string;
      total_stock: number;
    };
  }[];
}
