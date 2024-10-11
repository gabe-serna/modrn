"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SettingsNav = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/account/profile",
      label: "Profile",
    },
    {
      href: "/account/billing",
      label: "Billing",
    },
    {
      href: "/account/advanced",
      label: "Advanced",
    },
  ];
  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      {links.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className={
            pathname === link.href
              ? "-ml-4 rounded-md bg-gold-800 py-1.5 pl-4 text-lg font-semibold text-primary"
              : "text-lg"
          }
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default SettingsNav;
