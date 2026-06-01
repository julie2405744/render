const express          = require('express');
const router           = express.Router();
const { requireClient } = require('../middleware/auth');
const clientController  = require('../controllers/clientController');

const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ---------------------------------------------------------
// @Author: Member 4 (API & File Systems Developer)
// @Responsibility: Multer middleware configuration for Cloudinary uploads
// ---------------------------------------------------------

// Configure Cloudinary - Parse CLOUDINARY_URL or use individual variables
function configureCloudinary() {
    if (process.env.CLOUDINARY_URL) {
        // Parse CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
        const url = new URL(process.env.CLOUDINARY_URL.replace('cloudinary://', 'https://'));
        cloudinary.config({
            cloud_name: url.hostname,
            api_key: url.username,
            api_secret: url.password
        });
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
}

configureCloudinary();

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'hayat-hospital/medical-records',
        resource_type: 'auto',
        allowed_formats: ['pdf', 'png', 'jpg', 'jpeg', 'txt', 'doc', 'docx']
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

router.get('/dashboard',          requireClient, clientController.getDashboard);
router.post('/book',              requireClient, clientController.bookAppointment);
router.post('/cancel',            requireClient, clientController.cancelAppointment);
router.get('/profile',            requireClient, clientController.getProfile);
router.post('/profile/update-phone', requireClient, clientController.updatePhone);
router.post('/profile/upload',    requireClient, upload.single('reportFile'), (err, req, res, next) => {
    // Multer error handler
    if (err) {
        console.error('❌ Multer error:', err.message);
        return res.redirect('/client/profile?error=' + encodeURIComponent('Upload failed: ' + err.message));
    }
    next();
}, clientController.uploadReport);

module.exports = router;
