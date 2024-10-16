import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import OrderList from "./OrderList";

export default async function Orders() {
  return (
    <>
      <div className="flex items-center pl-4">
        <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
        <form className="w-full">
          <div className="relative ml-8 w-full md:w-2/3 lg:w-1/2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
        </form>
      </div>
      <div className="max-h-[calc(100vh-12rem)] min-h-[calc(100vh-12rem)] w-auto overflow-y-scroll">
        <OrderList />
      </div>
    </>
  );
}
