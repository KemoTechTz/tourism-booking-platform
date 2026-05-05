(function () {
  "use strict";

  function safeText(value, fallback) {
    if (value === undefined || value === null || value === "") return fallback || "";
    return String(value);
  }

  function escapeHTML(value) {
    return safeText(value, "").replace(/[&<>"']/g, function (char) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      }[char];
    });
  }

  function generateBookingReference() {
    var existing = window.KemoStorage && window.KemoStorage.getBookings ? window.KemoStorage.getBookings() : [];
    var refs = {};
    for (var i = 0; i < existing.length; i += 1) refs[existing[i].reference] = true;
    var reference = "";
    do {
      reference = "KEMO-OS-" + String(Math.floor(10000 + Math.random() * 90000));
    } while (refs[reference]);
    return reference;
  }

  function generateInvoiceNumber(reference) {
    var suffix = safeText(reference, "00000").replace(/\D/g, "").slice(-5) || String(Math.floor(10000 + Math.random() * 90000));
    return "INV-KEMO-2026-" + suffix;
  }

  function formatMoney(value) {
    var amount = Number(value);
    if (!Number.isFinite(amount)) amount = 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  }

  function formatDate(value) {
    if (!value) return "Not scheduled";
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return safeText(value, "Not scheduled");
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }

  function statusClass(status) {
    var normalized = safeText(status, "").toLowerCase();
    if (normalized === "paid" || normalized === "confirmed") return "confirmed";
    if (normalized === "completed" || normalized.indexOf("bank transfer") >= 0) return "blue";
    if (normalized.indexOf("arrival") >= 0) return "purple";
    if (normalized === "cancelled") return "cancelled";
    return "pending";
  }

  function showToast(message, type) {
    var root = document.getElementById("toastRoot");
    if (!root) {
      root = document.createElement("div");
      root.id = "toastRoot";
      root.className = "toast-root";
      document.body.appendChild(root);
    }
    var toast = document.createElement("div");
    toast.className = "toast " + (type || "info");
    toast.textContent = safeText(message, "Action completed");
    root.appendChild(toast);
    window.setTimeout(function () {
      toast.classList.add("show");
    }, 20);
    window.setTimeout(function () {
      toast.classList.remove("show");
      window.setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 220);
    }, 3400);
  }

  function openModal(options) {
    var root = document.getElementById("modalRoot");
    if (!root) {
      root = document.createElement("div");
      root.id = "modalRoot";
      document.body.appendChild(root);
    }
    var title = escapeHTML(options && options.title ? options.title : "Kemo Tourism OS");
    var body = options && options.body ? options.body : "";
    root.innerHTML =
      '<div class="modal-backdrop" role="dialog" aria-modal="true">' +
      '<div class="modal">' +
      '<p class="eyebrow">Kemo Tourism OS</p>' +
      "<h3>" +
      title +
      "</h3>" +
      '<div class="modal-body">' +
      body +
      "</div>" +
      '<div class="modal-actions"><button class="btn primary" type="button" data-close-modal>Done</button></div>' +
      "</div>" +
      "</div>";
    var closeButton = root.querySelector("[data-close-modal]");
    if (closeButton) closeButton.addEventListener("click", closeModal);
    root.querySelector(".modal-backdrop").addEventListener("click", function (event) {
      if (event.target.classList.contains("modal-backdrop")) closeModal();
    });
  }

  function closeModal() {
    var root = document.getElementById("modalRoot");
    if (root) root.innerHTML = "";
  }

  function invoiceHTML(invoice, booking) {
    invoice = invoice || {};
    booking = booking || {};
    var lineItems = Array.isArray(invoice.lineItems) ? invoice.lineItems : [];
    return (
      "<!doctype html>" +
      '<html lang="en"><head><meta charset="UTF-8" />' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0" />' +
      "<title>Invoice " +
      escapeHTML(invoice.invoiceNumber || booking.invoiceNumber || "Kemo Tourism OS") +
      "</title>" +
      "<style>" +
      "body{font-family:Arial,sans-serif;color:#121212;margin:0;background:#f7f1e7} .invoice{max-width:920px;margin:32px auto;background:#fff;padding:42px;border:1px solid #d8c69d;box-shadow:0 24px 80px rgba(0,0,0,.12)}" +
      ".brand{display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #c8a35d;padding-bottom:22px;margin-bottom:28px}.mark{width:54px;height:54px;border-radius:16px;background:#101827;color:#f0d89d;display:grid;place-items:center;font-weight:800;font-size:24px}" +
      "h1{margin:0;color:#101827;font-family:Georgia,serif}.muted{color:#647082}.grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:22px 0}.box{border:1px solid #e5d8b8;border-radius:14px;padding:16px;background:#fffaf0}" +
      "table{width:100%;border-collapse:collapse;margin-top:24px}th,td{text-align:left;border-bottom:1px solid #eadfca;padding:13px}th{font-size:12px;text-transform:uppercase;color:#7b6d55}.totals{margin-left:auto;max-width:360px;margin-top:20px}.row{display:flex;justify-content:space-between;border-bottom:1px solid #eadfca;padding:10px 0}.total{font-size:22px;font-weight:800;color:#8b6c31}.chip{display:inline-block;border-radius:999px;padding:7px 12px;background:#e9f8ef;color:#087044;font-weight:700}" +
      "@media print{body{background:#fff}.invoice{box-shadow:none;margin:0;max-width:none}}" +
      "</style></head><body><main class=\"invoice\">" +
      '<section class="brand"><div style="display:flex;gap:14px;align-items:center"><div class="mark">K</div><div><h1>Kemo Tourism OS</h1><div class="muted">Premium Booking Infrastructure for Tanzania Tourism</div></div></div><div><strong>Invoice</strong><br><span class="muted">' +
      escapeHTML(invoice.invoiceNumber || booking.invoiceNumber || "INV-KEMO-2026-00000") +
      "</span></div></section>" +
      '<section class="grid"><div class="box"><strong>Bill To</strong><p>' +
      escapeHTML(invoice.guestName || booking.guestName || "Guest Client") +
      "<br>" +
      escapeHTML(invoice.email || booking.email || "") +
      "<br>" +
      escapeHTML(invoice.phone || booking.phone || "") +
      '</p></div><div class="box"><strong>Booking</strong><p>Reference: ' +
      escapeHTML(invoice.reference || booking.reference || "KEMO-OS-00000") +
      "<br>Issue Date: " +
      escapeHTML(formatDate(invoice.issueDate || booking.createdAt)) +
      "<br>Due Date: " +
      escapeHTML(formatDate(invoice.dueDate)) +
      "</p></div></section>" +
      '<section class="grid"><div class="box"><strong>Experience</strong><p>' +
      escapeHTML(invoice.experienceTitle || booking.experienceTitle || "Luxury Tanzania Experience") +
      "<br>" +
      escapeHTML(invoice.destination || booking.destination || "Tanzania") +
      "<br>Travel Date: " +
      escapeHTML(formatDate(invoice.travelDate || booking.travelDate)) +
      '</p></div><div class="box"><strong>Status</strong><p><span class="chip">' +
      escapeHTML(invoice.paymentStatus || booking.paymentStatus || "Pending Payment") +
      "</span><br><br>Booking Status: " +
      escapeHTML(invoice.bookingStatus || booking.bookingStatus || "Reserved") +
      "</p></div></section>" +
      "<table><thead><tr><th>Description</th><th>Qty</th><th>Amount</th></tr></thead><tbody>" +
      lineItems
        .map(function (item) {
          return (
            "<tr><td>" +
            escapeHTML(item.description || "Tourism service") +
            "</td><td>" +
            escapeHTML(item.quantity || "1") +
            "</td><td>" +
            escapeHTML(formatMoney(item.amount || 0)) +
            "</td></tr>"
          );
        })
        .join("") +
      "</tbody></table>" +
      '<section class="totals">' +
      totalRow("Subtotal", invoice.subtotal) +
      totalRow("Service Fee", invoice.serviceFee) +
      totalRow("VAT", invoice.vat) +
      totalRow("Deposit Required", invoice.depositAmount) +
      totalRow("Amount Paid", invoice.amountPaid) +
      totalRow("Balance Due", invoice.balanceDue) +
      '<div class="row total"><span>Total</span><span>' +
      escapeHTML(formatMoney(invoice.totalAmount || booking.totalAmount || 0)) +
      "</span></div></section>" +
      '<p class="muted" style="margin-top:34px">Demo mode: no real payment charged. This invoice was generated locally by Kemo Tourism OS.</p>' +
      "</main></body></html>"
    );
  }

  function totalRow(label, value) {
    return '<div class="row"><span>' + escapeHTML(label) + "</span><strong>" + escapeHTML(formatMoney(value || 0)) + "</strong></div>";
  }

  function downloadInvoiceHTML(invoice, booking) {
    var reference = safeText((booking && booking.reference) || (invoice && invoice.reference), "KEMO-OS-00000");
    var blob = new Blob([invoiceHTML(invoice, booking)], { type: "text/html" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "invoice-" + reference + ".html";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1200);
    showToast("Invoice downloaded for " + reference, "success");
  }

  function printInvoice(invoice, booking) {
    var printWindow = window.open("", "_blank", "width=980,height=760");
    if (!printWindow) {
      showToast("Popup blocked. Please allow popups to print invoice.", "warning");
      return;
    }
    printWindow.document.open();
    printWindow.document.write(invoiceHTML(invoice, booking));
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(function () {
      printWindow.print();
    }, 300);
  }

  window.KemoUtils = {
    generateBookingReference: generateBookingReference,
    generateInvoiceNumber: generateInvoiceNumber,
    formatMoney: formatMoney,
    formatDate: formatDate,
    safeText: safeText,
    escapeHTML: escapeHTML,
    statusClass: statusClass,
    downloadInvoiceHTML: downloadInvoiceHTML,
    printInvoice: printInvoice,
    showToast: showToast,
    openModal: openModal,
    closeModal: closeModal,
    invoiceHTML: invoiceHTML,
  };
})();
