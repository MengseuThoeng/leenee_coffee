"use client";

import { useState } from "react";
import { menuItems } from "@/lib/menu-data";
import { MenuCard } from "./menu-card";
import { MenuFilter } from "./menu-filter";

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className="w-full">
      {/* Filter */}
      <div className="mb-8">
        <MenuFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
