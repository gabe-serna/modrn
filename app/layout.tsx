import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Josefin_Slab } from "next/font/google";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import UserProvider from "@/components/UserContext";

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
          <UserProvider>
            <main className="flex min-h-screen flex-col items-center">
              <div className="flex w-full flex-1 flex-col items-center">
                <NavBar />
                <div className="mt-20 box-border">{children}</div>
                <Footer />
              </div>
            </main>
          </UserProvider>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
