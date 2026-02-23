# Supabase Setup Guide

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (or use existing)
4. Click "New Project"
5. Fill in:
   - **Name**: leenee-coffee
   - **Database Password**: (create a strong password - save it!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
6. Click "Create new project" (takes ~2 minutes)

## Step 2: Run Database Schema

1. In your Supabase dashboard, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl/Cmd + Enter)
6. You should see "Success. No rows returned" - this means it worked!
7. Your database now has:
   - ✅ `menu_items` table
   - ✅ All 20 menu items
   - ✅ Security policies (RLS)
   - ✅ Indexes for performance

## Step 3: Get Your API Keys

1. In Supabase dashboard, go to **Project Settings** (gear icon, bottom left)
2. Click **API** in the sidebar
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public key**: `eyJxxx...` (long key)

## Step 4: Setup Environment Variables

1. In your project root, create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Important**: Add to `.gitignore` (should already be there):
   ```
   .env.local
   ```

## Step 5: Enable Storage (for image uploads)

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click **Create a new bucket**
3. Fill in:
   - **Name**: `menu-images`
   - **Public bucket**: ✅ Check this (images need to be public)
4. Click **Create bucket**

5. Set storage policies:
   - Click on the `menu-images` bucket
   - Go to **Policies** tab
   - Click **New Policy** → **For full customization**
   - Create policy for SELECT (read):
     - Name: "Public read access"
     - Check SELECT
     - Target roles: public
     - Policy definition: `true`
   - Click **Review** → **Save**
   
6. Create policy for INSERT/UPDATE/DELETE (authenticated only):
   - Click **New Policy** → **For full customization**
   - Name: "Authenticated users can upload"
   - Check INSERT, UPDATE, DELETE
   - Target roles: authenticated
   - Policy definition: `true`
   - Click **Review** → **Save**

## Step 6: Setup Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Email is enabled by default
3. Optional: Enable other providers (Google, GitHub, etc.)

### Create Admin User:
1. Go to **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: (create strong password)
   - **Auto Confirm User**: ✅ Check this
4. Click **Create user**
5. Save these credentials - you'll use them to login as admin!

## Step 7: Test Connection

Run your app:
```bash
npm run dev
```

Visit `http://localhost:3000` - you should see your menu loading from the database!

## Troubleshooting

**Error: "Invalid API key"**
- Check your `.env.local` file has correct keys
- Restart dev server after adding env variables

**Error: "relation menu_items does not exist"**
- Make sure you ran the SQL schema in Step 2
- Check SQL Editor for any error messages

**Images not loading**
- Check storage bucket is public
- Verify storage policies are set correctly

## Next Steps

Once setup is complete, you'll be able to:
- ✅ View menu from database
- ✅ Login as admin at `/admin/login`
- ✅ Add/edit/delete menu items
- ✅ Upload menu images
- ✅ Deploy to Vercel with database connected

Need help? Check Supabase docs: https://supabase.com/docs
