"use client";

import { useLanguage } from "@/lib/i18n";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 p-1 rounded-full bg-secondary/35 border border-border/30 backdrop-blur-md shadow-inner">
      <button
        onClick={() => setLocale("en")}
        className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
          locale === "en"
            ? "bg-gold-gradient text-primary-foreground shadow-[0_2px_8px_rgba(203,163,79,0.25)]"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("km")}
        className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 cursor-pointer leading-normal ${
          locale === "km"
            ? "bg-gold-gradient text-primary-foreground shadow-[0_2px_8px_rgba(203,163,79,0.25)] font-sans font-bold"
            : "text-muted-foreground hover:text-foreground hover:bg-secondary/20"
        }`}
      >
        ខ្មែរ
      </button>
    </div>
  );
}

