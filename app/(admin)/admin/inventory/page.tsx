"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import InventoryHeader from "./InventoryHeader";
import { useState } from "react";

export interface InventorySearch {
  search: string;
  filter: Filter;
}
export type Filter = "all" | "decor" | "office";

export default function Inventory() {
  const [search, setSearch] = useState({
    search: "",
    filter: "all",
  } as InventorySearch);

  return (
    <div className="mx-auto min-w-[1012px] max-w-[1012px]">
      <InventoryHeader search={search} setSearch={setSearch} />
      <div className="mt-1 flex max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] max-w-[1012px] items-start overflow-y-scroll rounded-lg border">
        <Table className="size-full max-w-[1000px]">
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead className="hidden md:table-cell">
                Total Sales
              </TableHead>
              <TableHead className="hidden md:table-cell">In Stock</TableHead>
              <TableHead>Ordered</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="https://i.ibb.co/yQkJPw1/gold-stapler.webp"
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">Gold-Plated Stapler</TableCell>
              <TableCell className="hidden md:table-cell">$499.99</TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="bg-muted px-3 text-base">
                  25
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">998</TableCell>
              <TableCell>2</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <EllipsisVertical className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
