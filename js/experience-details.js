(function () {
  "use strict";

  function render() {
    var root = document.getElementById("detailsRoot");
    if (!root || !window.KemoData) return;
    var id = window.KemoApp.getParam("id");
    var experience = window.KemoData.getExperienceById(id);
    root.innerHTML =
      '<section class="details-hero">' +
      '<div class="details-title"><p class="eyebrow">Cinematic Experience Details</p><h1>' +
      window.KemoUtils.escapeHTML(experience.title) +
      '</h1><p>' +
      window.KemoUtils.escapeHTML(experience.overview) +
      '</p><div class="meta-line"><span class="pill">' +
      window.KemoUtils.escapeHTML(experience.destination) +
      '</span><span class="pill">' +
      window.KemoUtils.escapeHTML(experience.duration) +
      '</span><span class="level-badge">' +
      window.KemoUtils.escapeHTML(experience.level) +
      '</span><span class="rating">' +
      experience.rating +
      " / 5 - " +
      experience.reviews +
      ' reviews</span></div></div>' +
      '<div class="details-shell"><div class="gallery"><div class="gallery-main"><img src="' +
      experience.gallery[0] +
      '" alt="' +
      window.KemoUtils.escapeHTML(experience.title) +
      '" /></div><div class="gallery-thumb-grid"><div class="gallery-thumb"><img src="' +
      experience.gallery[1] +
      '" alt="' +
      window.KemoUtils.escapeHTML(experience.destination) +
      '" /></div><div class="gallery-thumb"><img src="' +
      experience.gallery[2] +
      '" alt="' +
      window.KemoUtils.escapeHTML(experience.destination) +
      '" /></div></div></div>' +
      reservationCard(experience) +
      "</div></section>" +
      '<section class="details-content"><div class="content-stack">' +
      '<article class="glass-card"><p class="card-kicker">Luxury Overview</p><h3>Designed for private premium travel operations</h3><p class="muted">' +
      window.KemoUtils.escapeHTML(experience.overview) +
      "</p></article>" +
      '<article class="glass-card"><p class="card-kicker">Experience Highlights</p><div class="highlight-grid">' +
      ["Private guide orchestration", "Premium accommodation logic", "Guest portal and invoice ready"]
        .map(function (item) {
          return '<div class="mini-panel"><strong>' + item + '</strong><p class="muted">Included in the simulated booking lifecycle.</p></div>';
        })
        .join("") +
      "</div></article>" +
      '<article class="glass-card"><p class="card-kicker">Day-by-day itinerary</p><div class="itinerary">' +
      itinerary(experience)
        .map(function (item, index) {
          return '<div class="itinerary-item"><div class="day-badge">' + String(index + 1).padStart(2, "0") + '</div><div><strong>Day ' + (index + 1) + '</strong><p class="muted">' + window.KemoUtils.escapeHTML(item) + "</p></div></div>";
        })
        .join("") +
      "</div></article>" +
      '<article class="glass-card"><p class="card-kicker">Accommodation and transport class</p><div class="highlight-grid">' +
      '<div class="mini-panel"><strong>Accommodation class</strong><p class="muted">Luxury lodge, presidential suite, boutique villa, or premium tented camp based on journey type.</p></div>' +
      '<div class="mini-panel"><strong>Transport class</strong><p class="muted">Private 4x4, executive SUV, charter flight pairing, or luxury van routing.</p></div>' +
      '<div class="mini-panel"><strong>Operations class</strong><p class="muted">Booking, invoice, payment, guest, operator, and admin status stay linked through localStorage.</p></div>' +
      "</div></article>" +
      '<article class="glass-card"><p class="card-kicker">Private guide profile</p><div class="guide-card"><div class="guide-photo">MK</div><div><h3>Musa Kileo</h3><p class="muted">Senior Tanzania guide with 14 years across northern safari circuits, coastal extensions, VIP transfers, and photography-led private guiding.</p><div class="experience-meta"><span class="pill">Wildlife tracking</span><span class="pill">VIP protocol</span><span class="pill">Swahili and English</span></div></div></div></article>' +
      '<article class="glass-card"><p class="card-kicker">Included Services</p><ul class="service-list">' +
      ["Luxury lodge", "Airport pickup", "Private guide", "Park fees", "Concierge support", "Travel documents"]
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("") +
      "</ul></article>" +
      '<article class="glass-card"><p class="card-kicker">Excluded Services</p><ul class="service-list">' +
      ["International flights", "Visa fees", "Travel insurance", "Premium alcohol", "Personal purchases", "Optional upgrades"]
        .map(function (item) {
          return "<li>" + item + "</li>";
        })
        .join("") +
      "</ul></article>" +
      '<article class="glass-card"><p class="card-kicker">Guest Reviews</p><div class="highlight-grid">' +
      reviews()
        .map(function (review) {
          return '<div class="mini-panel"><strong>' + review[0] + '</strong><p class="muted">' + review[1] + "</p></div>";
        })
        .join("") +
      "</div></article></div>" +
      '<aside class="content-stack"><article class="glass-card"><p class="card-kicker">Availability Calendar</p>' +
      calendar() +
      "</article>" +
      reservationCard(experience) +
      "</aside></section>";
  }

  function itinerary(experience) {
    var days = Number.parseInt(experience.duration, 10) || 4;
    var templates = [
      "VIP arrival, private transfer, concierge briefing, and sunset welcome.",
      "Full-day guided experience with premium dining and operator updates.",
      "Signature destination route, lodge recovery block, and guest portal document check.",
      "Private guide-led extension with flexible photography, culture, or beach programming.",
      "Final experience block, invoice review, and onward travel coordination.",
      "Departure transfer with admin, operator, and guest status fully synchronized.",
    ];
    var output = [];
    for (var i = 0; i < Math.min(days, 6); i += 1) output.push(templates[i] || templates[templates.length - 1]);
    return output;
  }

  function reviews() {
    return [
      ["Amina Hassan", "The whole flow felt like a private concierge desk with real operating discipline."],
      ["David Wilson", "The invoice, payment status, and portal handoff made the journey feel professionally run."],
      ["Neema Joseph", "Premium visuals, clear itinerary, and confident admin controls for every step."],
    ];
  }

  function reservationCard(experience) {
    return (
      '<aside class="reservation-card"><p class="card-kicker">Sticky Reservation</p><h3>From</h3><div class="reservation-price">' +
      window.KemoUtils.formatMoney(experience.price) +
      ' <small>/ guest</small></div><p class="muted">' +
      window.KemoUtils.escapeHTML(experience.duration) +
      " - Private Safari - " +
      window.KemoUtils.escapeHTML(experience.availability) +
      '</p><div class="service-list" style="margin:18px 0">' +
      ["Luxury lodge", "Airport pickup", "Private guide", "Park fees"]
        .map(function (item) {
          return '<div class="mini-panel"><strong>' + item + "</strong></div>";
        })
        .join("") +
      '</div><div class="button-row"><a class="btn primary" href="booking.html?id=' +
      experience.id +
      '">Reserve Experience</a><button class="btn secondary" type="button" data-quote>Request Custom Quote</button></div><p class="muted" style="margin:16px 0 0">Demo mode: no real payment charged.</p></aside>'
    );
  }

  function calendar() {
    var html = '<div class="calendar-grid">';
    for (var i = 1; i <= 28; i += 1) {
      var cls = [6, 11, 18, 24].indexOf(i) >= 0 ? "hot" : [3, 9, 14, 21, 27].indexOf(i) >= 0 ? "open" : "";
      html += '<div class="date-cell ' + cls + '">' + i + "</div>";
    }
    return html + "</div>";
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.body.addEventListener("click", function (event) {
      if (event.target && event.target.hasAttribute("data-quote")) {
        window.KemoUtils.showToast("Custom quote request staged for operator review.", "success");
      }
    });
  });
})();
