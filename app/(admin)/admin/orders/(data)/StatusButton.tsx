"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CartData } from "../OrderList";
import { createClient } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";

export default function StatusButton({ order }: { order: CartData }) {
  async function handleStatus(status: "TRANSIT" | "DELIVERED") {
    const supabase = createClient();

    // Update the order to mark it as Transit
    if (status === "TRANSIT") {
      const { error } = await supabase
        .from("orders")
        .update({
          shipment_status: "TRANSIT",
          shipped_at: new Date(),
          carrier: "USPS",
        })
        .eq("id", order.id);
      if (error) {
        toast({ title: "Error", description: error.message });
        return;
      }
    } else {
      // Update the order to mark it as Delivered
      const { error } = await supabase
        .from("orders")
        .update({
          shipment_status: "DELIVERED",
          delivered_at: new Date(),
        })
        .eq("id", order.id);
      if (error) {
        toast({ title: "Error", description: error.message });
        return;
      }
    }
    window.location.pathname = "/admin/orders";
    toast({
      title: "Success",
      description: `Order marked as ${status.toLowerCase()}`,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gold-800 text-base font-bold tracking-wide text-foreground hover:bg-gold-700">
          Update Status
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Status</DialogTitle>
          <DialogDescription>
            Simulate Tracking Updates
            <div className="flex space-x-4">
              <Button
                className="mt-4 bg-gold-800 font-serif text-base font-bold tracking-wide text-foreground hover:bg-gold-700"
                onClick={() => handleStatus("TRANSIT")}
              >
                Mark as Transit
              </Button>
              <Button
                className="mt-4 bg-gold-800 font-serif text-base font-bold tracking-wide text-foreground hover:bg-gold-700"
                onClick={() => handleStatus("DELIVERED")}
              >
                Mark as Delivered
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
