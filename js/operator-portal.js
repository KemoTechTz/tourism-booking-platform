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
      "</article></div>" +
      '<div class="premium-section-grid">' +
      myExperiences() +
      availabilityCard() +
      guestRequests(bookings) +
      payoutCard(bookings) +
      assignmentsCard("Guide Assignments", [["Musa Kileo", "Assigned"], ["Rehema Mushi", "Standby"], ["Juma Ally", "Available"]]) +
      assignmentsCard("Vehicle Assignments", [["Luxury 4x4 - T 482 KMO", "Ready"], ["Executive SUV - T 219 KMO", "Service"], ["Safari Cruiser - T 601 KMO", "Ready"]]) +
      assignmentsCard("Hotel Partners", [["Serengeti Gold Lodge", "8 suites"], ["Ngorongoro Rim House", "5 suites"], ["Zanzibar Azure Villas", "4 villas"]]) +
      "</div></section>";
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

  function myExperiences() {
    return '<article class="dashboard-card"><p class="card-kicker">My Experiences</p><ul class="compact-list"><li><span>Serengeti Private Migration Safari</span><strong>6 slots</strong></li><li><span>Ngorongoro Crater Signature Tour</span><strong>12 slots</strong></li><li><span>Tarangire Elephant Migration Safari</span><strong>9 slots</strong></li></ul></article>';
  }

  function availabilityCard() {
    var html = '<article class="dashboard-card"><p class="card-kicker">Availability Calendar</p><div class="calendar-grid">';
    for (var i = 1; i <= 21; i += 1) {
      html += '<div class="date-cell ' + ([3, 8, 15].indexOf(i) >= 0 ? "hot" : [5, 11, 18].indexOf(i) >= 0 ? "open" : "") + '">' + i + "</div>";
    }
    return html + "</div></article>";
  }

  function guestRequests(bookings) {
    var rows = bookings.length
      ? bookings.slice(0, 3).map(function (booking) {
          return [booking.guestName || "Guest Client", booking.specialRequest || booking.travelNotes || "Confirm arrival transfer"];
        })
      : [["Amina Hassan", "Vegetarian dining"], ["David Wilson", "Balloon quote"], ["Fatma Said", "Child seat"]];
    return '<article class="dashboard-card"><p class="card-kicker">Guest Requests</p><ul class="compact-list">' + rows.map(function (row) { return "<li><span>" + window.KemoUtils.escapeHTML(row[0]) + "</span><strong>" + window.KemoUtils.escapeHTML(row[1]) + "</strong></li>"; }).join("") + "</ul></article>";
  }

  function payoutCard(bookings) {
    var total = revenue(bookings);
    return '<article class="dashboard-card"><p class="card-kicker">Payout Status</p><div class="metric gold">' + window.KemoUtils.formatMoney(total * 0.82) + '</div><p class="muted">Estimated operator payout after platform fees.</p><ul class="compact-list"><li><span>Pending release</span><strong>' + window.KemoUtils.formatMoney(total * 0.18) + '</strong></li><li><span>Next payout</span><span class="status-chip pending">Friday</span></li></ul></article>';
  }

  function assignmentsCard(title, rows) {
    return '<article class="dashboard-card"><p class="card-kicker">' + title + '</p><ul class="compact-list">' + rows.map(function (row) { return "<li><span>" + window.KemoUtils.escapeHTML(row[0]) + "</span><strong>" + window.KemoUtils.escapeHTML(row[1]) + "</strong></li>"; }).join("") + "</ul></article>";
  }

  document.addEventListener("DOMContentLoaded", init);
})();
