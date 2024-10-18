"use client";

import { Home, ShoppingCart, Package, Users, LineChart } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface Props {
  orders: number | null;
  screen: "desktop" | "mobile";
}

export default function AdminNav({ orders, screen }: Props) {
  const pathname = usePathname();
  const isDesktop = screen === "desktop";

  const baseStyle = "size-5 stroke-stone-600";
  const activeStyle = "size-5 stroke-gold-600";
  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: (
        <Home className={"/admin" === pathname ? activeStyle : baseStyle} />
      ),
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: (
        <ShoppingCart
          className={"/admin/orders" === pathname ? activeStyle : baseStyle}
        />
      ),
      badge: orders,
    },
    {
      href: "/admin/inventory",
      label: "Inventory",
      icon: (
        <Package
          className={"/admin/inventory" === pathname ? activeStyle : baseStyle}
        />
      ),
    },
  ];
  if (isDesktop)
    return (
      <nav className="grid items-start px-2 text-lg font-medium lg:px-4">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all " +
                (isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <Badge className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-red-700 font-sans text-sm font-bold text-red-100 hover:bg-red-700">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    );
  else
    return (
      <nav className="mt-6 grid gap-2 text-xl font-medium">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 " +
                (isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {item.icon}
              {item.label}
              {item.badge && (
                <Badge className="ml-auto flex size-8 shrink-0 items-center justify-center rounded-full bg-red-700 font-sans text-base font-bold text-red-100 hover:bg-red-700">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </nav>
    );
}
