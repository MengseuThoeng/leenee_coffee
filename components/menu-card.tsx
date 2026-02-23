"use client";

import { MenuItem } from "@/lib/menu-data";
import { useLanguage, Locale } from "@/lib/i18n";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/50">
      {/* Image */}
      <div className="relative h-80 w-full overflow-hidden bg-muted">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-4xl">☕</span>
          </div>
        )}
        {/* Price Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-2 shadow-lg">
          <p className="text-xl font-bold text-primary-foreground">
            ${item.price.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-5">

        {/* Item Info */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {locale === "km" && item.name_km ? item.name_km : item.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {locale === "km" && item.description_km ? item.description_km : item.description}
          </p>
        </div>

        {/* Temperature Options */}
        {(item.hot || item.iced) && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            {item.hot && (
              <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-700 dark:text-orange-400">
                {t('temp.hot')}
              </span>
            )}
            {item.iced && (
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                {t('temp.iced')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
