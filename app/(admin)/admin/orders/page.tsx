import OrderList from "./OrderList";
import OrderTabs from "./OrderTabs";

export default function Orders() {
  return (
    <div className="mx-auto min-w-[1012px]">
      <div className="flex max-w-[1012px] items-center">
        <OrderTabs />
      </div>
      <div className="mt-2 max-h-[calc(100vh-11.5rem)] min-h-[calc(100vh-11.5rem)] max-w-[1012px] overflow-y-scroll rounded-lg border">
        <OrderList />
      </div>
    </div>
  );
}
