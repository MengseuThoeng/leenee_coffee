# Quick Setup Checklist ✅

Follow these steps to get your coffee shop menu website running:

## Step 1: Install Dependencies ✅ (Already Done)
- [x] Supabase packages installed
- [x] Next.js and dependencies ready

## Step 2: Create Supabase Project 🔲

1. [ ] Go to https://supabase.com and sign up/login
2. [ ] Click "New Project"
3. [ ] Fill in project details:
   - Name: `leenee-coffee`
   - Database Password: __________ (save this!)
   - Region: (choose closest to you)
4. [ ] Wait 2 minutes for project creation

## Step 3: Setup Database 🔲

1. [ ] Open Supabase dashboard → SQL Editor
2. [ ] Click "New Query"
3. [ ] Copy all content from `supabase/schema.sql`
4. [ ] Paste and click "Run"
5. [ ] Verify: "Success. No rows returned"

## Step 4: Setup Storage 🔲

1. [ ] Go to Storage in Supabase dashboard
2. [ ] Create bucket: `menu-images`
3. [ ] Check "Public bucket"
4. [ ] Set policies (see SUPABASE_SETUP.md for details)

## Step 5: Create Admin User 🔲

1. [ ] Go to Authentication → Users
2. [ ] Click "Add user" → "Create new user"
3. [ ] Fill in:
   - Email: __________________
   - Password: __________________
4. [ ] Check "Auto Confirm User"
5. [ ] Save credentials somewhere safe!

## Step 6: Get API Keys 🔲

1. [ ] Go to Project Settings → API
2. [ ] Copy:
   - Project URL: __________________
   - anon public key: __________________

## Step 7: Setup Environment Variables 🔲

1. [ ] Copy `.env.local.example` to `.env.local`
   ```bash
   cp .env.local.example .env.local
   ```
2. [ ] Edit `.env.local` and paste your keys
3. [ ] Save file

## Step 8: Test Locally 🔲

1. [ ] Run: `npm run dev`
2. [ ] Visit: http://localhost:3000
3. [ ] Should see menu with 20 items!
4. [ ] Try admin: http://localhost:3000/admin/login
5. [ ] Login with your admin credentials
6. [ ] Try adding/editing a menu item

## Step 9: Deploy to Vercel (Optional) 🔲

1. [ ] Push code to GitHub
2. [ ] Go to vercel.com
3. [ ] Import your repository
4. [ ] Add environment variables
5. [ ] Deploy!

---

## Troubleshooting

**Menu showing "Loading..." forever?**
- Check if you completed Step 3 (database schema)
- Verify `.env.local` has correct keys
- Restart dev server: Ctrl+C then `npm run dev`

**Can't login to admin?**
- Verify admin user was created in Step 5
- Check email/password match
- Look for error message on login page

**Images not uploading?**
- Verify storage bucket created in Step 4
- Check storage policies are set
- Try with smaller image first (< 1MB)

---

## Need Help?

- Read detailed guide: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md)
- Check Supabase docs: https://supabase.com/docs
- Review project README: [README.md](./README.md)

Good luck with your coffee shop! ☕
