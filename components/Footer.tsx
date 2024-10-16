"use client";
import { ThemeSwitcher } from "./theme-switcher";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  if (pathname.includes("/admin")) return null;
  return (
    <footer className="mx-auto flex w-full items-center justify-center gap-8 border-t py-16 text-center text-xs">
      <p>
        Powered by{" "}
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          className="font-bold hover:underline"
          rel="noreferrer"
        >
          Supabase
        </a>
      </p>
      <ThemeSwitcher />
    </footer>
  );
};

export default Footer;
