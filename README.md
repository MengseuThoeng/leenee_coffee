# Leenee Coffee - Premium Khmer Vibe Menu Portal 🇰🇭☕✨

A stunning, responsive, bilingual coffee shop website with an accessible, senior-friendly admin dashboard for managing menu items in real-time. 

Redesigned to blend modern digital aesthetics (glassmorphic cards, staggered entrance animations) with traditional Cambodian heritage (Angkor bronze golds, sugar palm greens, and sandalwood-jasmine cream colors).

---

## 🎨 Design System & Khmer Vibe Aesthetics

### 1. Typography & Readability
*   **decorative Headings**: Google's majestic **Moul** font (`font-moul`) is used for decorative headers and logos, evoking the classic, ornamental style of Cambodian temple gates.
*   **Bilingual Body & UI**: Google's highly-readable **Noto Sans Khmer** font is the default sans-serif font across the site. All Khmer text uses spacious paddings (`py-1+`) and relaxed heights (`leading-relaxed`) to prevent vowell/subscript clipping.

### 2. High-End Color Palette (Light Mode Only)
The site is built with a strict warm-light cafe theme inspired by traditional Khmer silks and natural fibers:
*   **Sandalwood / Jasmine Cream Base (`--background`)**: A soothing, organic linen cream base (`oklch(0.97 0.015 80)`).
*   **Angkor Gold / Bronze Gradient**: Luxurious gold gradients (`bg-gold-gradient`, `text-gold-gradient`) inspired by sandstone sunrise reflections on historical monuments.
*   **Sugar Palm Green (`--secondary`)**: Rich cardamon/forest greens representing Cambodia's tropical nature.

### 3. Cascading Slide Entrance Animations
Features high-performance staggered entrance animations. When the public site loads, categories filter, or a search is typed, product cards slide and fade up in a beautiful wave sequence based on their list sequence:
```css
animation: fadeInUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) both;
animation-delay: index * 70ms;
```

---

## 🔍 Features

*   **Bilingual Support**: Instant segmented toggle switcher (EN | ខ្មែរ) with active sliding gold highlights.
*   **Bilingual Product Search**: Highly responsive, real-time search filtering that matches keywords in both English and Khmer across product names and descriptions.
*   **Steaming Hero Canvas**: An elegant floating SVG coffee cup Hero container decorated with rising steam pathing animations.
*   **Senior-Friendly Admin Portal**:
    *   **Large-Text Greeting Banner**: A welcoming title panel written in a large, friendly bilingual script (`សួស្តីបងស្រី! / Welcome, Sister!`).
    *   **Visual Grid Cards (No Spreadsheets)**: Replaced cramped spreadsheets and tables with gigantic visual menu cards displaying large photos and price tags.
    *   **Giant Tap Targets**: Oversized action buttons (`✏️ កែប្រែ / Edit` and `🗑️ លុប / Delete`) with highly visible colors and icons.
    *   **Oversized Input Fields**: Spacious input boxes (`py-3.5+`) with Khmer-first descriptive helpers (e.g. *“ឧ. កាពូឈីណូ”*).
    *   **Tactile Temperature Toggles (No Checkboxes)**: Replaced tiny checkboxes with huge option buttons that glow and change color when activated (orange-amber for Hot, crystal-blue for Iced).
    *   **Password Visibility Toggles**: Added a large visibility switch on the login page to reduce sign-in errors and frustration.

---

## 🛠️ Tech Stack

*   **Framework**: Next.js 16 (App Router & Turbopack)
*   **Database**: PostgreSQL
*   **Storage**: MinIO S3 Object Storage (for coffee item pictures)
*   **Authentication**: Custom JSON Web Token (JWT) system
*   **Styling**: Tailwind CSS v4.0 & Shadcn UI
*   **Icons**: Lucide React

---

## 📦 Getting Started

### Prerequisites
*   Node.js 18+ installed
*   PostgreSQL running
*   MinIO running

### Setup & Local Development

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Initialize Database**
   Configure your PostgreSQL connection inside `.env.local`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/leenee_coffee
   JWT_SECRET=your_jwt_secret_key
   MINIO_ENDPOINT=localhost
   MINIO_PORT=9000
   MINIO_ACCESS_KEY=your_access_key
   MINIO_SECRET_KEY=your_secret_key
   MINIO_BUCKET=menu-images
   ```

   Run the database initialization script:
   ```bash
   node dbinit.js
   ```

3. **Run Dev Server**
   ```bash
   npm run dev
   ```

4. **Production Build**
   To test compile correctness and optimize the static routing:
   ```bash
   npm run build
   ```

---

## 🔑 Admin Portal Access
*   **Login Endpoint**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
*   **Credentials**: Defined inside `supabase/users.sql` (loaded by `dbinit.js` into your Postgres users table).

---

## 📁 Project Structure

```
leenee_coffee/
├── app/
│   ├── admin/              # Admin Pages
│   │   ├── login/          # Redesigned Senior-Friendly Login Page
│   │   └── page.tsx        # Main Admin Layout Router
│   ├── api/                # API Route Handlers
│   │   ├── auth/           # JWT Authentication
│   │   ├── menu/           # Menu CRUD API Operations
│   │   └── upload/         # MinIO Picture Upload Handler
│   ├── globals.css         # Styling system, colors, gold gradients, animations
│   ├── layout.tsx          # Root font provider (Moul & Noto Sans Khmer)
│   └── page.tsx            # Redesigned Public Homepage & Steaming Hero
├── components/
│   ├── admin/
│   │   └── admin-dashboard.tsx  # Redesigned Card-based Admin Dashboard
│   ├── ui/                 # Core Shadcn/UI items
│   │   ├── confirm-modal.tsx    # Accessible confirmation modal
│   │   └── goey-toaster.tsx     # Toast triggers
│   ├── language-switcher.tsx    # Segmented EN/KM Switcher
│   ├── menu-card.tsx       # Public Glassmorphic Card (Staggered Animation)
│   ├── menu-filter.tsx     # Public category filter capsule bar
│   └── menu-list.tsx       # Core Public List & Real-time Search Handler
├── lib/
│   ├── auth.ts             # JWT signature utils
│   ├── db.ts               # PostgreSQL client provider
│   ├── i18n.tsx            # Bilingual dictionary core
│   ├── menu-data.ts        # Database types
│   └── minio.ts            # MinIO cloud storage client
├── proxy.ts                # Next.js 16 network-level proxy handler
├── dbinit.js               # Postgres DB seeding tool
└── package.json            # Scripts & libraries
```

---

## 📄 License
MIT License - feel free to use and adapt this for your Cambodia-based coffee business!

Made with ☕ for café lovers!
