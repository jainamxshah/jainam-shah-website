# Vercel Deployment Guide

This guide will walk you through deploying your Jainam Shah website to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier is sufficient)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **Supabase Database**: Your PostgreSQL database should be set up and accessible

---

## Step 1: Prepare Your Repository

### 1.1 Push Code to GitHub

If you haven't already, push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Ready for deployment"

# Add your GitHub remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/jainam-shah-website.git

# Push to GitHub
git push -u origin main
```

### 1.2 Verify Important Files

Make sure these files exist in your repository:
- ✅ `package.json` - Dependencies and scripts
- ✅ `next.config.ts` - Next.js configuration
- ✅ `vercel.json` - Vercel deployment config
- ✅ `prisma/schema.prisma` - Database schema
- ✅ `.gitignore` - Excludes `.env` files

---

## Step 2: Deploy to Vercel

### 2.1 Import Your Project

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Vercel will auto-detect it's a Next.js project

### 2.2 Configure Project Settings

Vercel should auto-detect:
- **Framework Preset**: Next.js
- **Root Directory**: `./` (root)
- **Build Command**: `prisma generate && next build` (from vercel.json)
- **Output Directory**: `.next` (default)

**Important**: Make sure the build command includes `prisma generate` to generate the Prisma client.

---

## Step 3: Environment Variables

### 3.1 Add Environment Variables in Vercel

In your Vercel project settings, go to **Settings** → **Environment Variables** and add:

#### Required Variables:

```bash
# Database Connection (Supabase)
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Admin Credentials (for admin panel)
ADMIN_EMAIL="admin@jainamshah.com"
ADMIN_PASSWORD="your-secure-password-here"
```

#### How to Generate NEXTAUTH_SECRET:

```bash
# On macOS/Linux
openssl rand -base64 32

# On Windows (PowerShell)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

#### Supabase Connection String Format:

Your Supabase connection string should look like:
```
postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require
```

Or use the connection pooler:
```
postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?sslmode=require
```

### 3.2 Set for All Environments

Make sure to add these variables for:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development** (optional, for local testing)

---

## Step 4: Database Setup

### 4.1 Run Database Migrations

After your first deployment, you need to run Prisma migrations:

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Run migrations (this will use your production DATABASE_URL)
npx prisma migrate deploy
```

**Option B: Using Supabase SQL Editor**

1. Go to your Supabase dashboard
2. Open SQL Editor
3. Run the migration SQL manually (from `prisma/migrations/`)

**Option C: Using a One-Time Build Script**

Create a script that runs migrations during build (not recommended for production):

```json
// In package.json
{
  "scripts": {
    "postinstall": "prisma generate",
    "build": "prisma migrate deploy && next build"
  }
}
```

### 4.2 Seed Admin User

After migrations, seed your admin user:

```bash
# Set your production DATABASE_URL temporarily
export DATABASE_URL="your-production-database-url"

# Run seed script
npm run seed
```

Or create the admin user manually via Supabase dashboard or SQL:

```sql
INSERT INTO "User" (id, email, password, name, "createdAt", "updatedAt")
VALUES (
  'clx...', -- Generate a CUID
  'admin@jainamshah.com',
  '$2a$12$...', -- Hashed password (use bcrypt)
  'Jainam Shah',
  NOW(),
  NOW()
);
```

---

## Step 5: Build Configuration

### 5.1 Verify vercel.json

Your `vercel.json` should look like this:

```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"]
}
```

### 5.2 Build Settings in Vercel Dashboard

In Vercel project settings:
- **Node.js Version**: 20.x (or latest LTS)
- **Install Command**: `npm install` (default)
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next` (default)

---

## Step 6: Deploy

### 6.1 Initial Deployment

1. Click **"Deploy"** in Vercel
2. Wait for the build to complete (usually 2-5 minutes)
3. Check build logs for any errors

### 6.2 Common Build Issues

**Issue: Prisma Client not generated**
- Solution: Ensure `prisma generate` is in the build command

**Issue: Database connection error**
- Solution: Verify `DATABASE_URL` is set correctly in environment variables

**Issue: Missing environment variables**
- Solution: Add all required env vars in Vercel dashboard

---

## Step 7: Post-Deployment

### 7.1 Verify Deployment

1. Visit your deployment URL: `https://your-project.vercel.app`
2. Test the homepage loads correctly
3. Test admin login: `https://your-project.vercel.app/admin/login`

### 7.2 Run Database Migrations

```bash
# Using Vercel CLI
vercel env pull .env.local  # Pull production env vars
npx prisma migrate deploy
```

### 7.3 Seed Database (First Time)

```bash
npm run seed
```

### 7.4 Test Admin Panel

1. Go to `/admin/login`
2. Login with your admin credentials
3. Create a test project/article
4. Verify it appears on the public site

---

## Step 8: Custom Domain (Optional)

### 8.1 Add Domain in Vercel

1. Go to **Settings** → **Domains**
2. Add your domain (e.g., `jainamshah.com`)
3. Follow DNS configuration instructions

### 8.2 Update Environment Variables

Update `NEXTAUTH_URL` to your custom domain:
```
NEXTAUTH_URL="https://jainamshah.com"
```

### 8.3 DNS Configuration

Add these DNS records:

**For Root Domain (jainamshah.com):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For WWW (www.jainamshah.com):**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

Or use Vercel's automatic DNS configuration.

---

## Step 9: Continuous Deployment

### 9.1 Automatic Deployments

Vercel automatically deploys:
- **Production**: Pushes to `main` branch
- **Preview**: Pull requests and other branches

### 9.2 Deployment Workflow

1. Make changes locally
2. Commit and push to GitHub
3. Vercel automatically builds and deploys
4. Preview deployments for PRs
5. Production deployment on merge to `main`

---

## Step 10: Monitoring & Analytics

### 10.1 Vercel Analytics

Already integrated! Check:
- **Analytics** tab in Vercel dashboard
- Real-time visitor data
- Performance metrics

### 10.2 Error Monitoring

Consider adding:
- **Sentry** for error tracking
- **Logtail** for log aggregation

---

## Troubleshooting

### Build Fails

1. Check build logs in Vercel dashboard
2. Verify all environment variables are set
3. Ensure `DATABASE_URL` is accessible from Vercel
4. Check Node.js version compatibility

### Database Connection Issues

1. Verify Supabase allows connections from Vercel IPs
2. Check connection string format
3. Ensure SSL mode is set (`?sslmode=require`)
4. Test connection locally with production URL

### Admin Panel Not Working

1. Verify `NEXTAUTH_SECRET` is set
2. Check `NEXTAUTH_URL` matches your domain
3. Ensure admin user exists in database
4. Check NextAuth configuration

### Images Not Loading

1. Verify image URLs are absolute (not relative)
2. Check `next.config.ts` remote patterns
3. Ensure images are uploaded to a CDN or public folder

---

## Environment Variables Checklist

Before deploying, ensure you have:

- [ ] `DATABASE_URL` - Supabase PostgreSQL connection string
- [ ] `NEXTAUTH_SECRET` - Generated secret key (32+ characters)
- [ ] `NEXTAUTH_URL` - Your deployment URL
- [ ] `ADMIN_EMAIL` - Admin login email
- [ ] `ADMIN_PASSWORD` - Admin login password (hashed in database)

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added
- [ ] Build command includes `prisma generate`
- [ ] Database migrations run
- [ ] Admin user seeded
- [ ] Homepage loads correctly
- [ ] Admin panel accessible
- [ ] Custom domain configured (if applicable)

---

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs**: [prisma.io/docs](https://www.prisma.io/docs)

---

## Next Steps After Deployment

1. ✅ Test all pages and functionality
2. ✅ Add real content via admin panel
3. ✅ Set up custom domain
4. ✅ Configure email forwarding (if needed)
5. ✅ Set up monitoring and alerts
6. ✅ Optimize images and assets
7. ✅ Submit sitemap to Google Search Console

---

**Happy Deploying! 🚀**

