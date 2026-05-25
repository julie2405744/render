// Hayat Hospital — routes/landing.js
// ---------------------------------------------------------
// @Author: Member 1 (Security & Architecture Lead)
// @Responsibility: Landing page routing
// ---------------------------------------------------------
const express = require('express');
const router  = express.Router();

// GET / — Landing page
router.get('/', (req, res) => res.render('pages/landing'));

module.exports = router;
