"use client";

import { useState, useEffect } from "react";
import { MenuItem } from "@/lib/menu-data";
import { MenuCard } from "./menu-card";
import { MenuFilter } from "./menu-filter";
import { useLanguage } from "@/lib/i18n";
import { Search, X } from "lucide-react";

export function MenuList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t, locale } = useLanguage();

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

  const filteredItems = menuItems.filter((item) => {
    // 1. Category filter
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    
    // 2. Search query filter
    if (!searchQuery.trim()) return matchesCategory;
    
    const query = searchQuery.toLowerCase().trim();
    const nameEn = (item.name || "").toLowerCase();
    const nameKm = (item.name_km || "").toLowerCase();
    const descEn = (item.description || "").toLowerCase();
    const descKm = (item.description_km || "").toLowerCase();
    
    const matchesSearch =
      nameEn.includes(query) ||
      nameKm.includes(query) ||
      descEn.includes(query) ||
      descKm.includes(query);
      
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-4 text-muted-foreground font-sans font-bold">{t('menu.loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 font-sans font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Premium Product Search Bar */}
      <div className="mb-8 max-w-xl mx-auto animate-fade-in-up">
        <div className="relative group">
          {/* Magnifying Glass Icon */}
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
            <Search className="h-5 w-5 stroke-[2.5]" />
          </div>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={locale === "km" ? "ស្វែងរកភេសជ្ជៈ ឬនំ..." : "Search coffee, tea, pastries..."}
            className="w-full pl-12 pr-10 py-3.5 bg-card/45 backdrop-blur-md border border-border/40 focus:border-primary/80 focus:ring-2 focus:ring-primary/10 rounded-2xl text-foreground text-base placeholder:text-muted-foreground/50 transition-all font-sans font-semibold outline-none shadow-sm focus:shadow-md"
          />
          
          {/* Quick Clear Icon */}
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground/50 hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <MenuFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Menu Grid */}
      {filteredItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <MenuCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      {/* Empty Search State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 animate-fade-in-up max-w-md mx-auto bg-card/25 backdrop-blur-sm border border-border/20 rounded-2xl p-8 shadow-sm">
          <span className="text-5xl block mb-4 select-none">🔍</span>
          <h3 className="text-lg font-bold text-foreground mb-1 font-sans">
            {locale === "km" ? "រកមិនឃើញមុខម្ហូបទេ" : "No items found"}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-sans font-medium">
            {locale === "km" 
              ? "សូមព្យាយាមវាយពាក្យស្វែងរកផ្សេងទៀត ឬប្តូរប្រភេទមុខម្ហូប!" 
              : "Try checking your spelling or selecting another category filter!"}
          </p>
        </div>
      )}
    </div>
  );
}
