"use client";

import { CartContext, CartItem } from "@/components/CartProvider";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
import { AuthSessionMissingError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function CartQuantity({ item }: { item: CartItem }) {
  const { cart, setCart } = useContext(CartContext);
  const router = useRouter();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //Check if User is Logged in
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error && !(error instanceof AuthSessionMissingError)) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred. Please try again later.",
      });
      return;
    }

    const newQuantity = parseInt(e.target.value);

    //Update Cart for Anonymous User
    if (!user) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem,
        ),
      );
      return;
    }

    //Update Cart for Authenticated User
    const { error: err } = await supabase
      .from("cart_items")
      .update([{ quantity: newQuantity }])
      .eq("id", item.id);
    if (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while updating the product quantity.",
      });
      return;
    }
    router.refresh();
  };

  return (
    <Input
      type="number"
      min={1}
      defaultValue={item.quantity}
      onChange={handleChange}
    />
  );
}
