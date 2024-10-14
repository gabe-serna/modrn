"use client";
import { Message } from "@/components/form-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Success = ({ searchParams }: { searchParams: Message }) => {
  console.log("searchParams", searchParams);
  if ("success" in searchParams) {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 p-4 text-center sm:max-w-md">
        <h1 className="text-5xl">{searchParams.success}</h1>
        <ShopNowButton />
      </div>
    );
  } else {
    return (
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-2 p-4 text-center sm:max-w-md">
        <h1 className="text-5xl">Success!</h1>
        <ShopNowButton />
      </div>
    );
  }
};

export default Success;

const ShopNowButton = () => {
  return (
    <Link href="/">
      <Button className="mt-4 bg-gold-500 text-lg font-bold text-background hover:bg-gold-600">
        Go to Homepage
      </Button>
    </Link>
  );
};
