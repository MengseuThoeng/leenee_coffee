"use client";

import { MenuItem } from "@/lib/menu-data";
import { useLanguage } from "@/lib/i18n";
import { Flame, Snowflake } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
  index: number;
}

export function MenuCard({ item, index }: MenuCardProps) {
  const { t, locale } = useLanguage();

  // Pick primary and secondary bilingual labels
  const primaryName = locale === "km" && item.name_km ? item.name_km : item.name;
  const secondaryName = locale === "km" ? item.name : (item.name_km || null);
  
  const primaryDesc = locale === "km" && item.description_km ? item.description_km : item.description;
  const secondaryDesc = locale === "km" ? item.description : (item.description_km || null);

  return (
    <div
      style={{ animationDelay: `${index * 70}ms` }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border-gold-emboss bg-card/45 backdrop-blur-md border border-border/30 shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_10px_35px_rgba(203,163,79,0.15)] hover:-translate-y-1 animate-fade-in-up"
    >
      
      {/* Decorative Glow */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>

      {/* Image Section */}
      <div className="relative h-72 w-full overflow-hidden bg-muted/40">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted/20">
            <span className="text-5xl opacity-40">☕</span>
          </div>
        )}
        
        {/* Subtle vignette over the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

        {/* Premium Gold Emblem Price Badge */}
        <div className="absolute top-4 right-4 rounded-full bg-gold-gradient px-4 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-white/10">
          <p className="text-lg font-bold text-primary-foreground tracking-wide font-sans">
            ${(parseFloat(String(item.price)) || 0).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Card Details */}
      <div className="flex flex-col gap-3 p-6 flex-1 relative z-10">

        {/* Item Info */}
        <div className="flex-1">
          {/* Primary Name */}
          <h3 className={`text-xl font-bold text-foreground leading-normal ${locale === "km" ? "font-sans font-bold" : "font-sans"}`}>
            {primaryName}
          </h3>
          
          {/* Secondary Bilingual Title */}
          {secondaryName && (
            <p className={`text-xs font-semibold text-primary mt-1 font-sans ${locale === "km" ? "uppercase tracking-wider" : "tracking-normal leading-normal"}`}>
              {secondaryName}
            </p>
          )}

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mt-3 font-light">
            {primaryDesc}
          </p>
          
          {/* Optional translation detail in italics for rich bilingual reading */}
          {locale === "en" && secondaryDesc && (
            <p className="text-[11px] text-muted-foreground/50 leading-relaxed italic mt-1 font-sans font-normal">
              {secondaryDesc}
            </p>
          )}
        </div>

        {/* Temperature Options */}
        {(item.hot || item.iced) && (
          <div className="flex gap-2.5 pt-4 mt-2 border-t border-border/20">
            {item.hot && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3.5 py-1 text-[11px] font-bold text-amber-500 border border-amber-500/20 shadow-[0_2px_8px_rgba(245,158,11,0.08)]">
                <Flame className="h-3 w-3" />
                {t('temp.hot')}
              </span>
            )}
            {item.iced && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3.5 py-1 text-[11px] font-bold text-cyan-400 border border-cyan-500/20 shadow-[0_2px_8px_rgba(6,182,212,0.08)]">
                <Snowflake className="h-3 w-3" />
                {t('temp.iced')}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

