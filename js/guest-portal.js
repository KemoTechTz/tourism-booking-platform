(function () {
  "use strict";

  function init() {
    render();
  }

  function render() {
    var root = document.getElementById("guestPortalRoot");
    if (!root) return;
    var bookings = window.KemoStorage.getBookings();
    if (!bookings.length) {
      root.innerHTML =
        '<section class="section compact"><article class="glass-card"><p class="card-kicker">Guest Travel Portal</p><h3>No guest bookings yet</h3><p class="muted">Create a reservation from Luxury Experiences and it will appear here with invoice and payment controls.</p><a class="btn primary" href="experiences.html">Reserve an Experience</a></article></section>';
      return;
    }

    root.innerHTML =
      '<section class="section compact">' +
      '<div class="portal-grid">' +
      profileCard(bookings[0]) +
      summaryCard(bookings) +
      activityCard(bookings) +
      "</div>" +
      '<div class="content-stack" style="margin-top:16px">' +
      bookings.map(bookingCard).join("") +
      "</div></section>";
    window.KemoApp.bindInvoiceActions(root);
  }

  function profileCard(booking) {
    return (
      '<article class="portal-card"><p class="card-kicker">Guest Profile</p><div class="profile-card"><div class="avatar large">' +
      initials(booking.guestName) +
      '</div><div><h3>' +
      window.KemoUtils.escapeHTML(booking.guestName || "Guest Client") +
      '</h3><p class="muted">' +
      window.KemoUtils.escapeHTML(booking.email || "guest@example.com") +
      '</p><div class="experience-meta">' +
      window.KemoApp.statusChip(booking.bookingStatus) +
      window.KemoApp.paymentChip(booking.paymentStatus) +
      "</div></div></div></article>"
    );
  }

  function summaryCard(bookings) {
    var totalPaid = bookings.reduce(function (sum, booking) {
      return sum + Number(booking.amountPaid || 0);
    }, 0);
    var balance = bookings.reduce(function (sum, booking) {
      return sum + Number(booking.balanceDue || 0);
    }, 0);
    return (
      '<article class="portal-card"><p class="card-kicker">Payment History</p><div class="metric gold">' +
      window.KemoUtils.formatMoney(totalPaid) +
      '</div><p class="muted">Outstanding balance: <strong>' +
      window.KemoUtils.formatMoney(balance) +
      "</strong></p></article>"
    );
  }

  function activityCard(bookings) {
    return (
      '<article class="portal-card"><p class="card-kicker">Booking Timeline</p><div class="timeline">' +
      bookings
        .slice(0, 3)
        .map(function (booking) {
          return '<div class="timeline-item"><span class="timeline-dot"></span><div><strong>' + window.KemoUtils.escapeHTML(booking.reference) + '</strong><p class="muted">' + window.KemoUtils.escapeHTML(booking.paymentStatus) + " - " + window.KemoUtils.escapeHTML(booking.bookingStatus) + "</p></div></div>";
        })
        .join("") +
      "</div></article>"
    );
  }

  function bookingCard(booking) {
    var invoice = window.KemoStorage.getInvoiceByReference(booking.reference) || {};
    return (
      '<article class="portal-card live-booking-card">' +
      '<div class="split-row"><div><p class="card-kicker">Upcoming Journey</p><h3>' +
      window.KemoUtils.escapeHTML(booking.experienceTitle || "Luxury Tanzania Experience") +
      '</h3><p class="muted">' +
      window.KemoUtils.escapeHTML(booking.destination || "Tanzania") +
      " - " +
      window.KemoUtils.formatDate(booking.travelDate) +
      '</p></div><div class="experience-meta">' +
      window.KemoApp.statusChip(booking.bookingStatus) +
      window.KemoApp.paymentChip(booking.paymentStatus) +
      "</div></div>" +
      '<div class="portal-detail-grid">' +
      detail("Booking reference", booking.reference) +
      detail("Invoice number", invoice.invoiceNumber || booking.invoiceNumber) +
      detail("Total amount", window.KemoUtils.formatMoney(booking.totalAmount || 0)) +
      detail("Amount paid", window.KemoUtils.formatMoney(booking.amountPaid || 0)) +
      detail("Balance due", window.KemoUtils.formatMoney(booking.balanceDue || 0)) +
      detail("Guests", Number(booking.adults || 0) + Number(booking.children || 0)) +
      "</div>" +
      '<div class="button-row" style="margin-top:18px"><button class="btn secondary" type="button" data-download-invoice="' +
      window.KemoUtils.escapeHTML(booking.reference) +
      '">Download Invoice</button><button class="btn secondary" type="button" data-print-invoice="' +
      window.KemoUtils.escapeHTML(booking.reference) +
      '">Print Invoice</button>' +
      (booking.paymentStatus === "Paid" ? '<span class="status-chip confirmed">Paid</span>' : '<a class="btn primary" href="payment.html?ref=' + encodeURIComponent(booking.reference) + '">Pay Now</a>') +
      "</div></article>"
    );
  }

  function detail(label, value) {
    return '<div class="mini-panel"><span class="muted">' + label + '</span><strong>' + window.KemoUtils.escapeHTML(value || "0") + "</strong></div>";
  }

  function initials(name) {
    var parts = String(name || "Guest Client").trim().split(/\s+/);
    return ((parts[0] || "G").charAt(0) + (parts[1] || "C").charAt(0)).toUpperCase();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
