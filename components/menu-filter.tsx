"use client";

import { menuCategories } from "@/lib/menu-data";
import { useLanguage } from "@/lib/i18n";

interface MenuFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilter({ selectedCategory, onCategoryChange }: MenuFilterProps) {
  const { t } = useLanguage();

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
          {t(`category.${category}`)}
        </button>
      ))}
    </div>
  );
}
