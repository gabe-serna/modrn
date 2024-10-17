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
  const handleSelect = (value: OrderTab) => {
    setActiveTab(value);
  };

  return (
    <ToggleGroup type="single" onValueChange={handleSelect}>
      <ToggleGroupItem
        value="new"
        data-state={activeTab === "new" ? "on" : "off"}
        className="pt-0.5"
      >
        NEW
      </ToggleGroupItem>
      <ToggleGroupItem
        value="transit"
        data-state={activeTab === "transit" ? "on" : "off"}
        className="pt-0.5"
      >
        TRANSIT
      </ToggleGroupItem>
      <ToggleGroupItem
        value="fulfilled"
        data-state={activeTab === "fulfilled" ? "on" : "off"}
        className="pt-0.5"
      >
        FULFILLED
      </ToggleGroupItem>
      <ToggleGroupItem
        value="all"
        data-state={activeTab === "all" ? "on" : "off"}
        className="pt-0.5"
      >
        ALL
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
