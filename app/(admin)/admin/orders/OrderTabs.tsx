"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { OrderTab } from "./page";

export default function OrderTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: OrderTab;
  setActiveTab: (value: OrderTab) => void;
}) {
  const handleSelect = (value: OrderTab | "") => {
    if (value === "") return;
    setActiveTab(value);
  };

  return (
    <ToggleGroup type="single" onValueChange={handleSelect}>
      <ToggleGroupItem
        value="new"
        data-state={activeTab === "new" ? "on" : "off"}
        aria-checked={activeTab === "new" ? "true" : "false"}
        className="pt-0.5"
      >
        NEW
      </ToggleGroupItem>
      <ToggleGroupItem
        value="transit"
        data-state={activeTab === "transit" ? "on" : "off"}
        aria-checked={activeTab === "transit" ? "true" : "false"}
        className="pt-0.5"
      >
        TRANSIT
      </ToggleGroupItem>
      <ToggleGroupItem
        value="fulfilled"
        data-state={activeTab === "fulfilled" ? "on" : "off"}
        aria-checked={activeTab === "fulfilled" ? "true" : "false"}
        className="pt-0.5"
      >
        FULFILLED
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
