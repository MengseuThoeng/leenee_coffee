# Leenee Coffee - Menu Website

A modern, responsive coffee shop menu website with admin dashboard for managing menu items. Built with Next.js, Supabase, and Tailwind CSS.

## ✨ Features

- 🎨 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 📋 **Dynamic Menu** - Real-time menu with filtering by category
- 🔐 **Admin Dashboard** - Secure admin panel for managing menu items
- 📸 **Image Upload** - Upload and manage menu item images
- 🗄️ **Database Powered** - All data stored in Supabase PostgreSQL
- 🚀 **Vercel Ready** - Optimized for deployment on Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📦 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works!)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd leenee_coffee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup Supabase**
   
   Follow the detailed guide in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
   
   Quick summary:
   - Create a Supabase project
   - Run the SQL schema from `supabase/schema.sql`
   - Get your project URL and API key
   - Create admin user

4. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Visit [http://localhost:3000](http://localhost:3000)

## 🔑 Admin Access

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Login with the admin credentials you created in Supabase
3. Manage your menu items:
   - ✅ Add new items
   - ✏️ Edit existing items
   - 🗑️ Delete items
   - 📸 Upload images

## 📁 Project Structure

```
leenee_coffee/
├── app/
│   ├── admin/              # Admin dashboard pages
│   │   ├── login/          # Admin login page
│   │   └── page.tsx        # Admin dashboard
│   ├── api/                # API routes
│   │   ├── menu/           # Menu CRUD operations
│   │   └── upload/         # Image upload
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage (menu)
├── components/
│   ├── admin/              # Admin components
│   │   └── admin-dashboard.tsx
│   ├── menu-card.tsx       # Menu item card
│   ├── menu-filter.tsx     # Category filter
│   └── menu-list.tsx       # Menu list with data fetching
├── lib/
│   ├── supabase/           # Supabase clients
│   │   ├── client.ts       # Browser client
│   │   ├── server.ts       # Server client
│   │   └── middleware.ts   # Auth middleware
│   ├── menu-data.ts        # Types & interfaces
│   └── utils.ts            # Utility functions
├── supabase/
│   └── schema.sql          # Database schema
├── middleware.ts           # Next.js middleware
└── SUPABASE_SETUP.md       # Detailed setup guide
```

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Click "Deploy"

3. **Done!** Your site is live! 🎉

## 🔧 Configuration

### Menu Categories

Edit categories in `lib/menu-data.ts`:
```typescript
export const menuCategories = [
  "All",
  "Espresso",
  "Coffee",
  "Tea",
  "Specialty",
  "Pastries"
] as const;
```

### Customization

- **Colors**: Edit Tailwind theme in `app/globals.css`
- **Fonts**: Change fonts in `app/layout.tsx`
- **Images**: Configure external domains in `next.config.ts`

## 📝 API Routes

- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create new menu item (authenticated)
- `GET /api/menu/[id]` - Get single menu item
- `PATCH /api/menu/[id]` - Update menu item (authenticated)
- `DELETE /api/menu/[id]` - Delete menu item (authenticated)
- `POST /api/upload` - Upload image (authenticated)

## 🔐 Security

- Row Level Security (RLS) enabled on database
- Authentication required for all write operations
- Public read access for menu items
- Images stored in public bucket with proper policies

## 📱 Features Breakdown

### Customer View
- Browse full menu
- Filter by category (Espresso, Coffee, Tea, etc.)
- View item details (name, description, price)
- See availability (Hot/Iced options)
- Responsive grid layout

### Admin Dashboard
- Secure login
- View all menu items in table
- Add new items with image upload
- Edit existing items
- Delete items with confirmation
- Real-time updates

## 🐛 Troubleshooting

**Menu not loading?**
- Check `.env.local` has correct Supabase credentials
- Verify database schema is created
- Check browser console for errors

**Can't login to admin?**
- Verify user exists in Supabase Authentication
- Check email/password are correct
- Make sure user is confirmed in Supabase

**Images not uploading?**
- Check storage bucket `menu-images` exists
- Verify storage policies are set correctly
- Check file size (Supabase free tier: 50MB per file)

## 📄 License

MIT License - feel free to use for your coffee shop!

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

Made with ☕ for coffee lovers!
