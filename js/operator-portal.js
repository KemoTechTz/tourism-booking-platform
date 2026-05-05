(function () {
  "use strict";

  function init() {
    render();
  }

  function render() {
    var root = document.getElementById("operatorRoot");
    if (!root) return;
    var bookings = window.KemoStorage.getBookings();
    root.innerHTML =
      '<section class="section compact">' +
      '<div class="operator-grid three">' +
      stat(bookings.length, "Incoming Bookings") +
      stat(window.KemoUtils.formatMoney(revenue(bookings)), "Confirmed Revenue") +
      stat(bookings.filter(function (booking) { return booking.bookingStatus === "Confirmed"; }).length, "Confirmed Journeys") +
      "</div>" +
      '<div class="operator-grid" style="margin-top:16px"><article class="dashboard-card"><p class="card-kicker">Incoming Bookings</p>' +
      table(bookings) +
      '</article><article class="dashboard-card"><p class="card-kicker">Recent Activity Feed</p>' +
      activity(bookings) +
      "</article></div></section>";
  }

  function stat(value, label) {
    return '<article class="stat-card"><strong>' + value + "</strong><span>" + label + "</span></article>";
  }

  function revenue(bookings) {
    return bookings.reduce(function (sum, booking) {
      return sum + Number(booking.amountPaid || 0);
    }, 0);
  }

  function table(bookings) {
    if (!bookings.length) return '<div class="empty-state"><h3>No incoming bookings yet</h3><p class="muted">Reservations created by guests will appear here instantly.</p></div>';
    return (
      '<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Guest</th><th>Experience</th><th>Travel Date</th><th>Guests</th><th>Status</th><th>Payment Status</th></tr></thead><tbody>' +
      bookings
        .map(function (booking) {
          return (
            "<tr><td><strong>" +
            window.KemoUtils.escapeHTML(booking.reference) +
            "</strong></td><td>" +
            window.KemoUtils.escapeHTML(booking.guestName || "Guest Client") +
            "</td><td>" +
            window.KemoUtils.escapeHTML(booking.experienceTitle || "Luxury Tanzania Experience") +
            "</td><td>" +
            window.KemoUtils.formatDate(booking.travelDate) +
            "</td><td>" +
            (Number(booking.adults || 0) + Number(booking.children || 0)) +
            "</td><td>" +
            window.KemoApp.statusChip(booking.bookingStatus) +
            "</td><td>" +
            window.KemoApp.paymentChip(booking.paymentStatus) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }

  function activity(bookings) {
    if (!bookings.length) return '<p class="muted">Waiting for the first client reservation.</p>';
    return (
      '<ul class="compact-list">' +
      bookings
        .slice(0, 6)
        .map(function (booking) {
          return '<li><span>' + window.KemoUtils.escapeHTML(booking.reference) + '</span><strong>' + window.KemoUtils.escapeHTML(booking.bookingStatus || "Reserved") + "</strong></li>";
        })
        .join("") +
      "</ul>"
    );
  }

  document.addEventListener("DOMContentLoaded", init);
})();
