"use client";

import { menuCategories } from "@/lib/menu-data";
import { useLanguage } from "@/lib/i18n";

interface MenuFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function MenuFilter({ selectedCategory, onCategoryChange }: MenuFilterProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {menuCategories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${locale === 'en' ? 'tracking-wider uppercase' : 'tracking-normal leading-normal'} ${
              isActive
                ? "bg-gold-gradient text-primary-foreground shadow-[0_4px_15px_rgba(203,163,79,0.3)] scale-102 border border-transparent"
                : "bg-secondary/35 text-secondary-foreground hover:text-foreground border border-border/30 hover:border-primary/50 hover:bg-secondary/60 hover:-translate-y-0.5 active:translate-y-0"
            }`}
          >
            {t(`category.${category}`)}
          </button>
        );
      })}
    </div>
  );
}

