"use server";

import { createClient } from "@/utils/supabase/server";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

const NavBar = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      <div className="absolute right-10 flex space-x-5">
        {user && (
          <h2 className="font-sans text-sm italic text-stone-500">
            Welcome, {user.email}
          </h2>
        )}
        <Link href="/cart">
          <ShoppingCart className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
        </Link>
        <Link href={user ? "/account" : "/sign-in"}>
          <User className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
