"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toast, useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface Props {
  id: number;
}

const handleClick = async (id: number, router: AppRouterInstance) => {
  const supabase = createClient();
  const { error } = await supabase.from("cart_items").delete().eq("id", id);
  if (error) {
    console.error(error);
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

  return (
    <TrashIcon
      size={24}
      onClick={() => handleClick(id, router)}
      className="cursor-pointer stroke-gold-700 transition-colors hover:stroke-gold-600"
    />
  );
}
