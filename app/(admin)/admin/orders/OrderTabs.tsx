"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from "react";

export default function OrderTabs() {
  const [activeTab, setActiveTab] = useState("new");

  const handleSelect = (value: string) => {
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
