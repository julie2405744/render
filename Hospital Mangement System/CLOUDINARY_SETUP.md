# File Upload Fix - Cloudinary Setup Guide

## Problem
File uploads were not working on hayathospital.me due to Railway's **ephemeral filesystem** - all files are deleted when the app restarts or redeploys.

## Solution
The code now uses **Cloudinary** for cloud storage (free tier available).

---

## Setup Instructions

### 1. Create a Cloudinary Account (Free)
- Go to [cloudinary.com](https://cloudinary.com)
- Sign up for a free account
- Verify your email

### 2. Get Your Credentials
- Go to your **Dashboard**
- You'll see:
  - **Cloud Name** - e.g., `djxyz123`
  - **API Key** - e.g., `123456789`
  - **API Secret** - Keep this private! (click the eye icon to reveal)

### 3. Set Environment Variables on Railway

1. Go to your **Railway Dashboard**
2. Select your **Hospital Management System** project
3. Click on your **service** (app)
4. Go to the **Variables** tab
5. Add these 3 variables:
   ```
   CLOUDINARY_CLOUD_NAME = your_cloud_name
   CLOUDINARY_API_KEY = your_api_key
   CLOUDINARY_API_SECRET = your_api_secret
   ```
6. Click **Deploy** to apply changes

### 4. For Local Development
Create a `.env` file in the project root:
```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 5. Install Dependencies
```bash
npm install
```
(Already added to package.json: `cloudinary` and `multer-storage-cloudinary`)

### 6. Deploy to Railway
```bash
git add .
git commit -m "Fix: Switch to Cloudinary for file uploads"
git push
```

Railway will automatically detect the changes and redeploy.

---

## What Changed

### Files Updated:
- **routes/client.js** - Now uses Cloudinary storage instead of disk storage
- **controllers/clientController.js** - Stores Cloudinary URLs instead of local filenames
- **views/pages/profile.ejs** - Handles both Cloudinary and local URLs (backward compatible)
- **views/pages/doctor-dashboard.ejs** - Same backward compatibility
- **app.js** - Disabled local `/uploads` serving (commented out)
- **package.json** - Added `cloudinary` and `multer-storage-cloudinary`

### Key Technical Details:
- Files stored in Cloudinary folder: `hayat-hospital/medical-records/`
- Max file size: 5 MB (enforced by multer)
- Supported formats: PDF, PNG, JPG, JPEG, TXT, DOC, DOCX
- Cloudinary URLs are permanent (stored in MongoDB with the upload record)

---

## Testing

### Local Test
1. Add `.env` file with Cloudinary credentials
2. Run `npm install`
3. Start the app: `npm run dev`
4. Go to Client Dashboard → Profile → Upload a file
5. Verify the file appears with a working link

### Production Test on Railway
1. Add environment variables to Railway
2. Push code to trigger deployment
3. Login as a client on hayathospital.me
4. Upload a medical record
5. Verify it appears and is downloadable

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "CLOUDINARY_CLOUD_NAME is not defined" | Add variable to Railway's Variables tab (not values.json) |
| "Multer storage configuration failed" | Verify all 3 Cloudinary credentials are correct |
| "File size exceeds limit" | Max size is 5 MB; compress or split larger files |
| "File type not allowed" | Only PDF, PNG, JPG, JPEG, TXT, DOC, DOCX are supported |
| Uploads work locally but fail on Railway | Check Railway Variables tab - ensure all 3 Cloudinary vars are set |
| Old uploads not visible | Legacy local uploads in database still work (backward compatible) |

---

## Free Tier Limits
- **Storage**: 25 MB total
- **Bandwidth**: 25 GB/month
- **Upload limit**: 100 MB per file

For larger deployments, upgrade to a paid plan.

---

## Railway-Specific Notes
- Railway's filesystem is ephemeral (resets on redeploy)
- Environment variables persist across redeployments ✅
- Cloudinary is the ideal solution for Railway deployments
- No need to configure persistent volumes or external storage

