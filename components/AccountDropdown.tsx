import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { User } from "lucide-react";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function AccountDropdown() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = user?.user_metadata.admin;

  if (user)
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="group">
              <User className="size-5 stroke-gold-200 transition-colors group-hover:stroke-gold-400" />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col text-nowrap px-8 py-6">
              <h1 className="select-none text-lg font-bold">Your Account</h1>
              <SignOutButton />
              <hr className="mt-1.5 border-gold-800" />
              <Link href="/account" legacyBehavior passHref>
                <NavigationMenuLink className="mt-2 font-sans text-sm text-muted-foreground transition-colors hover:text-stone-500">
                  Account
                </NavigationMenuLink>
              </Link>
              <Link href="/account/orders" legacyBehavior passHref>
                <NavigationMenuLink className="mt-0.5 font-sans text-sm text-muted-foreground transition-colors hover:text-stone-500">
                  Orders
                </NavigationMenuLink>
              </Link>
              {isAdmin && (
                <>
                  <hr className="mt-1.5 border-gold-800" />
                  <Link href="/admin" legacyBehavior passHref>
                    <NavigationMenuLink className="mt-0.5 font-sans text-sm text-stone-500 transition-colors hover:text-stone-600">
                      Admin Panel
                    </NavigationMenuLink>
                  </Link>
                </>
              )}
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  else
    return (
      <Link href="/sign-in">
        <User className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
      </Link>
    );
}
