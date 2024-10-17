"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ArrowDownNarrowWide,
  ListFilter,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Filter, InventorySearch, OrderField } from "./page";

export default function InventoryHeader({
  search,
  setSearch,
}: {
  search: InventorySearch;
  setSearch: (search: InventorySearch) => void;
}) {
  function handleFilterChange(event: React.MouseEvent<HTMLDivElement>) {
    const filter = event.currentTarget.textContent?.toLowerCase() as Filter;
    setSearch({ ...search, filter });
  }
  function handleOrderChange(event: React.MouseEvent<HTMLDivElement>) {
    let order = event.currentTarget.textContent?.toLowerCase() as string;
    if (order === "in stock") order = "total_stock";
    if (order === "ordered") order = "ordered_stock";
    setSearch({
      ...search,
      order: { ...search.order, field: order as OrderField },
    });
  }
  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    console.log("search", event.target.value);
    setSearch({ ...search, search: event.target.value });
  }

  return (
    <div className="flex items-center">
      <h1 className="mt-1 text-lg font-semibold md:text-2xl">Inventory</h1>
      <form className="w-full pb-1">
        <div className="relative ml-8 w-full md:w-2/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            onChange={handleSearchChange}
            className="w-full appearance-none bg-background pl-8 shadow-none"
          />
        </div>
      </form>
      <div className="flex items-center">
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="group flex h-8 w-min items-center gap-2 bg-background px-3 py-5 hover:bg-accent">
                <SlidersHorizontal className="mb-0.5 size-4 text-gold-600 group-hover:text-gold-500" />
                <span className="sr-only text-base font-bold uppercase tracking-wider text-gold-700 group-hover:text-gold-600 sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                onClick={handleFilterChange}
                checked={search.filter == "all"}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={handleFilterChange}
                checked={search.filter == "decor"}
              >
                Decor
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={handleFilterChange}
                checked={search.filter == "office"}
              >
                Office
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="group flex h-8 w-min items-center gap-2 bg-background px-3 py-5 hover:bg-accent">
                <ListFilter
                  className={`mb-0.5 size-4 text-gold-600 transition-transform group-hover:text-gold-500 ${
                    search.order.direction ? "rotate-180" : ""
                  }`}
                />
                <span className="sr-only text-base font-bold uppercase tracking-wider text-gold-700 group-hover:text-gold-600 sm:not-sr-only sm:whitespace-nowrap">
                  Order By
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button
                className="text-serif h-min bg-card py-1.5 font-sans uppercase text-stone-500 hover:bg-accent"
                onClick={() =>
                  setSearch({
                    ...search,
                    order: {
                      ...search.order,
                      direction: !search.order.direction,
                    },
                  })
                }
              >
                {search.order.direction == true ? "ascending" : "descending"}
              </Button>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onClick={handleOrderChange}
                checked={search.order.field == "name"}
              >
                Name
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={handleOrderChange}
                checked={search.order.field == "price"}
              >
                Price
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={handleOrderChange}
                checked={search.order.field == "total_stock"}
              >
                In Stock
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={handleOrderChange}
                checked={search.order.field == "ordered_stock"}
              >
                Ordered
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
