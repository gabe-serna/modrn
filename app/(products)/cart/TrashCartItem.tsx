"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast, useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthSessionMissingError } from "@supabase/supabase-js";
import { CartContext, CartItem } from "@/components/CartProvider";
import { useContext } from "react";

interface Props {
  id: number;
}

interface HandleClickProps {
  id: number;
  router: AppRouterInstance;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
}

const handleClick = async ({ id, router, cart, setCart }: HandleClickProps) => {
  const supabase = createClient();

  // Check if user is logged in
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error && !(error instanceof AuthSessionMissingError)) {
    console.error(error);
  }

  // Delete item from cart for Anonymous user
  if (!user) {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  }

  // Delete item from cart for Authenticated user
  const { error: err } = await supabase
    .from("cart_items")
    .delete()
    .eq("id", id);
  if (err) {
    console.error(err);
    toast({
      title: "Error",
      description: "Failed to remove item from cart",
      variant: "destructive",
    });
    return;
  }

  router.refresh();
};

export default function Cart({ id }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);

  return (
    <TrashIcon
      size={24}
      onClick={() => handleClick({ id, router, cart, setCart })}
      className="cursor-pointer stroke-gold-700 transition-colors hover:stroke-gold-600"
    />
  );
}
