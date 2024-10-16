import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import OrderList from "./OrderList";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default async function Orders() {
  return (
    <div className="mx-auto min-w-[1012px]">
      <div className="flex max-w-[1012px] items-center">
        <form className="flex w-full justify-between">
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search orders..."
              className="w-full appearance-none bg-background pl-8 shadow-none"
            />
          </div>
          <ToggleGroup type="single">
            <ToggleGroupItem value="all">ALL</ToggleGroupItem>
            <ToggleGroupItem value="transit">TRANSIT</ToggleGroupItem>
            <ToggleGroupItem value="fulfilled">FULFILLED</ToggleGroupItem>
          </ToggleGroup>
        </form>
      </div>
      <div className="mt-2 max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] max-w-[1012px] overflow-y-scroll rounded-lg border">
        <OrderList />
      </div>
    </div>
  );
}
