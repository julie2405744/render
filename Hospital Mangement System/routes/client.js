const express          = require('express');
const router           = express.Router();
const { requireClient } = require('../middleware/auth');
const clientController  = require('../controllers/clientController');

const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;

// ---------------------------------------------------------
// @Author: Member 4 (API & File Systems Developer)
// @Responsibility: Multer middleware configuration for Cloudinary uploads
// ---------------------------------------------------------

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

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/dashboard',          requireClient, clientController.getDashboard);
router.post('/book',              requireClient, clientController.bookAppointment);
router.post('/cancel',            requireClient, clientController.cancelAppointment);
router.get('/profile',            requireClient, clientController.getProfile);
router.post('/profile/update-phone', requireClient, clientController.updatePhone);
router.post('/profile/upload',    requireClient, upload.single('reportFile'), clientController.uploadReport);

module.exports = router;
