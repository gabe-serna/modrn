import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { ListFilter, PlusCircle, Search, EllipsisVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default async function Inventory() {
  return (
    <div className="mx-auto min-w-[1012px] max-w-[1012px]">
      <div className="flex items-center">
        <h1 className="mt-1 text-lg font-semibold md:text-2xl">Inventory</h1>
        <form className="w-full pb-1">
          <div className="relative ml-8 w-full md:w-2/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
        </form>
        <div className="flex items-center">
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="group flex h-8 w-min items-center gap-2 bg-background px-3 py-5 hover:bg-accent">
                  <ListFilter className="mb-0.5 size-4 text-gold-600 group-hover:text-gold-500" />
                  <span className="sr-only text-base font-bold uppercase tracking-wider text-gold-700 group-hover:text-gold-600 sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Active
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="group flex h-8 w-min items-center gap-2 bg-gold-700 px-3 py-5 hover:bg-gold-600">
              <PlusCircle className="mb-0.5 size-4 text-stone-900 group-hover:text-stone-800" />
              <span className="sr-only text-base font-bold uppercase tracking-wider text-stone-900 group-hover:text-stone-800 sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </div>
        </div>
      </div>
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
