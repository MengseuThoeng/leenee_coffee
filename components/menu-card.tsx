import { MenuItem } from "@/lib/menu-data";
import Image from "next/image";

interface MenuCardProps {
  item: MenuItem;
}

export function MenuCard({ item }: MenuCardProps) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/50">
      {/* Image */}
      <div className="relative h-125 w-full overflow-hidden bg-muted">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
            {item.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Temperature Options */}
        {(item.hot || item.iced) && (
          <div className="flex gap-2 pt-2 border-t border-border/50">
            {item.hot && (
              <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-700 dark:text-orange-400">
                Hot
              </span>
            )}
            {item.iced && (
              <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-700 dark:text-blue-400">
                Iced
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
