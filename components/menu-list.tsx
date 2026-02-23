"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/lib/menu-data";
import { MenuCard } from "./menu-card";
import { MenuFilter } from "./menu-filter";
import { useLanguage } from "@/lib/i18n";

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        const response = await fetch('/api/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        console.error('Error fetching menu:', err);
        setError(t('menu.error'));
      } finally {
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground">{t('menu.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    );
  }

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
          <p className="text-muted-foreground">{t('menu.empty')}</p>
        </div>
      )}
    </div>
  );
}
