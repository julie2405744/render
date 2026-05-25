// Hayat Hospital — routes/doctor.js
// ---------------------------------------------------------
// @Author: Member 5 (Interactive Operations Developer)
// @Responsibility: Doctor routing (login, dashboard, slot management)
// ---------------------------------------------------------
const express          = require('express');
const router           = express.Router();
const doctorController = require('../controllers/doctorController');

router.get('/login',        doctorController.getLogin);
router.post('/login',       doctorController.postLogin);
router.get('/dashboard',    doctorController.getDashboard);
router.post('/update-slots', doctorController.updateSlots);
router.post('/clear-slot',  doctorController.clearSlot);   // Cancel all + clear slot
router.get('/logout',       doctorController.logout);

module.exports = router;
