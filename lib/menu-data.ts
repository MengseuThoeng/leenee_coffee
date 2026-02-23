export interface MenuItem {
  id: string;
  name: string;
  name_km?: string | null;
  description: string;
  description_km?: string | null;
  price: number;
  category: string;
  image?: string | null;
  hot?: boolean;
  iced?: boolean;
  created_at?: string;
  updated_at?: string;
}

export type MenuItemInsert = Omit<MenuItem, 'id' | 'created_at' | 'updated_at'>;
export type MenuItemUpdate = Partial<MenuItemInsert>;

export const menuCategories = [
  "All",
  "Espresso",
  "Coffee",
  "Tea",
  "Specialty",
  "Pastries"
] as const;

export const menuItems: MenuItem[] = [];
