// ═══════════════════════════════════════════════════
//  Hayat Hospital — public/js/landing.js
// ---------------------------------------------------------
// @Author: Member 1 (Security & Architecture Lead)
// @Responsibility: Landing page animations and scroll effects
// ---------------------------------------------------------
//  Landing page: smooth scroll only.
//  No admin portal card here — it's in the navbar.
// ═══════════════════════════════════════════════════

// Navbar scroll shadow
window.addEventListener('scroll', function () {
    var navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 10
            ? '0 2px 20px rgba(0,0,0,0.08)'
            : 'none';
    }
});
