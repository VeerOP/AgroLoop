# AGROLOOP — Deployment & Production Guide
**Vertical**: Entrepreneurship | **Component**: Cloud Deployment & Environment Guide  
**Project**: AgroLoop (Circular Bio-Economy Platform)  
**Author**: Veer Nagda (B.Tech Computer Engineering) | **Mentor**: Prof. Deepali A. Maste  

---

## 1. Hosting Architecture

- **Frontend & Serverless Edge**: Vercel Serverless Platform (Node.js 20.x runtime, Edge middleware).
- **Database & Auth**: Supabase Managed PostgreSQL with Row Level Security.
- **AI Core**: Google Gemini 1.5 API via Google Cloud AI Studio.
- **Maps**: MapLibre GL rendered with OpenStreetMap vector tiles.

---

## 2. Environment Variables Configuration

Copy `.env.example` to `.env.local` for local development or set in Vercel project settings:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Google Gemini API
GEMINI_API_KEY=your-gemini-api-key-here

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_DEMO_MODE=true
```

---

## 3. Deployment Steps

1. **Build Verification**:
   ```bash
   npm install
   npm run build
   ```
2. **Execute Automated E2E Tests**:
   ```bash
   npm run test:e2e
   ```
3. **Database Migration Deployment**:
   ```bash
   npx supabase db push
   ```
4. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```
