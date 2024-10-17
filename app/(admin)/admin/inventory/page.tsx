"use client";
import InventoryHeader from "./InventoryHeader";
import { useState } from "react";
import InventoryList from "./InventoryList";

export interface InventorySearch {
  search: string;
  filter: Filter;
  order: {
    field: OrderField;
    direction: boolean;
  };
}
export type Filter = "all" | "decor" | "office";
export type OrderField = "name" | "price" | "total_stock" | "ordered_stock";

export default function Inventory() {
  const [search, setSearch] = useState({
    search: "",
    filter: "all",
    order: { field: "name", direction: true },
  } as InventorySearch);

  return (
    <div className="mx-auto min-w-[1012px] max-w-[1012px]">
      <InventoryHeader search={search} setSearch={setSearch} />
      <div className="mt-1 flex max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] max-w-[1012px] items-start overflow-y-scroll rounded-lg border">
        <InventoryList search={search} />
      </div>
    </div>
  );
}
