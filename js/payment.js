(function () {
  "use strict";

  var state = {
    reference: "",
    booking: null,
    invoice: null,
    method: "M-Pesa",
    processing: false,
  };

  var methods = ["M-Pesa", "Airtel Money", "Tigo Pesa", "HaloPesa", "Visa / Mastercard", "Bank Transfer", "Pay on Arrival"];

  function init() {
    state.reference = window.KemoApp.getParam("ref") || "";
    loadRecords();
    render();
  }

  function loadRecords() {
    state.booking = window.KemoStorage.getBookingByReference(state.reference);
    state.invoice = window.KemoStorage.getInvoiceByReference(state.reference);
  }

  function render() {
    var root = document.getElementById("paymentRoot");
    if (!root) return;
    if (!state.booking) {
      root.innerHTML =
        '<section class="section compact"><article class="glass-card"><p class="card-kicker">Payment Simulation</p><h3>Booking not found</h3><p class="muted">Create a booking first, then return here with a valid booking reference.</p><a class="btn primary" href="experiences.html">Browse Experiences</a></article></section>';
      return;
    }

    root.innerHTML =
      '<section class="booking-layout payment-layout">' +
      '<div class="content-stack">' +
      '<article class="glass-card"><p class="card-kicker">Payment Method</p><h3>Select a simulated payment rail</h3><div class="payment-grid method-grid">' +
      methods.map(methodCard).join("") +
      "</div></article>" +
      '<article class="glass-card"><div id="paymentFormRoot">' +
      renderPaymentForm() +
      "</div></article>" +
      '<div id="processingRoot">' +
      renderSuccessCard() +
      "</div>" +
      "</div>" +
      '<aside class="content-stack">' +
      '<article class="glass-card summary-card payment-summary"><p class="card-kicker">Booking Summary</p>' +
      renderBookingSummary() +
      "</article>" +
      '<article class="glass-card"><p class="card-kicker">Invoice Preview</p><div id="invoicePreview">' +
      renderInvoicePreview() +
      "</div></article>" +
      "</aside></section>";
    bind();
    window.KemoApp.bindInvoiceActions(root);
  }

  function methodCard(method) {
    var selected = method === state.method ? "selected" : "";
    return (
      '<button class="payment-card ' +
      selected +
      '" type="button" data-method="' +
      method +
      '"><strong>' +
      method +
      '</strong><span class="muted">' +
      methodDescription(method) +
      "</span></button>"
    );
  }

  function methodDescription(method) {
    var copy = {
      "M-Pesa": "Mobile money STK-style demo confirmation.",
      "Airtel Money": "Airtel Money simulated payment rail.",
      "Tigo Pesa": "Tigo Pesa transaction simulation.",
      HaloPesa: "HaloPesa wallet payment simulation.",
      "Visa / Mastercard": "Card authorization with demo number.",
      "Bank Transfer": "Mark transfer as pending with invoice reference.",
      "Pay on Arrival": "Reserve now and collect at operator arrival.",
    };
    return copy[method] || "Simulated payment method.";
  }

  function renderPaymentForm() {
    if (state.method === "Visa / Mastercard") return renderCardForm();
    if (state.method === "Bank Transfer") return renderBankTransfer();
    if (state.method === "Pay on Arrival") return renderPayOnArrival();
    return renderMobileMoney();
  }

  function renderMobileMoney() {
    return (
      '<p class="card-kicker">Mobile Money Form</p><h3>Simulate Mobile Money Payment</h3>' +
      '<div class="form-grid">' +
      '<label class="form-field"><span>Provider</span><select id="mobileProvider">' +
      ["M-Pesa", "Airtel Money", "Tigo Pesa", "HaloPesa"]
        .map(function (provider) {
          return '<option value="' + provider + '" ' + (provider === state.method ? "selected" : "") + ">" + provider + "</option>";
        })
        .join("") +
      '</select></label><label class="form-field"><span>Phone Number</span><input id="mobilePhone" type="tel" value="' +
      window.KemoUtils.escapeHTML(state.booking.phone || "+255 742 800 119") +
      '" /></label><label class="form-field full"><span>Amount</span><input id="mobileAmount" type="number" value="' +
      Math.round(state.booking.balanceDue || state.booking.totalAmount || 0) +
      '" min="0" /></label></div>' +
      '<div class="button-row" style="margin-top:18px"><button class="btn primary" type="button" data-simulate-mobile>Simulate Mobile Money Payment</button></div>'
    );
  }

  function renderCardForm() {
    return (
      '<p class="card-kicker">Card Payment Form</p><h3>Simulate Card Payment</h3><p class="muted">Demo card: 4242 4242 4242 4242</p>' +
      '<div class="form-grid">' +
      '<label class="form-field full"><span>Cardholder Name</span><input id="cardName" type="text" value="' +
      window.KemoUtils.escapeHTML(state.booking.guestName || "Guest Client") +
      '" /></label>' +
      '<label class="form-field full"><span>Card Number</span><input id="cardNumber" type="text" inputmode="numeric" value="4242 4242 4242 4242" /></label>' +
      '<label class="form-field"><span>Expiry Date</span><input id="cardExpiry" type="text" value="12/30" /></label>' +
      '<label class="form-field"><span>CVV</span><input id="cardCvv" type="password" value="123" /></label>' +
      '</div><div class="button-row" style="margin-top:18px"><button class="btn primary" type="button" data-simulate-card>Simulate Card Payment</button></div>'
    );
  }

  function renderBankTransfer() {
    return (
      '<p class="card-kicker">Bank Transfer</p><h3>Transfer instructions</h3>' +
      '<div class="mini-panel"><p><strong>Bank:</strong> CRDB Bank<br><strong>Account Name:</strong> Kemo Tourism OS Demo<br><strong>Account Number:</strong> 015-XXXX-XXXX<br><strong>Reference:</strong> ' +
      window.KemoUtils.escapeHTML(state.booking.reference) +
      '</p></div><div class="button-row" style="margin-top:18px"><button class="btn primary" type="button" data-bank-pending>Mark Bank Transfer Pending</button></div>'
    );
  }

  function renderPayOnArrival() {
    return (
      '<p class="card-kicker">Pay on Arrival</p><h3>Confirm reserved booking</h3><p class="muted">The journey remains reserved and the full balance stays due until arrival collection.</p>' +
      '<div class="button-row"><button class="btn primary" type="button" data-pay-arrival>Confirm Pay on Arrival</button></div>'
    );
  }

  function renderBookingSummary() {
    var booking = state.booking || {};
    return (
      "<h3>" +
      window.KemoUtils.escapeHTML(booking.experienceTitle || "Luxury Tanzania Experience") +
      "</h3><p class=\"muted\">" +
      window.KemoUtils.escapeHTML(booking.destination || "Tanzania") +
      " - " +
      window.KemoUtils.formatDate(booking.travelDate) +
      "</p>" +
      '<div class="summary-line"><span>Reference</span><strong>' +
      window.KemoUtils.escapeHTML(booking.reference || "KEMO-OS-00000") +
      "</strong></div>" +
      '<div class="summary-line"><span>Invoice</span><strong>' +
      window.KemoUtils.escapeHTML(booking.invoiceNumber || "INV-KEMO-2026-00000") +
      "</strong></div>" +
      '<div class="summary-line"><span>Total</span><strong>' +
      window.KemoUtils.formatMoney(booking.totalAmount || 0) +
      "</strong></div>" +
      '<div class="summary-line"><span>Amount Paid</span><strong>' +
      window.KemoUtils.formatMoney(booking.amountPaid || 0) +
      "</strong></div>" +
      '<div class="summary-line"><span>Balance Due</span><strong>' +
      window.KemoUtils.formatMoney(booking.balanceDue || 0) +
      "</strong></div>" +
      '<div class="summary-line"><span>Payment</span>' +
      window.KemoApp.paymentChip(booking.paymentStatus || "Pending Payment") +
      "</div>" +
      '<div class="summary-line"><span>Booking</span>' +
      window.KemoApp.statusChip(booking.bookingStatus || "Reserved") +
      "</div>"
    );
  }

  function renderInvoicePreview() {
    var invoice = state.invoice || {};
    var booking = state.booking || {};
    var items = Array.isArray(invoice.lineItems) ? invoice.lineItems : [];
    return (
      '<div class="reference-box"><span>Invoice</span><strong>' +
      window.KemoUtils.escapeHTML(invoice.invoiceNumber || booking.invoiceNumber || "INV-KEMO-2026-00000") +
      "</strong></div>" +
      '<div class="summary-line"><span>Issue Date</span><strong>' +
      window.KemoUtils.formatDate(invoice.issueDate) +
      "</strong></div>" +
      '<div class="summary-line"><span>Due Date</span><strong>' +
      window.KemoUtils.formatDate(invoice.dueDate) +
      "</strong></div>" +
      items
        .map(function (item) {
          return '<div class="summary-line"><span>' + window.KemoUtils.escapeHTML(item.description || "Tourism service") + "</span><strong>" + window.KemoUtils.formatMoney(item.amount || 0) + "</strong></div>";
        })
        .join("") +
      '<div class="summary-line total"><span>Total</span><strong>' +
      window.KemoUtils.formatMoney(invoice.totalAmount || booking.totalAmount || 0) +
      '</strong></div><div class="button-row" style="margin-top:18px"><button class="btn secondary" type="button" data-download-invoice="' +
      window.KemoUtils.escapeHTML(booking.reference || "") +
      '">Download Invoice</button><button class="btn secondary" type="button" data-print-invoice="' +
      window.KemoUtils.escapeHTML(booking.reference || "") +
      '">Print Invoice</button><a class="btn primary" href="guest-portal.html">View Guest Portal</a><a class="btn ghost" href="admin.html">Open Admin Command Center</a></div>'
    );
  }

  function renderSuccessCard() {
    if (!state.booking || state.booking.paymentStatus !== "Paid") return "";
    return (
      '<article class="confirmation-card"><span class="status-chip confirmed" style="width:max-content">Payment successful</span><div><h3>Reservation Confirmed</h3><p class="muted">' +
      window.KemoUtils.escapeHTML(state.booking.reference) +
      " is now confirmed and visible in the guest portal, operator portal, and admin command center.</p></div></article>"
    );
  }

  function bind() {
    document.querySelectorAll("[data-method]").forEach(function (button) {
      button.addEventListener("click", function () {
        state.method = button.getAttribute("data-method");
        render();
      });
    });

    var provider = document.getElementById("mobileProvider");
    if (provider) {
      provider.addEventListener("change", function () {
        state.method = provider.value;
        render();
      });
    }

    bindButton("[data-simulate-mobile]", function () {
      var providerField = document.getElementById("mobileProvider");
      var provider = providerField ? providerField.value : state.method;
      simulatePaidPayment(provider);
    });
    bindButton("[data-simulate-card]", function () {
      simulatePaidPayment("Visa / Mastercard");
    });
    bindButton("[data-bank-pending]", function () {
      updatePayment("Bank Transfer", "Bank Transfer Pending", "Reserved", 0, state.booking.totalAmount || 0);
      window.KemoUtils.showToast("Bank transfer marked pending for " + state.booking.reference, "success");
      render();
    });
    bindButton("[data-pay-arrival]", function () {
      updatePayment("Pay on Arrival", "Pay on Arrival", "Reserved", 0, state.booking.totalAmount || 0);
      window.KemoUtils.showToast("Pay on arrival confirmed for " + state.booking.reference, "success");
      render();
    });
  }

  function bindButton(selector, handler) {
    var button = document.querySelector(selector);
    if (button) button.addEventListener("click", handler);
  }

  function simulatePaidPayment(method) {
    if (state.processing) return;
    state.processing = true;
    var root = document.getElementById("processingRoot");
    var steps = ["Processing payment...", "Verifying transaction...", "Confirming reservation...", "Payment successful"];
    if (root) {
      root.innerHTML =
        '<article class="glass-card"><p class="card-kicker">Payment Timeline</p><div class="process-list">' +
        steps
          .map(function (step, index) {
            return '<div class="process-step" data-process-step="' + index + '"><span class="timeline-dot"></span><strong>' + step + "</strong></div>";
          })
          .join("") +
        "</div></article>";
    }

    steps.forEach(function (_step, index) {
      window.setTimeout(function () {
        var node = document.querySelector('[data-process-step="' + index + '"]');
        if (node) node.classList.add("active");
        if (index === steps.length - 1) {
          updatePayment(method, "Paid", "Confirmed", state.booking.totalAmount || 0, 0);
          state.processing = false;
          window.KemoUtils.showToast("Payment successful. Booking confirmed.", "success");
          render();
        }
      }, 700 * (index + 1));
    });
  }

  function updatePayment(method, paymentStatus, bookingStatus, amountPaid, balanceDue) {
    var ref = state.booking.reference;
    var updates = {
      paymentMethod: method,
      paymentStatus: paymentStatus,
      bookingStatus: bookingStatus,
      amountPaid: Math.round(Number(amountPaid || 0)),
      balanceDue: Math.round(Number(balanceDue || 0)),
    };
    window.KemoStorage.updateBooking(ref, updates);
    window.KemoStorage.updateInvoice(ref, updates);
    loadRecords();
    window.KemoApp.renderLiveStats();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
