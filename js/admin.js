(function () {
  "use strict";

  var bookingStatuses = ["Reserved", "Confirmed", "Completed", "Cancelled"];
  var paymentStatuses = ["Pending Payment", "Paid", "Bank Transfer Pending", "Pay on Arrival"];

  function init() {
    render();
  }

  function render() {
    var root = document.getElementById("adminRoot");
    if (!root) return;
    var bookings = window.KemoStorage.getBookings();
    var stats = computeStats(bookings);
    root.innerHTML =
      '<section class="section compact">' +
      '<div class="admin-stat-grid live-admin-grid">' +
      stat(window.KemoUtils.formatMoney(stats.revenue), "Live Revenue") +
      stat(bookings.length, "Total Bookings") +
      stat(stats.pendingPayments, "Pending Payments") +
      stat(stats.activeGuests, "Active Guests") +
      stat("12", "Active Operators") +
      stat(stats.conversion + "%", "Conversion Rate") +
      "</div>" +
      '<div class="admin-grid" style="margin-top:16px"><article class="dashboard-card"><div class="split-row"><div><p class="card-kicker">Revenue Intelligence</p><h3>Live revenue from local bookings</h3></div>' +
      (recentBooking(bookings) ? '<span class="status-chip pending">New booking indicator</span>' : '<span class="status-chip confirmed">Synced</span>') +
      '</div><div class="revenue-chart">' +
      chartBars(bookings) +
      '</div></article><article class="dashboard-card"><p class="card-kicker">Booking Pipeline</p>' +
      pipeline(bookings) +
      "</article></div>" +
      '<article class="dashboard-card" style="margin-top:16px"><p class="card-kicker">Recent Reservations</p>' +
      reservationsTable(bookings) +
      "</article>" +
      '<div class="premium-section-grid">' +
      paymentOps(bookings) +
      topExperiences(bookings) +
      destinationPerformance(bookings) +
      approvalQueue() +
      guestManagement(bookings) +
      inventoryCard() +
      systemHealth() +
      '<article class="dashboard-card"><p class="card-kicker">Recent Activity Feed</p>' + activityFeed(bookings) + "</article>" +
      "</div></section>";
    bind(root);
    window.KemoApp.bindInvoiceActions(root);
  }

  function computeStats(bookings) {
    var revenue = bookings.reduce(function (sum, booking) {
      return sum + Number(booking.amountPaid || 0);
    }, 0);
    var pending = bookings.filter(function (booking) {
      return booking.paymentStatus !== "Paid";
    }).length;
    var guests = {};
    bookings.forEach(function (booking) {
      var key = (booking.email || booking.guestName || "").toLowerCase();
      if (key) guests[key] = true;
    });
    var confirmed = bookings.filter(function (booking) {
      return booking.bookingStatus === "Confirmed" || booking.paymentStatus === "Paid";
    }).length;
    return {
      revenue: revenue,
      pendingPayments: pending,
      activeGuests: Object.keys(guests).length,
      conversion: bookings.length ? Math.round((confirmed / bookings.length) * 1000) / 10 : 0,
    };
  }

  function stat(value, label) {
    return '<article class="stat-card"><strong>' + value + "</strong><span>" + label + "</span></article>";
  }

  function recentBooking(bookings) {
    if (!bookings.length) return false;
    var created = new Date(bookings[0].createdAt || 0).getTime();
    return Date.now() - created < 10 * 60 * 1000;
  }

  function chartBars(bookings) {
    var values = bookings.length
      ? bookings.slice(0, 9).map(function (booking) {
          return Math.max(12, Math.min(96, Math.round((Number(booking.amountPaid || booking.totalAmount || 0) / 7000) * 80)));
        })
      : [42, 54, 48, 72, 66, 83, 92, 78, 96];
    return values
      .map(function (height, index) {
        return '<div class="revenue-column" style="height:' + height + '%"><span>' + (index + 1) + "</span></div>";
      })
      .join("");
  }

  function activityFeed(bookings) {
    if (!bookings.length) return '<p class="muted">No local booking activity yet. Create a booking to wake up the dashboard.</p>';
    return (
      '<ul class="compact-list">' +
      bookings
        .slice(0, 6)
        .map(function (booking) {
          return '<li><span>' + window.KemoUtils.escapeHTML(booking.reference) + '</span><strong>' + window.KemoUtils.escapeHTML(booking.paymentStatus || "Pending Payment") + "</strong></li>";
        })
        .join("") +
      "</ul>"
    );
  }

  function pipeline(bookings) {
    var total = Math.max(bookings.length, 1);
    var confirmed = bookings.filter(function (booking) { return booking.bookingStatus === "Confirmed" || booking.bookingStatus === "Completed"; }).length;
    var paid = bookings.filter(function (booking) { return booking.paymentStatus === "Paid"; }).length;
    var pending = bookings.filter(function (booking) { return booking.paymentStatus !== "Paid"; }).length;
    var rows = [
      ["Discovery", Math.min(96, 62 + total * 5)],
      ["Quote sent", Math.min(88, 48 + total * 4)],
      ["Reserved", Math.round((total / Math.max(total, 1)) * 100)],
      ["Paid", Math.round((paid / total) * 100)],
      ["Pending", Math.round((pending / total) * 100)],
      ["Completed", Math.round((confirmed / total) * 100)],
    ];
    return '<div class="pipeline">' + rows.map(function (row) { return '<div class="pipeline-row"><span>' + row[0] + '</span><div class="progress-track"><span style="width:' + row[1] + '%"></span></div><strong>' + row[1] + "%</strong></div>"; }).join("") + "</div>";
  }

  function paymentOps(bookings) {
    var paid = bookings.filter(function (booking) { return booking.paymentStatus === "Paid"; }).reduce(function (sum, booking) { return sum + Number(booking.amountPaid || 0); }, 0);
    var pending = bookings.filter(function (booking) { return booking.paymentStatus !== "Paid"; }).reduce(function (sum, booking) { return sum + Number(booking.balanceDue || 0); }, 0);
    return '<article class="dashboard-card"><p class="card-kicker">Payment Operations</p><ul class="compact-list"><li><span>Paid volume</span><strong>' + window.KemoUtils.formatMoney(paid) + '</strong></li><li><span>Pending balance</span><strong>' + window.KemoUtils.formatMoney(pending) + '</strong></li><li><span>Bank transfer queue</span><span class="status-chip blue">Review</span></li><li><span>Pay on arrival</span><span class="status-chip purple">Reserved</span></li></ul></article>';
  }

  function topExperiences(bookings) {
    var rows = aggregate(bookings, "experienceTitle", "Luxury Tanzania Experience");
    if (!rows.length) rows = [["Tanzania Honeymoon Signature Journey", 31400], ["Serengeti Private Migration Safari", 24920], ["Zanzibar Presidential Beach Escape", 18600]];
    return '<article class="dashboard-card"><p class="card-kicker">Top Performing Experiences</p><ul class="compact-list">' + rows.slice(0, 4).map(function (row) { return "<li><span>" + window.KemoUtils.escapeHTML(row[0]) + "</span><strong>" + window.KemoUtils.formatMoney(row[1]) + "</strong></li>"; }).join("") + "</ul></article>";
  }

  function destinationPerformance(bookings) {
    var rows = aggregate(bookings, "destination", "Tanzania");
    if (!rows.length) rows = [["Serengeti", 42], ["Zanzibar", 31], ["Ngorongoro", 18]];
    return '<article class="dashboard-card"><p class="card-kicker">Destination Performance</p><ul class="compact-list">' + rows.slice(0, 4).map(function (row) { return "<li><span>" + window.KemoUtils.escapeHTML(row[0]) + '</span><span class="status-chip confirmed">' + window.KemoUtils.formatMoney(row[1]) + "</span></li>"; }).join("") + "</ul></article>";
  }

  function aggregate(bookings, key, fallback) {
    var map = {};
    bookings.forEach(function (booking) {
      var label = booking[key] || fallback;
      map[label] = (map[label] || 0) + Number(booking.amountPaid || booking.totalAmount || 0);
    });
    return Object.keys(map).map(function (label) { return [label, map[label]]; }).sort(function (a, b) { return b[1] - a[1]; });
  }

  function approvalQueue() {
    return '<article class="dashboard-card"><p class="card-kicker">Operator Approval Queue</p><ul class="compact-list"><li><span>Coastal Elite Tours</span><span class="status-chip pending">Review</span></li><li><span>Kili Summit Group</span><span class="status-chip pending">Documents</span></li><li><span>Rift Valley Retreats</span><span class="status-chip confirmed">Approved</span></li></ul></article>';
  }

  function guestManagement(bookings) {
    var rows = bookings.slice(0, 3).map(function (booking) { return [booking.guestName || "Guest Client", booking.paymentStatus || "Pending Payment"]; });
    if (!rows.length) rows = [["Amina Hassan", "VIP"], ["David Wilson", "Balance due"], ["Neema Joseph", "Returning"]];
    return '<article class="dashboard-card"><p class="card-kicker">Guest Management</p><ul class="compact-list">' + rows.map(function (row) { return "<li><span>" + window.KemoUtils.escapeHTML(row[0]) + "</span><strong>" + window.KemoUtils.escapeHTML(row[1]) + "</strong></li>"; }).join("") + "</ul></article>";
  }

  function inventoryCard() {
    return '<article class="dashboard-card"><p class="card-kicker">Experience Inventory</p><ul class="compact-list"><li><span>Published</span><strong>38</strong></li><li><span>Pending QA</span><strong>6</strong></li><li><span>Limited availability</span><strong>11</strong></li></ul></article>';
  }

  function systemHealth() {
    return '<article class="dashboard-card"><p class="card-kicker">System Health</p><div class="health-grid"><div class="health-item"><strong>Booking Engine</strong><p class="muted">Healthy</p></div><div class="health-item"><strong>Payment Simulation</strong><p class="muted">Healthy</p></div><div class="health-item"><strong>Invoice Storage</strong><p class="muted">localStorage synced</p></div><div class="health-item"><strong>Portal Sync</strong><p class="muted">Live</p></div></div></article>';
  }

  function reservationsTable(bookings) {
    if (!bookings.length) return '<div class="empty-state"><h3>No reservations yet</h3><p class="muted">Bookings generated from the booking engine will appear here immediately.</p></div>';
    return (
      '<div class="table-wrap"><table><thead><tr><th>Reference</th><th>Guest</th><th>Experience</th><th>Destination</th><th>Amount</th><th>Payment Status</th><th>Booking Status</th><th>Invoice</th><th>Action</th></tr></thead><tbody>' +
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
            window.KemoUtils.escapeHTML(booking.destination || "Tanzania") +
            "</td><td>" +
            window.KemoUtils.formatMoney(booking.totalAmount || 0) +
            "</td><td>" +
            window.KemoApp.paymentChip(booking.paymentStatus) +
            "</td><td>" +
            window.KemoApp.statusChip(booking.bookingStatus) +
            '</td><td><button class="btn ghost small" type="button" data-download-invoice="' +
            window.KemoUtils.escapeHTML(booking.reference) +
            '">Invoice</button></td><td><button class="btn primary small" type="button" data-view-booking="' +
            window.KemoUtils.escapeHTML(booking.reference) +
            '">View</button></td></tr>'
          );
        })
        .join("") +
      "</tbody></table></div>"
    );
  }

  function bind(root) {
    root.querySelectorAll("[data-view-booking]").forEach(function (button) {
      button.addEventListener("click", function () {
        openBookingModal(button.getAttribute("data-view-booking"));
      });
    });
  }

  function openBookingModal(reference) {
    var booking = window.KemoStorage.getBookingByReference(reference);
    var invoice = window.KemoStorage.getInvoiceByReference(reference) || {};
    if (!booking) return;
    var body =
      '<div class="portal-detail-grid">' +
      detail("Reference", booking.reference) +
      detail("Guest", booking.guestName) +
      detail("Experience", booking.experienceTitle) +
      detail("Invoice", invoice.invoiceNumber || booking.invoiceNumber) +
      detail("Total", window.KemoUtils.formatMoney(booking.totalAmount || 0)) +
      detail("Balance", window.KemoUtils.formatMoney(booking.balanceDue || 0)) +
      '</div><div class="form-grid" style="margin-top:16px">' +
      select("adminBookingStatus", "Booking Status", bookingStatuses, booking.bookingStatus || "Reserved") +
      select("adminPaymentStatus", "Payment Status", paymentStatuses, booking.paymentStatus || "Pending Payment") +
      '</div><div class="button-row" style="margin-top:18px"><button class="btn primary" type="button" data-admin-save="' +
      window.KemoUtils.escapeHTML(reference) +
      '">Save Status</button><button class="btn secondary" type="button" data-download-invoice="' +
      window.KemoUtils.escapeHTML(reference) +
      '">Download Invoice</button><a class="btn ghost" href="payment.html?ref=' +
      encodeURIComponent(reference) +
      '">Open Payment Page</a></div>';
    window.KemoUtils.openModal({ title: "Booking Details", body: body });
    var save = document.querySelector("[data-admin-save]");
    if (save) {
      save.addEventListener("click", function () {
        var bookingStatus = document.getElementById("adminBookingStatus").value;
        var paymentStatus = document.getElementById("adminPaymentStatus").value;
        var amountPaid = paymentStatus === "Paid" ? booking.totalAmount || 0 : booking.amountPaid || 0;
        var balanceDue = paymentStatus === "Paid" ? 0 : booking.totalAmount || 0;
        var updates = {
          bookingStatus: bookingStatus,
          paymentStatus: paymentStatus,
          amountPaid: amountPaid,
          balanceDue: balanceDue,
        };
        window.KemoStorage.updateBooking(reference, updates);
        window.KemoStorage.updateInvoice(reference, updates);
        window.KemoUtils.closeModal();
        window.KemoUtils.showToast("Status updated for " + reference, "success");
        render();
      });
    }
    window.KemoApp.bindInvoiceActions(document.getElementById("modalRoot"));
  }

  function detail(label, value) {
    return '<div class="mini-panel"><span class="muted">' + label + '</span><strong>' + window.KemoUtils.escapeHTML(value || "0") + "</strong></div>";
  }

  function select(id, label, options, value) {
    return (
      '<label class="form-field"><span>' +
      label +
      '</span><select id="' +
      id +
      '">' +
      options
        .map(function (option) {
          return '<option value="' + option + '" ' + (option === value ? "selected" : "") + ">" + option + "</option>";
        })
        .join("") +
      "</select></label>"
    );
  }

  document.addEventListener("DOMContentLoaded", init);
})();
