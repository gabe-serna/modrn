"use server";

import { createClient } from "@/utils/supabase/server";
import { ShoppingCart, User } from "lucide-react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import SignOutButton from "./SignOutButton";

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
      <div className="absolute right-10 flex items-center justify-center space-x-5">
        {user && (
          <h2 className="font-sans text-sm italic text-stone-500">
            Welcome, {user.email}
          </h2>
        )}
        <Link href="/cart">
          <ShoppingCart className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
        </Link>
        {user ? (
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="group">
                  <User className="size-5 stroke-gold-200 transition-colors group-hover:stroke-gold-400" />
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex flex-col text-nowrap px-8 py-6">
                  <h1 className="select-none text-lg font-bold">
                    Your Account
                  </h1>
                  <SignOutButton />
                  <hr className="mt-1.5 border-gold-800" />
                  <Link href="/account" legacyBehavior passHref>
                    <NavigationMenuLink className="mt-2 font-sans text-sm text-stone-400 transition-colors hover:text-stone-500">
                      Account
                    </NavigationMenuLink>
                  </Link>
                  <Link href="/account/orders" legacyBehavior passHref>
                    <NavigationMenuLink className="mt-0.5 font-sans text-sm text-stone-400 transition-colors hover:text-stone-500">
                      Orders
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ) : (
          <Link href="/sign-in">
            <User className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
