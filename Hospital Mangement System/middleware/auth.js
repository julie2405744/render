// Hayat Hospital — middleware/auth.js
// ---------------------------------------------------------
// @Author: Member 1 (Security & Architecture Lead)
// @Responsibility: Role-based access control and protecting private routes
// ---------------------------------------------------------

// Protect patient-facing routes
exports.requireClient = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== 'client')
        return res.redirect('/auth');
    next();
};

// Protect admin-facing routes
exports.requireAdmin = (req, res, next) => {
    if (!req.session.isAdmin) return res.redirect('/admin/login');
    next();
};
