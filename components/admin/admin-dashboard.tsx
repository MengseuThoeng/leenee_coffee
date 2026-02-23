"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { MenuItem, MenuItemInsert } from "@/lib/menu-data";
import { goeyToast } from "@/components/ui/goey-toaster";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Coffee, Plus, Edit, Trash2, LogOut, Image as ImageIcon } from "lucide-react";

interface Props {
  user: any;
}

export default function AdminDashboard({ user }: Props) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
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
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
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
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      const { url } = await response.json();
      setFormData((prev) => ({ ...prev, image: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      goeyToast.error("Upload Failed", { description: "Failed to upload image. Please try again." });
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Update failed");
        goeyToast.success("Item Updated", { description: "Menu item has been updated successfully." });
      } else {
        // Create
        const response = await fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error("Create failed");
        goeyToast.success("Item Added", { description: "New menu item has been created." });
      }

      // Reset and refresh
      setShowModal(false);
      setEditingItem(null);
      resetForm();
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving item:", error);
      goeyToast.error("Save Failed", { description: "Failed to save the menu item. Please try again." });
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
      });

      if (!response.ok) throw new Error("Delete failed");

      goeyToast.success("Item Deleted", { description: "Menu item has been removed." });
      fetchMenuItems();
    } catch (error) {
      console.error("Error deleting item:", error);
      goeyToast.error("Delete Failed", { description: "Failed to delete the item. Please try again." });
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Coffee className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Menu Items ({menuItems.length})</h2>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Item
          </button>
        </div>

        {/* Menu Items Table */}
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Price</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Options</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {menuItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center">
                          <ImageIcon className="h-6 w-6 text-muted-foreground" />
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{item.name}</div>
                      {item.name_km && <div className="text-sm text-muted-foreground">{item.name_km}</div>}
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.description}</div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">${item.price.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {item.hot && (
                          <span className="text-xs px-2 py-1 bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded">
                            Hot
                          </span>
                        )}
                        {item.iced && (
                          <span className="text-xs px-2 py-1 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded">
                            Iced
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card border border-border rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Name (English) *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="e.g. Cappuccino"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ឈ្មោះ (ខ្មែរ)
                    </label>
                    <input
                      type="text"
                      value={formData.name_km || ""}
                      onChange={(e) => setFormData({ ...formData, name_km: e.target.value })}
                      placeholder="ឧ. កាពូឈីណូ"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Description (English) *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={3}
                      placeholder="Describe the item in English"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      ការពិពណ៌នា (ខ្មែរ)
                    </label>
                    <textarea
                      value={formData.description_km || ""}
                      onChange={(e) => setFormData({ ...formData, description_km: e.target.value })}
                      rows={3}
                      placeholder="ពិពណ៌នាមុខម្ហូបជាភាសាខ្មែរ"
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Price *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value === "" ? 0 : parseFloat(e.target.value) })}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    >
                      <option value="Espresso">Espresso</option>
                      <option value="Coffee">Coffee</option>
                      <option value="Tea">Tea</option>
                      <option value="Specialty">Specialty</option>
                      <option value="Pastries">Pastries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Image
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                    />
                    {uploading && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary border-r-transparent" />
                        Uploading image...
                      </div>
                    )}
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="h-32 w-32 rounded-lg object-cover"
                      />
                    )}
                  </div>
                </div>

                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.hot}
                      onChange={(e) => setFormData({ ...formData, hot: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Available Hot</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.iced}
                      onChange={(e) => setFormData({ ...formData, iced: e.target.checked })}
                      className="rounded"
                    />
                    <span className="text-sm text-foreground">Available Iced</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={saving || uploading}
                    className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {saving && <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-primary-foreground border-r-transparent" />}
                    {saving
                      ? (editingItem ? "Updating..." : "Creating...")
                      : (editingItem ? "Update" : "Create")
                    }
                  </button>
                  <button
                    type="button"
                    disabled={saving}
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="flex-1 bg-secondary text-secondary-foreground py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={deleteTarget !== null}
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
