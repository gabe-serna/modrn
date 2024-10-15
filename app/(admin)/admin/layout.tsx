import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";
import AdminNav from "./AdminNav";
import { createAdminClient } from "@/utils/supabase/admin";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = createAdminClient();
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .eq("order_status", "UNFULFILLED");

  return (
    <div className="grid min-h-[calc(100vh-5rem)] w-[calc(100vw-12px)] md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden overflow-y-hidden border-r bg-muted/40 md:block">
        <div className="mt-4 flex h-full max-h-screen flex-col gap-2">
          <div className="flex-1">
            <AdminNav orders={count} screen="desktop" />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:hidden">
          <Sheet>
            <SheetTitle />
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="size-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <AdminNav orders={count} screen="mobile" />
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
