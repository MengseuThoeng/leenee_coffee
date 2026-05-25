"use client";

import { MenuList } from "@/components/menu-list";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/i18n";
import { Coffee, ChevronDown, Sparkles, BookOpen } from "lucide-react";

const SteamingCoffeeCup = () => (
  <div className="relative inline-flex items-center justify-center w-28 h-28 mb-4 group">
    {/* Steam Lines rising dynamically */}
    <svg className="absolute -top-7 w-14 h-14 text-primary opacity-80" viewBox="0 0 40 40">
      <path className="steam-line-1" d="M12 32 C 10 22, 17 17, 14 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path className="steam-line-2" d="M20 34 C 18 24, 25 19, 22 7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path className="steam-line-3" d="M28 32 C 26 22, 33 17, 30 5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    
    {/* Decorative Glowing Circle */}
    <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl group-hover:bg-primary/20 transition-all duration-700 scale-125"></div>
    
    {/* Elegant Gold Coffee Cup with Lotus Motif */}
    <svg className="w-24 h-24 text-primary drop-shadow-[0_0_15px_rgba(203,163,79,0.3)] transition-transform duration-500 group-hover:scale-105" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cup Body */}
      <path d="M20 32C20 32 22 72 50 72C78 72 80 32 80 32H20Z" stroke="currentColor" strokeWidth="3.5" strokeLinejoin="round" />
      {/* Handle */}
      <path d="M80 42C88 42 93 50 91 56C89 62 80 64 80 64" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      {/* Saucer */}
      <path d="M12 82H88" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" />
      {/* Lotus blossom engraving detail */}
      <path d="M50 42 C46 54, 46 64, 50 66 C54 64, 54 54, 50 42 Z" fill="currentColor" className="text-primary/40" />
      <path d="M42 49 C38 56, 42 62, 46 62 C45 56, 45 51, 42 49 Z" fill="currentColor" className="text-primary/30" />
      <path d="M58 49 C62 56, 58 62, 54 62 C55 56, 55 51, 58 49 Z" fill="currentColor" className="text-primary/30" />
    </svg>
  </div>
);

export default function Home() {
  const { t, locale } = useLanguage();

  const handleScrollToMenu = () => {
    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-x-hidden">
      
      {/* Ambient background glows for temple sandstone vibe */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_top,_var(--color-primary)_0%,_transparent_60%)] opacity-[0.07] pointer-events-none z-0"></div>
      <div className="absolute top-[800px] right-0 w-80 h-80 bg-[radial-gradient(circle,_var(--color-secondary)_0%,_transparent_70%)] opacity-[0.03] pointer-events-none z-0"></div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/40 transition-all duration-300">
        <div className="container mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                <Coffee className="h-4.5 w-4.5" />
              </div>
              <div>
                <h1 className="text-base font-bold font-moul text-gold-gradient tracking-normal leading-relaxed">
                  លីនី កាហ្វេ
                </h1>
                <p className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/80 font-medium leading-none">
                  Leenee Coffee
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center px-4 py-16 text-center z-10">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Animated Steaming Cup */}
          <SteamingCoffeeCup />
          
          {/* Bilingual Brand Badging */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary-foreground text-xs font-semibold mb-6 animate-pulse ${locale === 'en' ? 'uppercase tracking-wider' : 'tracking-normal'}`}>
            <Sparkles className="h-3 w-3 text-primary" />
            <span>{locale === "km" ? "រសជាតិខ្មែរពិតៗ" : "Authentic Khmer Taste"}</span>
          </div>

          {/* Majestic Hero Headings */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-normal text-foreground mb-4 leading-normal">
            <span className="font-moul text-gold-gradient block mb-3 text-5xl sm:text-7xl lg:text-8xl leading-[1.3] py-2 filter drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
              លីនី កាហ្វេ
            </span>
            <span className="font-sans uppercase tracking-[0.25em] text-2xl sm:text-4xl lg:text-5xl font-light text-muted-foreground/80 block">
              Leenee Coffee
            </span>
          </h1>

          {/* Tagline & Subtext */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary font-medium font-sans italic mb-4 max-w-2xl leading-relaxed">
            "{locale === "km" ? "បង្កើតដោយចំណង់ចំណូលចិត្ត ផ្តល់ដោយក្ដីស្រឡាញ់" : "Crafted with passion, served with love"}"
          </p>
          
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans">
            {locale === "km" 
              ? "សូមអញ្ជើញមកទទួលយកបទពិសោធន៍កាហ្វេដ៏ល្អឯក បង្កើតឡើងយ៉ាងសម្រិតសម្រាំងបំផុតជាមួយគ្រឿងផ្សំក្នុងស្រុកដ៏ស្រស់បំព្រង។"
              : "Immerse yourself in our premium, hand-crafted drinks. Locally sourced, passionately brewed, and served in an elegant, cultural sanctuary."
            }
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleScrollToMenu}
              className="group relative px-8 py-3.5 rounded-full font-semibold text-primary-foreground bg-gold-gradient shadow-[0_4px_20px_rgba(203,163,79,0.35)] transition-all duration-300 hover:shadow-[0_6px_25px_rgba(203,163,79,0.5)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-[-25deg] -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              <span className="flex items-center gap-2">
                {t("menu.title")}
                <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer z-10" onClick={handleScrollToMenu}>
          <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">{locale === "km" ? "អូសចុះក្រោម" : "Scroll Down"}</span>
          <ChevronDown className="h-4 w-4 animate-bounce text-primary" />
        </div>
      </section>

      {/* Main Content / Menu Section */}
      <main id="menu-section" className="container mx-auto px-4 py-20 sm:px-6 lg:px-8 scroll-mt-20 relative z-10">
        
        {/* Title Section */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-r from-transparent to-primary/80"></div>
            <h2 className={`text-3xl sm:text-4xl font-bold text-foreground font-sans flex items-center gap-3 ${locale === 'en' ? 'uppercase tracking-[0.15em]' : 'tracking-normal'}`}>
              <span>{t("menu.title")}</span>
            </h2>
            <div className="h-[1px] w-8 sm:w-16 bg-gradient-to-l from-transparent to-primary/80"></div>
          </div>
          
          <div className="h-1.5 w-12 bg-primary mx-auto rounded-full mb-6 relative">
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></div>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("menu.subtitle")}
          </p>
        </div>

        {/* Menu List */}
        <MenuList />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/60 backdrop-blur-md py-12 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
              <Coffee className="h-4 w-4" />
            </div>
            <span className="font-moul tracking-normal text-gold-gradient text-lg leading-relaxed py-1">លីនី កាហ្វេ</span>
            <span className="text-muted-foreground/30">|</span>
            <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Leenee Coffee</span>
          </div>
          
          <p className="text-xs text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
            {locale === "km"
              ? "រក្សាសិទ្ធិគ្រប់យ៉ាងដោយ លីនី កាហ្វេ។ រសជាតិដ៏ប្រណីត ស្រឡាញ់គ្រឿងផ្សំក្នុងស្រុក និងលើកកម្ពស់វប្បធម៌ខ្មែរ។"
              : "Crafted in Cambodia with absolute passion. Supporting local coffee growers, honoring rich traditions, and bringing you the ultimate coffee experience."
            }
          </p>

          <p className="text-xs text-muted-foreground/60 border-t border-border/10 pt-6 max-w-xs mx-auto">
            {t("footer.rights")}
          </p>
        </div>
      </footer>
    </div>
  );
}