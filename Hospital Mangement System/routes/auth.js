// Hayat Hospital — routes/auth.js
// ---------------------------------------------------------
// @Author: Member 1 (Security & Architecture Lead)
// @Responsibility: Authentication routing (login, signup, logout)
// ---------------------------------------------------------
const express        = require('express');
const router         = express.Router();
const authController = require('../controllers/authController');

// GET  /auth       — Login / Sign-up page
router.get('/',          authController.getLogin);

// POST /auth/login — Process login
router.post('/login',    authController.postLogin);

// POST /auth/signup — Process signup
router.post('/signup',   authController.postSignup);

// GET  /auth/logout — Destroy session and redirect
router.get('/logout',    authController.logout);

module.exports = router;
