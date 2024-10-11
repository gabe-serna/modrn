import DeployButton from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Josefin_Slab } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import { ShoppingCart, User } from "lucide-react";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-josefin-slab",
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Modrn",
  description: "The Premiere Store for Modern Living",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={josefinSlab.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center">
            <div className="flex w-full flex-1 flex-col items-center">
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
                  <Link href="cart">
                    <ShoppingCart className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
                  </Link>
                  <Link href="sign-in">
                    <User className="size-5 stroke-gold-200 transition-colors hover:stroke-gold-300" />
                  </Link>
                </div>
              </nav>
              <div className="mt-20 box-border">{children}</div>

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
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
