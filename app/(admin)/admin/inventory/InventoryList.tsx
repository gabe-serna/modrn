"use client";

import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { InventorySearch } from "./page";
import { createClient } from "@/utils/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function InventoryList({ search }: { search: InventorySearch }) {
  const [inventory, setInventory] = useState<InventoryData[] | null>(null);

  useEffect(() => {
    async function getInventory(search: InventorySearch) {
      setInventory(null);
      const supabase = createClient();

      if (search.filter === "all") {
        if (!search.search) {
          // All Products, No Search
          const { data, error: err } = await supabase
            .from("products")
            .select(
              "id, name, price, category, image_url, available_stock, total_stock, ordered_stock",
            )
            .order(search.order.field, { ascending: search.order.direction })
            .returns<InventoryData[]>();
          if (err) {
            console.error(err);
            return;
          }
          setInventory(data);
          return;
        } else {
          // All Products, With Search
          const { data, error: err } = await supabase
            .from("products")
            .select(
              "id, name, price, category, image_url, available_stock, total_stock, ordered_stock",
            )
            .ilike("name", `%${search.search}%`)
            .order(search.order.field, { ascending: search.order.direction })
            .returns<InventoryData[]>();
          if (err) {
            console.error(err);
            return;
          }
          setInventory(data);
          return;
        }
      }
      if (!search.filter) {
        //Filtered Products, No Search
        const { data, error: err } = await supabase
          .from("products")
          .select(
            "id, name, price, category, image_url, available_stock, total_stock, ordered_stock",
          )
          .eq("category", search.filter as string)
          .order(search.order.field, { ascending: search.order.direction })
          .returns<InventoryData[]>();
        if (err) {
          console.error(err);
          return;
        }
        setInventory(data);
        return;
      }
      // Filtered Products, Search
      const { data, error: err } = await supabase
        .from("products")
        .select(
          "id, name, price, category, image_url, available_stock, total_stock, ordered_stock",
        )
        .ilike("name", `%${search.search}%`)
        .eq("category", search.filter as string)
        .order(search.order.field, { ascending: search.order.direction })
        .returns<InventoryData[]>();
      if (err) {
        console.error(err);
        return;
      }
      setInventory(data);
      return;
    }
    getInventory(search);
  }, [search]);

  if (!inventory) {
    return (
      <Table className="size-full max-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">In Stock</TableHead>
            <TableHead>Ordered</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_value, index) => (
            <TableRow key={index}>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="aspect-square size-16 rounded-md object-cover" />
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-6 w-72" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-10" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-16" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-6" />
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else
    return (
      <Table className="size-full max-w-[1000px]">
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">In Stock</TableHead>
            <TableHead>Ordered</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inventory?.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.image_url}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                ${product.price}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className="bg-muted px-3 text-base">
                  {product.category.slice(0, 1).toUpperCase() +
                    product.category.slice(1)}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.total_stock}
              </TableCell>
              <TableCell>
                {product.ordered_stock > 0 ? product.ordered_stock : ""}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <EllipsisVertical className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="font-sans">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
}

interface InventoryData {
  id: number;
  name: string;
  price: number;
  category: string;
  image_url: string;
  available_stock: number;
  total_stock: number;
  ordered_stock: number;
}
