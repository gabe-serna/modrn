import { Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";

const Success = ({ searchParams }: { searchParams: Message }) => {
  if ("message" in searchParams) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 p-4 sm:max-w-md">
        <h1 className="text-5xl">{searchParams.message}</h1>
        <ShopNowButton />
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 p-4 sm:max-w-md">
        <h1 className="text-5xl">Success!</h1>
        <ShopNowButton />
      </div>
    );
  }
};

export default Success;

const ShopNowButton = () => {
  return (
    <Button className="bg-gold-500 text-lg font-bold text-background hover:bg-gold-600">
      Shop Now
    </Button>
  );
};
