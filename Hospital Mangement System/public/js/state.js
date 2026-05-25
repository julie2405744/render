// Hayat Hospital — public/js/state.js
// ---------------------------------------------------------
// @Author: Member 3 (Algorithm & Error Handling Engineer)
// @Responsibility: Shared helper functions for capacity checks and booking queries
// ---------------------------------------------------------
// Shared helper functions used by dashboard pages.
// NOTE: doctors[] and bookings[] are injected via inline <script>
//       in each EJS page BEFORE this file loads — do NOT re-declare them here.

// Returns all bookings for a specific doctor name
function getBookingsForDoctor(doctorName) {
    return bookings.filter(function(b) { return b.doctorName === doctorName; });
}

// Returns true if a doctor has reached their max capacity
function isDoctorFull(doctor) {
    return getBookingsForDoctor(doctor.name).length >= doctor.maxCapacity;
}
