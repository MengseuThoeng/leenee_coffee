"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MenuItem, MenuItemInsert } from "@/lib/menu-data";
import { goeyToast } from "@/components/ui/goey-toaster";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Coffee, Plus, Edit, Trash2, LogOut, Image as ImageIcon, Search, X } from "lucide-react";

interface Props {
  token: string;
}

export default function AdminDashboard({ token }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const [formData, setFormData] = useState<MenuItemInsert>({
    name: "",
    name_km: "",
    description: "",
    description_km: "",
    price: 0,
    category: "Espresso",
    image: "",
    hot: false,
    iced: false,
  });

  useEffect(() => {
    fetchMenuItems();

    // Decode token to get email
    try {
      const parts = token.split('.');
      if (parts.length === 3) {
        const decoded = JSON.parse(atob(parts[1]));
        setUserEmail(decoded.email || 'Admin');
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("authToken");
    router.push("/admin/login");
    router.refresh();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      setFormData((prev) => ({ ...prev, image: url }));
      goeyToast.success("ផ្ទុកឡើងរូបភាពបានជោគជ័យ / Upload Successful", { 
        description: "រូបភាពត្រូវបានផ្ទុកឡើង និងរួចរាល់សម្រាប់ការរក្សាទុក។ / Image has been uploaded and is ready to save." 
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      goeyToast.error("ផ្ទុកឡើងរូបភាពមិនបានសម្រេច / Upload Failed", { 
        description: "សូមព្យាយាមផ្ទុករូបភាពម្តងទៀត។ / Failed to upload image. Please try again." 
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingItem) {
        // Update
        const response = await fetch(`/api/menu/${editingItem.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Update failed");
        goeyToast.success("កែប្រែបានសម្រេច / Update Successful", { 
          description: "មុខម្ហូបត្រូវបានកែប្រែដោយជោគជ័យ។ / Menu item has been updated successfully." 
        });
      } else {
        // Create
        const response = await fetch("/api/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Create failed");
        goeyToast.success("បន្ថែមបានសម្រេច / Added Successfully", { 
          description: "មុខម្ហូបថ្មីត្រូវបានដាក់លក់ហើយ! / New menu item has been added successfully." 
        });
      }

      // Reset and refresh
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving item:", error);
      goeyToast.error("រក្សាទុកមិនបានសម្រេច / Save Failed", { 
        description: "សូមពិនិត្យព័ត៌មានឡើងវិញម្តងទៀត។ / Failed to save the menu item. Please try again." 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      name_km: item.name_km || "",
      description: item.description,
      description_km: item.description_km || "",
      price: item.price,
      category: item.category,
      image: item.image || "",
      hot: item.hot || false,
      iced: item.iced || false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    setDeleteTarget(id);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      const response = await fetch(`/api/menu/${deleteTarget}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Delete failed");

      goeyToast.success("លុបបានសម្រេច / Deleted Successfully", { 
        description: "មុខម្ហូបត្រូវបានលុបចេញពីប្រព័ន្ធហើយ។ / Menu item has been removed." 
      });
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      goeyToast.error("លុបមិនបានសម្រេច / Delete Failed", { 
        description: "សូមព្យាយាមលុបម្តងទៀត។ / Failed to delete the item. Please try again." 
      });
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      name_km: "",
      description: "",
      description_km: "",
      price: 0,
      category: "Espresso",
      image: "",
      hot: false,
      iced: false,
    });
  };

  const openAddModal = () => {
    setEditingItem(null);
    resetForm();
    setShowModal(true);
  };

  // Filter items by category & search query
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
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
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-base font-bold text-muted-foreground">កំពុងផ្ទុក... / Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-6 px-4 md:px-8">
      {/* Header Banner */}
      <header className="max-w-7xl mx-auto bg-card border-2 border-border/80 rounded-2xl shadow-sm sticky top-4 z-20 mb-8 backdrop-blur-md bg-opacity-95">
        <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md border-gold-emboss select-none">
              <Coffee className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-moul text-foreground leading-relaxed">លីនី កាហ្វេ / Leenee Coffee</h1>
              <p className="text-sm font-bold text-primary flex flex-wrap items-center gap-1.5 mt-0.5">
                <span>👩‍🍳 ផ្ទាំងគ្រប់គ្រងសម្រាប់បងស្រី / Admin Dashboard</span>
                <span className="text-muted-foreground/60 font-semibold">({userEmail})</span>
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-3 text-base font-bold bg-destructive/10 text-destructive border-2 border-destructive/20 rounded-xl hover:bg-destructive/25 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            ចាកចេញ / Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        {/* Friendly Instruction Panel */}
        <div className="bg-card border-2 border-border/80 rounded-2xl p-6 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gold-gradient" />
          <h2 className="text-xl font-bold font-moul text-foreground leading-relaxed mb-1">
            សួស្តីបងស្រី! ស្វាគមន៍មកកាន់ផ្ទាំងគ្រប់គ្រងហាងកាហ្វេរបស់បង ☕🌸
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed font-semibold">
            នៅទីនេះ បងអាចមើលមុខម្ហូបទាំងអស់ បន្ថែមមុខម្ហូបថ្មី កែប្រែតម្លៃ ឬរូបភាព និងលុបមុខម្ហូបបានយ៉ាងងាយស្រួល។
            <span className="block text-xs text-muted-foreground/70 mt-1.5 font-medium">(Hello Sister! Below you can easily view, search, add, edit, or delete items on your café menu.)</span>
          </p>
        </div>

        {/* Big visual Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-card border-2 border-border/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-14 w-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-3xl shadow-inner select-none">
              📦
            </div>
            <div>
              <div className="text-3xl font-black text-foreground">{menuItems.length}</div>
              <div className="text-sm font-bold text-muted-foreground mt-0.5">មុខម្ហូបសរុប / Total Items</div>
            </div>
          </div>

          <div className="bg-card border-2 border-border/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-14 w-14 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-3xl shadow-inner select-none">
              ☕
            </div>
            <div>
              <div className="text-3xl font-black text-foreground">{menuItems.filter(i => i.hot).length}</div>
              <div className="text-sm font-bold text-muted-foreground mt-0.5">លក់ក្តៅ / Hot Options</div>
            </div>
          </div>

          <div className="bg-card border-2 border-border/80 rounded-2xl p-5 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="h-14 w-14 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-3xl shadow-inner select-none">
              ❄️
            </div>
            <div>
              <div className="text-3xl font-black text-foreground">{menuItems.filter(i => i.iced).length}</div>
              <div className="text-sm font-bold text-muted-foreground mt-0.5">លក់ត្រជាក់ / Iced Options</div>
            </div>
          </div>
        </div>

        {/* Section Title & Add Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold font-moul text-foreground leading-relaxed flex items-center gap-2">
            📋 បញ្ជីមុខម្ហូបរបស់ហាង / Café Menu
          </h2>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto bg-gold-gradient text-white px-6 py-4 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            <Plus className="h-6 w-6 stroke-[3]" />
            បន្ថែមមុខម្ហូបថ្មី / Add New Menu Item
          </button>
        </div>

        {/* Search Bar for the Sister */}
        <div className="mb-6 max-w-xl animate-fade-in-up">
          <div className="relative group">
            {/* Search Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground/50 group-focus-within:text-primary transition-colors">
              <Search className="h-5 w-5 stroke-[2.5]" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកមុខម្ហូប (វាយជាភាសាខ្មែរ ឬអង់គ្លេស) / Search menu..."
              className="w-full pl-12 pr-10 py-3.5 bg-card border-2 border-border/80 focus:border-primary/80 focus:ring-2 focus:ring-primary/10 rounded-2xl text-foreground text-base placeholder:text-muted-foreground/50 transition-all font-sans font-bold outline-none shadow-sm focus:shadow-md"
            />
            
            {/* Clear Button */}
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

        {/* Senior-friendly Category Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 select-none">
          {["All", "Espresso", "Coffee", "Tea", "Specialty", "Pastries"].map((cat) => {
            const labelKm = cat === "All" ? "ទាំងអស់" : cat === "Espresso" ? "អេស្ប្រេសូ" : cat === "Coffee" ? "កាហ្វេ" : cat === "Tea" ? "តែ" : cat === "Specialty" ? "ភេសជ្ជៈពិសេស" : "នំផេស្ទ្រី";
            const icon = cat === "All" ? "📋" : cat === "Espresso" ? "☕" : cat === "Coffee" ? "☕" : cat === "Tea" ? "🍵" : cat === "Specialty" ? "✨" : "🥐";
            
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-3 rounded-xl font-bold text-base transition-all flex items-center gap-2 cursor-pointer border-2 ${
                  isActive
                    ? "bg-gold-gradient text-white border-primary shadow-md scale-[1.03]"
                    : "bg-card text-muted-foreground border-border/80 hover:border-border hover:text-foreground"
                }`}
              >
                <span className="text-lg">{icon}</span>
                <span>{labelKm} / {cat}</span>
              </button>
            );
          })}
        </div>

        {/* Card-Based Grid (Replaces original table entirely) */}
        {filteredMenuItems.length === 0 ? (
          <div className="bg-card border-2 border-dashed border-border/60 rounded-2xl p-12 text-center animate-fade-in-up">
            <span className="text-5xl block mb-4 select-none">🔍</span>
            <h3 className="text-xl font-bold font-moul text-foreground mb-1 leading-relaxed">
              {searchQuery ? "រកមិនឃើញមុខម្ហូបទេ" : "មិនទាន់មានមុខម្ហូបនៅឡើយទេ"}
            </h3>
            <p className="text-base text-muted-foreground font-semibold">
              {searchQuery 
                ? "សូមសាកល្បងស្វែងរកឈ្មោះផ្សេងទៀត ឬប្តូរប្រភេទមុខម្ហូប!" 
                : "សូមចុចប៊ូតុងខាងលើ ដើម្បីបន្ថែមមុខម្ហូបដំបូងរបស់អ្នក!"}
              <span className="block text-xs text-muted-foreground/75 mt-1.5 font-medium">
                {searchQuery 
                  ? "(No menu items matched your search query. Try another word!)" 
                  : "(No menu items found in this category. Click the button above to add one!)"}
              </span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMenuItems.map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 70}ms` }}
                className="bg-card border-2 border-border/60 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group animate-fade-in-up"
              >
                {/* Drink Image container with Category Badge */}
                <div className="relative h-56 bg-muted overflow-hidden">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-muted">
                      <Coffee className="h-14 w-14 text-muted-foreground/30 mb-2" />
                      <span className="text-xs text-muted-foreground/50 font-bold">គ្មានរូបភាព / No Image</span>
                    </div>
                  )}
                  {/* Category Badge - large and highly visible */}
                  <span className="absolute top-3 left-3 bg-secondary-foreground text-secondary px-3 py-1.5 rounded-lg text-sm font-bold shadow-md select-none">
                    🏷️ {item.category === "Espresso" ? "អេស្ប្រេសូ / Espresso" : item.category === "Coffee" ? "កាហ្វេ / Coffee" : item.category === "Tea" ? "តែ / Tea" : item.category === "Specialty" ? "ពិសេស / Specialty" : "នំ / Pastries"}
                  </span>
                </div>

                {/* Content details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="flex-1">
                    {/* Khmer Name */}
                    {item.name_km ? (
                      <h3 className="text-xl font-bold font-moul text-foreground tracking-normal leading-relaxed mb-0.5">
                        {item.name_km}
                      </h3>
                    ) : (
                      <h3 className="text-xl font-bold font-moul text-muted-foreground/40 tracking-normal leading-relaxed mb-0.5">
                        គ្មានឈ្មោះខ្មែរ / No Khmer Name
                      </h3>
                    )}
                    {/* English Name */}
                    <h4 className="text-lg font-bold text-primary tracking-normal leading-normal">
                      {item.name}
                    </h4>

                    {/* Price - big and readable */}
                    <div className="mt-4 flex items-baseline gap-2 bg-primary/5 py-2 px-3 rounded-xl w-fit">
                      <span className="text-xs font-bold text-primary">តម្លៃ / Price:</span>
                      <span className="text-2xl font-extrabold text-foreground">
                        ${(parseFloat(String(item.price)) || 0).toFixed(2)}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="mt-4 text-base text-muted-foreground leading-relaxed font-semibold">
                      {item.description_km ? (
                        <p className="line-clamp-2">{item.description_km}</p>
                      ) : (
                        <p className="line-clamp-2 italic text-muted-foreground/60">គ្មានការពិពណ៌នាជាខ្មែរ / No Khmer details</p>
                      )}
                      <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-1 font-medium">{item.description}</p>
                    </div>

                    {/* Available options */}
                    <div className="mt-5 flex flex-wrap gap-2 select-none">
                      {item.hot && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-2 bg-orange-500/10 text-orange-700 rounded-xl">
                          ☕ លក់ក្តៅ (Hot)
                        </span>
                      )}
                      {item.iced && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-2 bg-blue-500/10 text-blue-700 rounded-xl">
                          ❄️ លក់ត្រជាក់ (Iced)
                        </span>
                      )}
                      {!item.hot && !item.iced && (
                        <span className="inline-flex items-center gap-1.5 text-sm font-bold px-3 py-2 bg-muted text-muted-foreground rounded-xl">
                          🍰 នំ/ធម្មតា (Standard)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar with Massive Buttons */}
                  <div className="mt-8 pt-5 border-t border-border/60 grid grid-cols-2 gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center justify-center gap-2 px-4 py-4 bg-primary/10 text-primary border-2 border-primary/20 rounded-2xl hover:bg-primary/20 transition-all font-bold text-base cursor-pointer hover:shadow-sm"
                    >
                      <Edit className="h-5 w-5" />
                      កែប្រែ / Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center justify-center gap-2 px-4 py-4 bg-red-50 text-red-600 border-2 border-red-200 rounded-2xl hover:bg-red-100 transition-all font-bold text-base cursor-pointer hover:shadow-sm"
                    >
                      <Trash2 className="h-5 w-5" />
                      លុប / Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Redesign - Super Spacious & accessible */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-card border-2 border-border/80 rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="p-6 md:p-8">
              {/* Modal Title */}
              <div className="flex items-center gap-3 border-b-2 border-border/60 pb-4 mb-6">
                <span className="text-3xl">☕</span>
                <div>
                  <h3 className="text-2xl font-bold font-moul text-foreground leading-relaxed">
                    {editingItem ? "កែប្រែមុខម្ហូប / Edit Menu Item" : "បន្ថែមមុខម្ហូបថ្មី / Add New Menu Item"}
                  </h3>
                  <p className="text-xs text-muted-foreground/80 font-bold">
                    សូមបំពេញព័ត៌មានខាងក្រោម រួចចុចប៊ូតុងពណ៌មាសដើម្បីរក្សាទុក / Fill out form details below
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Names inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-foreground mb-2 flex items-center gap-1.5">
                      ឈ្មោះជាភាសាខ្មែរ / Name (Khmer)
                    </label>
                    <input
                      type="text"
                      value={formData.name_km || ""}
                      onChange={(e) => setFormData({ ...formData, name_km: e.target.value })}
                      placeholder="ឧ. កាហ្វេទឹកដោះគោទឹកកក"
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-medium"
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">បំពេញឈ្មោះជាភាសាខ្មែរដើម្បីងាយស្រួលអាន</p>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-foreground mb-2 flex items-center gap-1.5">
                      ឈ្មោះជាភាសាអង់គ្លេស / Name (English) <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="e.g. Iced Milk Coffee"
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-medium"
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">Enter the drink name in English</p>
                  </div>
                </div>

                {/* Descriptions inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-foreground mb-2">
                      ការពិពណ៌នាជាភាសាខ្មែរ / Description (Khmer)
                    </label>
                    <textarea
                      value={formData.description_km || ""}
                      onChange={(e) => setFormData({ ...formData, description_km: e.target.value })}
                      rows={3}
                      placeholder="ឧ. កាហ្វេទឹកដោះគោឆ្ងាញ់ប្លែក ឈ្ងុយឆ្ងាញ់បែបបុរាណ..."
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-base focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-medium leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">ព័ត៌មានលម្អិតអំពីភេសជ្ជៈជាភាសាខ្មែរ</p>
                  </div>
                  <div>
                    <label className="block text-base font-bold text-foreground mb-2">
                      ការពិពណ៌នាជាភាសាអង់គ្លេស / Description (English) <span className="text-primary">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      placeholder="e.g. Sweet, aromatic milk coffee made with authentic cambodian coffee beans..."
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-base focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-medium leading-relaxed"
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">Enter a short description in English</p>
                  </div>
                </div>

                {/* Price and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-base font-bold text-foreground mb-2">
                      តម្លៃជាដុល្លារ ($) / Price (USD) <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price || ""}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                      required
                      placeholder="ឧ. 2.50"
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-bold"
                    />
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">វាយបញ្ចូលតម្លៃដុល្លារ (មិនបាច់ដាក់សញ្ញា $ ទេ)</p>
                  </div>

                  <div>
                    <label className="block text-base font-bold text-foreground mb-2">
                      ប្រភេទមុខម្ហូប / Category <span className="text-primary">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-3.5 border-2 border-border/80 rounded-xl bg-background text-foreground text-lg focus:outline-none focus:ring-3 focus:ring-primary focus:border-primary transition-all font-bold cursor-pointer"
                    >
                      <option value="Espresso">☕ អេស្ប្រេសូ / Espresso</option>
                      <option value="Coffee">☕ កាហ្វេ / Coffee</option>
                      <option value="Tea">🍵 តែ / Tea</option>
                      <option value="Specialty">✨ ភេសជ្ជៈពិសេស / Specialty</option>
                      <option value="Pastries">🥐 នំផេស្ទ្រី / Pastries</option>
                    </select>
                    <p className="text-xs text-muted-foreground/60 mt-1 font-semibold">ជ្រើសរើសប្រភេទនៃមុខម្ហូបនេះ</p>
                  </div>
                </div>

                {/* Big Image Upload zone */}
                <div>
                  <label className="block text-base font-bold text-foreground mb-2">
                    📸 រូបភាពភេសជ្ជៈ / Drink Image
                  </label>
                  <div className="space-y-4">
                    {/* Visual Dotted click zone */}
                    <div className="relative border-2 border-dashed border-primary/40 hover:border-primary/80 rounded-2xl p-6 bg-background flex flex-col items-center justify-center gap-3 transition-colors cursor-pointer group">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        disabled={uploading}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <ImageIcon className="h-10 w-10 text-primary/60 group-hover:scale-110 transition-transform duration-200" />
                      <div className="text-center select-none">
                        <p className="text-base font-bold text-foreground">
                          ចុចទីនេះ ដើម្បីជ្រើសរើសរូបភាពភេសជ្ជៈពីទូរស័ព្ទ ឬកុំព្យូទ័រ
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5 font-semibold">
                          Click here to upload café picture
                        </p>
                      </div>
                    </div>

                    {/* Loading Upload Indicator */}
                    {uploading && (
                      <div className="flex items-center justify-center gap-2.5 text-base font-bold text-primary bg-primary/5 py-4 rounded-xl shadow-inner">
                        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
                        កំពុងផ្ទុកឡើងរូបភាព... សូមរង់ចាំ! / Uploading image...
                      </div>
                    )}

                    {/* Selected Image Preview with delete overlay */}
                    {formData.image && (
                      <div className="relative w-44 h-44 mx-auto rounded-2xl overflow-hidden border-2 border-border/80 shadow-md group">
                        <img
                          src={formData.image}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2.5 right-2.5 p-2 bg-red-600 text-white rounded-full shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                          title="លុបរូបភាព / Remove picture"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Senior-Friendly Big Toggles for Temperature option (No checkboxes!) */}
                <div>
                  <label className="block text-base font-bold text-foreground mb-3">
                    🌡️ ជម្រើសកម្រិតកម្តៅ / Temperature Availability
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Hot toggle option card */}
                    <div
                      onClick={() => setFormData({ ...formData, hot: !formData.hot })}
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all flex flex-col items-center justify-center gap-2.5 select-none ${
                        formData.hot
                          ? "bg-orange-500/10 border-orange-500 text-orange-800 scale-[1.01] shadow-sm"
                          : "bg-background border-border/80 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <span className="text-4xl">☕</span>
                      <span className="text-lg font-black">លក់ក្តៅ / Available Hot</span>
                      <span className={`text-sm px-3 py-1 rounded-full font-bold shadow-sm ${formData.hot ? "bg-orange-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        {formData.hot ? "✓ បើកលក់ក្តៅ / Active" : "✕ មិនមានទេ / Not Active"}
                      </span>
                    </div>

                    {/* Iced toggle option card */}
                    <div
                      onClick={() => setFormData({ ...formData, iced: !formData.iced })}
                      className={`cursor-pointer rounded-2xl border-2 p-5 transition-all flex flex-col items-center justify-center gap-2.5 select-none ${
                        formData.iced
                          ? "bg-blue-500/10 border-blue-500 text-blue-800 scale-[1.01] shadow-sm"
                          : "bg-background border-border/80 text-muted-foreground hover:border-border"
                      }`}
                    >
                      <span className="text-4xl">❄️</span>
                      <span className="text-lg font-black">លក់ត្រជាក់ / Available Iced</span>
                      <span className={`text-sm px-3 py-1 rounded-full font-bold shadow-sm ${formData.iced ? "bg-blue-500 text-white" : "bg-muted text-muted-foreground"}`}>
                        {formData.iced ? "✓ បើកលក់ត្រជាក់ / Active" : "✕ មិនមានទេ / Not Active"}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground/60 mt-2.5 font-semibold">បងអាចចុចផ្ទាល់លើកាតខាងលើ ដើម្បីបើក ឬបិទលក់ជាប្រភេទ ក្តៅ និង ត្រជាក់</p>
                </div>

                {/* Form Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-border/60">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="flex-1 bg-gold-gradient text-white py-4.5 rounded-xl font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {saving && <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-white border-r-transparent" />}
                    {saving ? (
                      <span className="font-bold">កំពុងរក្សាទុក... / Saving...</span>
                    ) : editingItem ? (
                      <span className="font-bold">💾 រក្សាទុកការកែប្រែ / Save Changes</span>
                    ) : (
                      <span className="font-bold">➕ បន្ថែមមុខម្ហូប / Add Item</span>
                    )}
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 bg-secondary text-secondary-foreground py-4.5 rounded-xl font-bold text-lg hover:bg-secondary/80 transition-all border-2 border-border/40 cursor-pointer"
                  >
                    ✕ បោះបង់ / Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Bilingual large layout */}
      <ConfirmModal
        open={deleteTarget !== null}
        title="លុបមុខម្ហូប / Delete Menu Item"
        message="តើបងពិតជាចង់លុបមុខម្ហូបនេះមែនទេ? សកម្មភាពនេះមិនអាចត្រឡប់ក្រោយវិញបានឡើយ។ / Are you sure you want to delete this menu item? This action is permanent."
        confirmLabel="🗑️ លុបចោល / Delete"
        cancelLabel="✕ ត្រឡប់ក្រោយ / Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
