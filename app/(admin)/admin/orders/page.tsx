"use client";
import { useState } from "react";
import OrderList from "./OrderList";
import OrderTabs from "./OrderTabs";

export type OrderTab = "new" | "transit" | "fulfilled";

export default function Orders() {
  const [activeTab, setActiveTab] = useState<OrderTab>("new");

  return (
    <div className="mx-auto min-w-[1012px]">
      <div className="flex max-w-[1012px] items-center">
        <OrderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div className="mt-2 max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] max-w-[1012px] overflow-y-scroll rounded-lg border">
        <OrderList activeTab={activeTab} />
      </div>
    </div>
  );
}
