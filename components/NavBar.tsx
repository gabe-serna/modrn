"use server";

import { createClient } from "@/utils/supabase/server";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import AccountDropdown from "./AccountDropdown";
import { Badge } from "@/components/ui/badge";

const NavBar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("stripe_customers")
    .select("name")
    .eq("user_id", user?.id)
    .single();
  if (error) console.log("error", error);

  const { count: countResult } = await supabase
    .from("cart_items")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user?.id);

  const count = !countResult ? null : countResult > 0 ? countResult : null;
  const isAdmin = user?.user_metadata.admin;

  return (
    <nav className="fixed z-50 flex h-20 w-full items-center justify-center space-x-8 border-b border-b-foreground/10 bg-background">
      <Link
        href="/decor"
        className="text-lg uppercase text-gold-200 transition-colors hover:text-gold-300"
      >
        Decor
      </Link>
      <Link href="/" className="text-4xl text-gold-500">
        MODRN
      </Link>
      <Link
        href="/office"
        className="text-lg uppercase text-gold-200 transition-colors hover:text-gold-300"
      >
        Office
      </Link>
      <div className="absolute right-10 flex items-center justify-center space-x-5">
        {user && (
          <h2 className="font-sans text-sm italic text-stone-500">
            Welcome, {data?.name || "User"} {isAdmin && "(Admin)"}
          </h2>
        )}
        <Link href="/cart" className="relative">
          <ShoppingCart className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
          {count && (
            <Badge className="absolute -right-4 -top-3 flex size-4 items-center justify-center bg-red-700 p-2 font-sans text-xs font-bold text-red-100 hover:bg-red-700">
              {count}
            </Badge>
          )}
        </Link>
        <AccountDropdown />
      </div>
    </nav>
  );
};

export default NavBar;
