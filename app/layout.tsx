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
  variable: "--font-josefin-slab"
});

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Modrn",
  description: "The Premiere Store for Modern Living"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={josefinSlab.variable} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col items-center">
            <div className="flex-1 w-full flex flex-col items-center">
              <nav className="w-full flex items-center space-x-8 justify-center border-b border-b-foreground/10 h-20 fixed bg-background z-50">
                <Link
                  href="/decor"
                  className="uppercase text-lg text-gold-200 hover:text-gold-300 transition-colors"
                >
                  Decor
                </Link>
                <Link href="/" className="text-gold-500 text-4xl">
                  MODRN
                </Link>
                <Link
                  href="/office"
                  className="uppercase text-lg text-gold-200 hover:text-gold-300 transition-colors"
                >
                  Office
                </Link>
                <div className="flex space-x-5 absolute right-10">
                  <Link href="cart">
                    <ShoppingCart className="stroke-gold-200 hover:stroke-gold-300 transition-colors size-5" />
                  </Link>
                  <Link href="profile">
                    <User className="stroke-gold-200 hover:stroke-gold-300 transition-colors size-5" />
                  </Link>
                </div>
              </nav>
              <div className="mt-20 box-border">{children}</div>

              <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
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
