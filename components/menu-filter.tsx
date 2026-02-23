"use client";

import { menuCategories } from "@/lib/menu-data";

interface MenuFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilter({ selectedCategory, onCategoryChange }: MenuFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {menuCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === category
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
