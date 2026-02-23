"use client";

import { useLanguage, Locale } from "@/lib/i18n";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "km" : "en");
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm font-medium"
      title={locale === "en" ? "ប្ដូរទៅភាសាខ្មែរ" : "Switch to English"}
    >
      <Globe className="h-4 w-4" />
      <span>{locale === "en" ? "ខ្មែរ" : "EN"}</span>
    </button>
  );
}
