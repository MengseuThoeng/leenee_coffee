"use client";

import { MenuList } from "@/components/menu-list";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/i18n";
import { Coffee } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Coffee className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{t("site.name")}</h1>
                <p className="text-sm text-muted-foreground">{t("site.tagline")}</p>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Title Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-3">
            {t("menu.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("menu.subtitle")}
          </p>
        </div>

        {/* Menu List */}
        <MenuList />
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-border bg-card py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}