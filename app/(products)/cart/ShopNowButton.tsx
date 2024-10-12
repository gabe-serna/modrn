"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ShopNowButton = () => {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.push("/decor")}
      className="mt-8 bg-gold-500 text-lg font-bold text-background hover:bg-gold-600"
    >
      Shop Now
    </Button>
  );
};

export default ShopNowButton;
