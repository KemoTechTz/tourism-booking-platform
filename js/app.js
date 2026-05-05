(function () {
  "use strict";

  var navItems = [
    ["index", "Overview", "index.html"],
    ["experiences", "Luxury Experiences", "experiences.html"],
    ["booking", "Booking Engine", "booking.html"],
    ["guest", "Guest Portal", "guest-portal.html"],
    ["operator", "Operator Portal", "operator-portal.html"],
    ["admin", "Admin Command Center", "admin.html"],
  ];

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function getCurrentPage() {
    var bodyPage = document.body ? document.body.getAttribute("data-page") : "";
    if (bodyPage) return bodyPage;
    var file = window.location.pathname.split("/").pop() || "index.html";
    return file.replace(".html", "") || "index";
  }

  function initNav() {
    var nav = document.getElementById("navLinks");
    var current = getCurrentPage();
    if (nav) {
      nav.innerHTML = navItems
        .map(function (item) {
          var active = item[0] === current || (current === "experience-details" && item[0] === "experiences") || (current === "payment" && item[0] === "booking");
          return '<a class="nav-link ' + (active ? "active" : "") + '" href="' + item[2] + '">' + item[1] + "</a>";
        })
        .join("");
    }

    var brand = document.querySelector(".brand");
    if (brand) brand.setAttribute("href", "index.html");

    var toggle = document.querySelector("[data-menu-toggle]");
    var topbar = document.getElementById("topbar");
    if (toggle && topbar) {
      toggle.addEventListener("click", function () {
        topbar.classList.toggle("nav-open");
      });
    }
  }

  function bookingStats() {
    var bookings = window.KemoStorage ? window.KemoStorage.getBookings() : [];
    var paidBookings = bookings.filter(function (booking) {
      return booking.paymentStatus === "Paid";
    });
    var pendingBookings = bookings.filter(function (booking) {
      return booking.paymentStatus !== "Paid";
    });
    var revenue = bookings.reduce(function (sum, booking) {
      return sum + Number(booking.amountPaid || 0);
    }, 0);
    var simulatedRevenue = revenue || 86420;
    return {
      bookings: bookings,
      paidBookings: paidBookings,
      pendingBookings: pendingBookings,
      revenue: revenue,
      displayRevenue: simulatedRevenue,
      activeGuests: uniqueGuests(bookings),
    };
  }

  function uniqueGuests(bookings) {
    var map = {};
    bookings.forEach(function (booking) {
      var key = (booking.email || booking.guestName || "").toLowerCase();
      if (key) map[key] = true;
    });
    return Object.keys(map).length;
  }

  function renderLiveStats() {
    var stats = bookingStats();
    var activeBookings = document.querySelectorAll("[data-live-stat='activeBookings']");
    var revenue = document.querySelectorAll("[data-live-stat='revenue']");
    var pending = document.querySelectorAll("[data-live-stat='pendingPayments']");
    var guests = document.querySelectorAll("[data-live-stat='activeGuests']");

    setText(activeBookings, stats.bookings.length || 124);
    setText(revenue, window.KemoUtils.formatMoney(stats.displayRevenue));
    setText(pending, stats.pendingBookings.length);
    setText(guests, stats.activeGuests || 92);
  }

  function setText(nodes, value) {
    Array.prototype.forEach.call(nodes, function (node) {
      node.textContent = value;
    });
  }

  function statusChip(status) {
    var label = window.KemoUtils.safeText(status, "Reserved");
    return '<span class="status-chip ' + window.KemoUtils.statusClass(label) + '">' + window.KemoUtils.escapeHTML(label) + "</span>";
  }

  function paymentChip(status) {
    var label = window.KemoUtils.safeText(status, "Pending Payment");
    return '<span class="status-chip ' + window.KemoUtils.statusClass(label) + '">' + window.KemoUtils.escapeHTML(label) + "</span>";
  }

  function latestActivity(limit) {
    var bookings = window.KemoStorage ? window.KemoStorage.getBookings() : [];
    return bookings.slice(0, limit || 5).map(function (booking) {
      return {
        title: booking.reference || "KEMO-OS-00000",
        copy: (booking.guestName || "Guest Client") + " reserved " + (booking.experienceTitle || "Luxury Tanzania Experience"),
        status: booking.paymentStatus || "Pending Payment",
      };
    });
  }

  function bindInvoiceActions(root) {
    var scope = root || document;
    scope.querySelectorAll("[data-download-invoice]").forEach(function (button) {
      button.addEventListener("click", function () {
        var ref = button.getAttribute("data-download-invoice");
        var booking = window.KemoStorage.getBookingByReference(ref);
        var invoice = window.KemoStorage.getInvoiceByReference(ref);
        window.KemoUtils.downloadInvoiceHTML(invoice, booking);
      });
    });

    scope.querySelectorAll("[data-print-invoice]").forEach(function (button) {
      button.addEventListener("click", function () {
        var ref = button.getAttribute("data-print-invoice");
        var booking = window.KemoStorage.getBookingByReference(ref);
        var invoice = window.KemoStorage.getInvoiceByReference(ref);
        window.KemoUtils.printInvoice(invoice, booking);
      });
    });
  }

  function initGlobalActions() {
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") window.KemoUtils.closeModal();
    });
    renderLiveStats();
  }

  window.KemoApp = {
    getParam: getParam,
    initNav: initNav,
    bookingStats: bookingStats,
    renderLiveStats: renderLiveStats,
    statusChip: statusChip,
    paymentChip: paymentChip,
    latestActivity: latestActivity,
    bindInvoiceActions: bindInvoiceActions,
  };

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initGlobalActions();
  });
})();
