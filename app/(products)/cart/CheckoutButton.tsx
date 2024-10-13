"use client";

import { createCheckoutSession } from "@/app/actions";
import { CartItem } from "@/components/CartProvider";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CheckoutButton({ data }: { data: CartItem[] }) {
  const router = useRouter();

  const handleCheckout = async () => {
    const { url } = await createCheckoutSession(data);
    if (!url) {
      toast({ title: "Error", description: "Error creating checkout session" });
    } else router.push(url);
  };

  return (
    <Button
      className="mt-4 bg-gold-500 text-lg font-bold text-background hover:bg-gold-600"
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
}
