// ═══════════════════════════════════════════════════
//  Hayat Hospital — public/js/admin-login.js
// ---------------------------------------------------------
// @Author: Member 2 (Database & Admin Manager)
// @Responsibility: Admin login client-side validation
// ---------------------------------------------------------
//  Admin login form — client-side validation only.
//  The form POSTs to /admin/login (server handles auth).
// ═══════════════════════════════════════════════════

function handleAdminLogin(event) {
    var username = document.getElementById('admin-username').value.trim();
    var password = document.getElementById('admin-password').value;

    if (!username || !password) {
        event.preventDefault();
        alert('Please enter both username and password.');
        return;
    }

    var btn = document.getElementById('admin-login-btn');
    btn.textContent = 'Logging in...';
    btn.disabled    = true;

    // Form submits natively to POST /admin/login
    document.getElementById('admin-login-form').action  = '/admin/login';
    document.getElementById('admin-login-form').method  = 'POST';
}
