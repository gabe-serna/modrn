import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Work_Sans } from "next/font/google";
import localFont from "next/font/local";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const josefinSlab = localFont({
  src: "./fonts/JosefinSlab.ttf",
  variable: "--font-josefin-slab",
  weight: "100 900",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
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
    <html
      lang="en"
      className={`${josefinSlab.variable} ${workSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <main className="flex min-h-screen flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center">
                <NavBar />
                <div className="mt-20 box-border">{children}</div>
                <Footer />
              </div>
            </main>
          </CartProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
