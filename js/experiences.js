(function () {
  "use strict";

  function render() {
    var grid = document.getElementById("experienceGrid");
    if (!grid || !window.KemoData) return;
    grid.innerHTML = window.KemoData.experiences
      .map(function (experience) {
        return (
          '<article class="experience-card">' +
          '<div class="experience-media"><img src="' +
          experience.image +
          '" alt="' +
          window.KemoUtils.escapeHTML(experience.title) +
          '" loading="lazy" />' +
          '<a class="wishlist" href="experience-details.html?id=' +
          experience.id +
          '" aria-label="View ' +
          window.KemoUtils.escapeHTML(experience.title) +
          '">&#9825;</a>' +
          '<div class="media-badges">' +
          experience.badges
            .map(function (badge) {
              return '<span class="pill">' + window.KemoUtils.escapeHTML(badge) + "</span>";
            })
            .join("") +
          "</div></div>" +
          '<div class="experience-body">' +
          '<div class="experience-meta"><span class="pill">' +
          window.KemoUtils.escapeHTML(experience.destination) +
          '</span><span class="pill">' +
          window.KemoUtils.escapeHTML(experience.duration) +
          '</span><span class="level-badge">' +
          window.KemoUtils.escapeHTML(experience.level) +
          "</span></div>" +
          "<h3>" +
          window.KemoUtils.escapeHTML(experience.title) +
          "</h3><p class=\"muted\">" +
          window.KemoUtils.escapeHTML(experience.overview) +
          "</p>" +
          '<div class="rating-row"><span class="rating">' +
          experience.rating +
          " / 5 - " +
          experience.reviews +
          ' reviews</span><span class="availability ' +
          (experience.availability.indexOf("Limited") >= 0 ? "limited" : "open") +
          '">' +
          experience.availability +
          "</span></div>" +
          '<div class="split-row"><div class="price">' +
          window.KemoUtils.formatMoney(experience.price) +
          " <small>/ guest</small></div>" +
          '<div class="button-row"><a class="btn primary small" href="booking.html?id=' +
          experience.id +
          '">Reserve Now</a><a class="btn ghost small" href="experience-details.html?id=' +
          experience.id +
          '">View Experience</a></div></div>' +
          "</div></article>"
        );
      })
      .join("");
  }

  document.addEventListener("DOMContentLoaded", render);
})();
