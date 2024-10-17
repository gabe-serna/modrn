"use client";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { formatDateToLocal, getShippingMessage } from "@/utils/dates";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrderTab } from "./page";
import { NewOrder } from "./(data)/NewOrder";
import { TransitOrder } from "./(data)/TransitOrder";

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
      name: string;
      image_url: string;
    };
  }[];
}

export default function OrderList({ activeTab }: { activeTab: OrderTab }) {
  const [orders, setOrders] = useState<CartData[] | null>(null);

  useEffect(() => {
    async function fetchOrders(activeTab: OrderTab) {
      setOrders(null);
      const supabase = createClient();

      switch (activeTab) {
        case "new": {
          const { data, error: err } = await supabase
            .from("orders")
            .select("*, order_items(id, quantity, products(name, image_url))")
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
          const { data, error: err } = await supabase
            .from("orders")
            .select("*, order_items(id, quantity, products(name, image_url))")
            .eq("shipment_status", "TRANSIT")
            .order("created_at", { ascending: true })
            .returns<CartData[]>();
          if (err) {
            console.error(err);
            return;
          }
          setOrders(data);
          break;
        }
        case "fulfilled": {
        }
        case "all": {
        }
      }
    }
    fetchOrders(activeTab);
  }, [activeTab]);

  switch (activeTab) {
    case "new":
      return <NewOrder orders={orders} />;
    case "transit":
      return <TransitOrder orders={orders} />;
    default:
      return <div>Not implemented</div>;
  }
}
