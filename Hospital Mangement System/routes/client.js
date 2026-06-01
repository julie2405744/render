const express          = require('express');
const router           = express.Router();
const { requireClient } = require('../middleware/auth');
const clientController  = require('../controllers/clientController');

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// ---------------------------------------------------------
// @Author: Member 4 (API & File Systems Developer)
// @Responsibility: Multer middleware configuration for Cloudinary uploads
// ---------------------------------------------------------

const cloudEnvState = {
    CLOUDINARY_URL: !!process.env.CLOUDINARY_URL,
    CLOUDINARY_CLOUD_NAME: !!process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: !!process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
};
console.log('Cloudinary env available:', cloudEnvState);

if (process.env.CLOUDINARY_URL) {
    cloudinary.config({ cloudinary_url: process.env.CLOUDINARY_URL });
    console.log('✅ Cloudinary configured via CLOUDINARY_URL');
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('✅ Cloudinary configured via individual variables');
} else {
    console.error('❌ Cloudinary not configured - missing environment variables');
}

// Environment: allow switching to local uploads for development
const env = (process.env.ENVIRONMENT || process.env.NODE_ENV || 'production').toString().toLowerCase();
const isLocal = env === 'development' || env === 'local';

if (isLocal) {
    // Ensure uploads directory exists when running locally
    const uploadsDir = path.join(__dirname, '..', 'uploads');
    try { if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true }); } catch (e) { /* ignore */ }
    console.log('ℹ️ Running in local mode — saving uploads to', uploadsDir);
}

const storage = isLocal
    ? multer.diskStorage({
        destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
        filename: (req, file, cb) => {
            const safeName = `${Date.now()}_${Math.floor(Math.random() * 1e6)}${path.extname(file.originalname)}`;
            cb(null, safeName);
        }
    })
    : multer.memoryStorage();

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/dashboard',          requireClient, clientController.getDashboard);
router.post('/book',              requireClient, clientController.bookAppointment);
router.post('/cancel',            requireClient, clientController.cancelAppointment);
router.get('/profile',            requireClient, clientController.getProfile);
router.post('/profile/update-phone', requireClient, clientController.updatePhone);
router.post('/profile/upload',    requireClient, upload.single('reportFile'), clientController.uploadReport);

module.exports = router;
