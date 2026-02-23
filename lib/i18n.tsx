"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Locale = "en" | "km";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Header
    "site.name": "Leenee Coffee",
    "site.tagline": "Crafted with passion, served with love",

    // Menu Page
    "menu.title": "Our Menu",
    "menu.subtitle": "Discover our carefully curated selection of premium coffees, teas, and pastries. Made fresh daily with the finest ingredients.",
    "menu.loading": "Loading menu...",
    "menu.error": "Failed to load menu. Please try again later.",
    "menu.empty": "No items found in this category.",

    // Categories
    "category.All": "All",
    "category.Espresso": "Espresso",
    "category.Coffee": "Coffee",
    "category.Tea": "Tea",
    "category.Specialty": "Specialty",
    "category.Pastries": "Pastries",

    // Temperature
    "temp.hot": "Hot",
    "temp.iced": "Iced",

    // Footer
    "footer.rights": "© 2026 Leenee Coffee. All rights reserved.",

    // Admin Login
    "login.title": "Admin Login",
    "login.subtitle": "Sign in to manage your menu",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Sign In",
    "login.signIn": "Sign In",
    "login.loading": "Signing in...",
    "login.signingIn": "Signing in...",
    "login.back": "← Back to Menu",
    "login.backToMenu": "Back to Menu",

    // Admin Dashboard
    "admin.title": "Admin Dashboard",
    "admin.logout": "Logout",
    "admin.menuItems": "Menu Items",
    "admin.addItem": "Add Item",
    "admin.loading": "Loading...",

    // Table Headers
    "table.image": "Image",
    "table.name": "Name",
    "table.category": "Category",
    "table.price": "Price",
    "table.options": "Options",
    "table.actions": "Actions",

    // Modal
    "modal.addTitle": "Add New Menu Item",
    "modal.editTitle": "Edit Menu Item",
    "modal.name": "Name",
    "modal.description": "Description",
    "modal.price": "Price",
    "modal.category": "Category",
    "modal.image": "Image",
    "modal.uploading": "Uploading...",
    "modal.hot": "Available Hot",
    "modal.iced": "Available Iced",
    "modal.create": "Create",
    "modal.update": "Update",
    "modal.cancel": "Cancel",

    // Alerts
    "alert.deleteConfirm": "Are you sure you want to delete this item?",
    "alert.saveFailed": "Failed to save item",
    "alert.deleteFailed": "Failed to delete item",
    "alert.uploadFailed": "Failed to upload image",

    // Language
    "lang.en": "English",
    "lang.km": "ខ្មែរ",
  },

  km: {
    // Header
    "site.name": "Leenee Coffee",
    "site.tagline": "បង្កើតដោយចំណង់ចំណូលចិត្ត ផ្តល់ដោយក្ដីស្រឡាញ់",

    // Menu Page
    "menu.title": "ម៉ឺនុយរបស់យើង",
    "menu.subtitle": "ស្វែងរកជម្រើសកាហ្វេ តែ និង នំផេស្ទ្រីដែលមានគុណភាពខ្ពស់។ ធ្វើស្រស់រាល់ថ្ងៃដោយប្រើគ្រឿងផ្សំល្អបំផុត។",
    "menu.loading": "កំពុងផ្ទុកម៉ឺនុយ...",
    "menu.error": "បរាជ័យក្នុងការផ្ទុកម៉ឺនុយ។ សូមព្យាយាមម្តងទៀត។",
    "menu.empty": "រកមិនឃើញមុខទំនិញក្នុងប្រភេទនេះ។",

    // Categories
    "category.All": "ទាំងអស់",
    "category.Espresso": "អេស្ប្រេសូ",
    "category.Coffee": "កាហ្វេ",
    "category.Tea": "តែ",
    "category.Specialty": "ពិសេស",
    "category.Pastries": "នំ",

    // Temperature
    "temp.hot": "ក្តៅ",
    "temp.iced": "ត្រជាក់",

    // Footer
    "footer.rights": "© ២០២៦ Leenee Coffee។ រក្សាសិទ្ធិគ្រប់យ៉ាង។",

    // Admin Login
    "login.title": "ចូលរបស់អ្នកគ្រប់គ្រង",
    "login.subtitle": "ចូលដើម្បីគ្រប់គ្រងម៉ឺនុយរបស់អ្នក",
    "login.email": "អ៊ីមែល",
    "login.password": "ពាក្យសម្ងាត់",
    "login.submit": "ចូល",
    "login.signIn": "ចូល",
    "login.loading": "កំពុងចូល...",
    "login.signingIn": "កំពុងចូល...",
    "login.back": "← ត្រឡប់ទៅម៉ឺនុយ",
    "login.backToMenu": "ត្រឡប់ទៅម៉ឺនុយ",

    // Admin Dashboard
    "admin.title": "ផ្ទាំងគ្រប់គ្រង",
    "admin.logout": "ចាកចេញ",
    "admin.menuItems": "មុខម្ហូប",
    "admin.addItem": "បន្ថែម",
    "admin.loading": "កំពុងផ្ទុក...",

    // Table Headers
    "table.image": "រូបភាព",
    "table.name": "ឈ្មោះ",
    "table.category": "ប្រភេទ",
    "table.price": "តម្លៃ",
    "table.options": "ជម្រើស",
    "table.actions": "សកម្មភាព",

    // Modal
    "modal.addTitle": "បន្ថែមម៉ឺនុយថ្មី",
    "modal.editTitle": "កែសម្រួលម៉ឺនុយ",
    "modal.name": "ឈ្មោះ",
    "modal.description": "ការពិពណ៌នា",
    "modal.price": "តម្លៃ",
    "modal.category": "ប្រភេទ",
    "modal.image": "រូបភាព",
    "modal.uploading": "កំពុងផ្ទុកឡើង...",
    "modal.hot": "មានក្តៅ",
    "modal.iced": "មានត្រជាក់",
    "modal.create": "បង្កើត",
    "modal.update": "កែប្រែ",
    "modal.cancel": "បោះបង់",

    // Alerts
    "alert.deleteConfirm": "តើអ្នកប្រាកដថាចង់លុបមុខម្ហូបនេះ?",
    "alert.saveFailed": "បរាជ័យក្នុងការរក្សាទុក",
    "alert.deleteFailed": "បរាជ័យក្នុងការលុប",
    "alert.uploadFailed": "បរាជ័យក្នុងការផ្ទុកឡើង",

    // Language
    "lang.en": "English",
    "lang.km": "ខ្មែរ",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("leenee-lang") as Locale;
    if (saved && (saved === "en" || saved === "km")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("leenee-lang", newLocale);
  };

  const t = (key: string): string => {
    return translations[locale][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
