(function () {
  "use strict";

  var state = {
    experience: null,
  };

  var accommodationFees = {
    "Luxury Lodge": 0,
    "Presidential Suite": 1200,
    "Boutique Villa": 780,
    "Premium Tented Camp": 420,
  };

  var transportFees = {
    "Private 4x4": 0,
    "Executive SUV": 320,
    "Charter Flight + 4x4": 1850,
    "Luxury Van": 180,
  };

  function init() {
    var root = document.getElementById("bookingRoot");
    if (!root || !window.KemoData) return;
    state.experience = window.KemoData.getExperienceById(window.KemoApp.getParam("id"));
    root.innerHTML = renderBooking();
    bind();
    updateSummary();
  }

  function renderBooking() {
    return (
      '<section class="booking-layout">' +
      '<div><article class="glass-card"><p class="card-kicker">Luxury Reservation Flow</p><h3>Configure your premium Tanzania journey</h3>' +
      '<div class="flow-stepper" aria-label="Booking progress">' +
      '<div class="step-button active"><small>01</small><strong>Experience</strong><span>Select journey</span></div>' +
      '<div class="step-button active"><small>02</small><strong>Journey Setup</strong><span>Dates and guests</span></div>' +
      '<div class="step-button active"><small>03</small><strong>Guest Profile</strong><span>Traveler details</span></div>' +
      '<div class="step-button active"><small>04</small><strong>Confirmation</strong><span>Continue to payment</span></div>' +
      "</div>" +
      '<form id="bookingForm" class="booking-form" autocomplete="on">' +
      '<div class="form-grid">' +
      selectField("experienceId", "Experience", window.KemoData.experiences, state.experience.id) +
      field("travelDate", "Travel Date", "date", defaultTravelDate()) +
      field("adults", "Adults", "number", "2", "min='1' max='12'") +
      field("children", "Children", "number", "0", "min='0' max='8'") +
      selectOptions("accommodationClass", "Accommodation Class", Object.keys(accommodationFees), "Luxury Lodge") +
      selectOptions("transportClass", "Transport Class", Object.keys(transportFees), "Private 4x4") +
      selectOptions("privateGuide", "Private Guide", ["Yes", "No"], "Yes") +
      selectOptions("airportPickup", "Airport Pickup", ["Yes", "No"], "Yes") +
      field("guestName", "Full Name", "text", "Amina Hassan", "required") +
      field("email", "Email", "email", "amina.hassan@example.com", "required") +
      field("phone", "Phone", "tel", "+255 742 800 119") +
      field("nationality", "Nationality", "text", "Tanzanian") +
      '<label class="form-field full"><span>Special Request</span><textarea name="specialRequest">Prefer a quiet lodge suite, vegetarian dining, and a photography-focused guide.</textarea></label>' +
      '<label class="form-field full"><span>Travel Notes</span><textarea name="travelNotes">Arrival support, dietary preferences, and operator notes are captured here for the guest portal and admin command center.</textarea></label>' +
      "</div>" +
      '<div id="referenceAnimation" class="reference-generator" hidden><span class="pulse-dot"></span><strong>Generating secure booking reference...</strong><em>KEMO-OS-XXXXX</em></div>' +
      '<div class="button-row" style="margin-top:22px"><button class="btn primary" type="submit">Create Booking & Continue to Payment</button><a class="btn secondary" href="experiences.html">Browse Experiences</a></div>' +
      "</form></article></div>" +
      '<aside class="glass-card summary-card"><p class="card-kicker">Live Booking Summary</p><div id="bookingSummary"></div></aside>' +
      "</section>"
    );
  }

  function field(name, label, type, value, attrs) {
    return (
      '<label class="form-field"><span>' +
      label +
      '</span><input name="' +
      name +
      '" type="' +
      type +
      '" value="' +
      window.KemoUtils.escapeHTML(value) +
      '" ' +
      (attrs || "") +
      " /></label>"
    );
  }

  function selectOptions(name, label, options, value) {
    return (
      '<label class="form-field"><span>' +
      label +
      '</span><select name="' +
      name +
      '">' +
      options
        .map(function (option) {
          return '<option value="' + window.KemoUtils.escapeHTML(option) + '" ' + (option === value ? "selected" : "") + ">" + window.KemoUtils.escapeHTML(option) + "</option>";
        })
        .join("") +
      "</select></label>"
    );
  }

  function selectField(name, label, experiences, value) {
    return (
      '<label class="form-field full"><span>' +
      label +
      '</span><select name="' +
      name +
      '">' +
      experiences
        .map(function (experience) {
          return '<option value="' + experience.id + '" ' + (experience.id === value ? "selected" : "") + ">" + window.KemoUtils.escapeHTML(experience.title) + "</option>";
        })
        .join("") +
      "</select></label>"
    );
  }

  function defaultTravelDate() {
    var date = new Date();
    date.setDate(date.getDate() + 45);
    return date.toISOString().slice(0, 10);
  }

  function bind() {
    var form = document.getElementById("bookingForm");
    if (!form) return;
    form.addEventListener("input", function () {
      syncExperience();
      updateSummary();
    });
    form.addEventListener("change", function () {
      syncExperience();
      updateSummary();
    });
    form.addEventListener("submit", handleSubmit);
  }

  function syncExperience() {
    var form = document.getElementById("bookingForm");
    if (!form) return;
    state.experience = window.KemoData.getExperienceById(form.elements.experienceId.value);
  }

  function quoteFromForm(form) {
    var experience = state.experience || window.KemoData.getExperienceById();
    var adults = Math.max(1, Number(form.elements.adults.value || 1));
    var children = Math.max(0, Number(form.elements.children.value || 0));
    var accommodationClass = form.elements.accommodationClass.value || "Luxury Lodge";
    var transportClass = form.elements.transportClass.value || "Private 4x4";
    var guestMultiplier = adults + children * 0.6;
    var basePrice = Number(experience.price || 0);
    var baseLine = basePrice * guestMultiplier;
    var accommodationFee = Number(accommodationFees[accommodationClass] || 0);
    var transportFee = Number(transportFees[transportClass] || 0);
    var subtotal = baseLine + accommodationFee + transportFee;
    var serviceFee = subtotal * 0.07;
    var vat = (subtotal + serviceFee) * 0.18;
    var totalAmount = subtotal + serviceFee + vat;
    var depositAmount = totalAmount * 0.3;

    return {
      experience: experience,
      adults: adults,
      children: children,
      accommodationClass: accommodationClass,
      transportClass: transportClass,
      basePrice: basePrice,
      baseLine: baseLine,
      accommodationFee: accommodationFee,
      transportFee: transportFee,
      subtotal: subtotal,
      serviceFee: serviceFee,
      vat: vat,
      totalAmount: totalAmount,
      depositAmount: depositAmount,
    };
  }

  function updateSummary() {
    var form = document.getElementById("bookingForm");
    var summary = document.getElementById("bookingSummary");
    if (!form || !summary) return;
    var quote = quoteFromForm(form);
    summary.innerHTML =
      "<h3>" +
      window.KemoUtils.escapeHTML(quote.experience.title) +
      '</h3><p class="muted">' +
      window.KemoUtils.escapeHTML(quote.experience.destination) +
      " - " +
      window.KemoUtils.formatDate(form.elements.travelDate.value) +
      " - " +
      quote.adults +
      " adults, " +
      quote.children +
      " children</p>" +
      line("Base journey", quote.baseLine) +
      line("Accommodation upgrade", quote.accommodationFee) +
      line("Transport upgrade", quote.transportFee) +
      line("Service fee", quote.serviceFee) +
      line("VAT", quote.vat) +
      '<div class="summary-line total"><span>Total</span><strong>' +
      window.KemoUtils.formatMoney(quote.totalAmount) +
      "</strong></div>" +
      line("Deposit required", quote.depositAmount) +
      '<div class="mini-panel" style="margin-top:16px"><strong>Next step</strong><p class="muted">A booking reference and invoice number will be generated, then payment simulation opens.</p></div>';
  }

  function line(label, value) {
    return '<div class="summary-line"><span>' + label + "</span><strong>" + window.KemoUtils.formatMoney(value) + "</strong></div>";
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    var animation = document.getElementById("referenceAnimation");
    var submit = form.querySelector("button[type='submit']");
    if (submit) submit.disabled = true;
    if (animation) animation.hidden = false;

    window.setTimeout(function () {
      var reference = window.KemoUtils.generateBookingReference();
      var invoiceNumber = window.KemoUtils.generateInvoiceNumber(reference);
      if (animation) animation.querySelector("em").textContent = reference;
      var quote = quoteFromForm(form);
      var now = new Date();
      var due = new Date(now.getTime());
      due.setDate(due.getDate() + 14);

      var booking = {
        reference: reference,
        invoiceNumber: invoiceNumber,
        guestName: window.KemoUtils.safeText(form.elements.guestName.value, "Guest Client"),
        email: window.KemoUtils.safeText(form.elements.email.value, ""),
        phone: window.KemoUtils.safeText(form.elements.phone.value, ""),
        nationality: window.KemoUtils.safeText(form.elements.nationality.value, ""),
        experienceId: quote.experience.id,
        experienceTitle: window.KemoUtils.safeText(quote.experience.title, "Luxury Tanzania Experience"),
        destination: window.KemoUtils.safeText(quote.experience.destination, "Tanzania"),
        travelDate: window.KemoUtils.safeText(form.elements.travelDate.value, ""),
        adults: quote.adults,
        children: quote.children,
        accommodationClass: quote.accommodationClass,
        transportClass: quote.transportClass,
        privateGuide: window.KemoUtils.safeText(form.elements.privateGuide.value, "Yes"),
        airportPickup: window.KemoUtils.safeText(form.elements.airportPickup.value, "Yes"),
        specialRequest: window.KemoUtils.safeText(form.elements.specialRequest.value, ""),
        travelNotes: window.KemoUtils.safeText(form.elements.travelNotes.value, ""),
        basePrice: Math.round(quote.basePrice),
        accommodationFee: Math.round(quote.accommodationFee),
        transportFee: Math.round(quote.transportFee),
        serviceFee: Math.round(quote.serviceFee),
        vat: Math.round(quote.vat),
        totalAmount: Math.round(quote.totalAmount),
        depositAmount: Math.round(quote.depositAmount),
        amountPaid: 0,
        balanceDue: Math.round(quote.totalAmount),
        paymentMethod: "",
        paymentStatus: "Pending Payment",
        bookingStatus: "Reserved",
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      var invoice = {
        invoiceNumber: invoiceNumber,
        reference: reference,
        issueDate: now.toISOString(),
        dueDate: due.toISOString(),
        guestName: booking.guestName,
        email: booking.email,
        phone: booking.phone,
        experienceTitle: booking.experienceTitle,
        destination: booking.destination,
        travelDate: booking.travelDate,
        lineItems: [
          { description: booking.experienceTitle + " - guests", quantity: String(quote.adults + quote.children), amount: Math.round(quote.baseLine) },
          { description: booking.accommodationClass, quantity: "1", amount: booking.accommodationFee },
          { description: booking.transportClass, quantity: "1", amount: booking.transportFee },
        ],
        subtotal: Math.round(quote.subtotal),
        serviceFee: booking.serviceFee,
        vat: booking.vat,
        totalAmount: booking.totalAmount,
        depositAmount: booking.depositAmount,
        amountPaid: 0,
        balanceDue: booking.totalAmount,
        paymentStatus: "Pending Payment",
        bookingStatus: "Reserved",
      };

      window.KemoStorage.saveBooking(booking);
      window.KemoStorage.saveInvoice(invoice);
      window.KemoUtils.showToast("Booking " + reference + " created. Opening payment simulation.", "success");

      window.setTimeout(function () {
        window.location.href = "payment.html?ref=" + encodeURIComponent(reference);
      }, 900);
    }, 800);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
