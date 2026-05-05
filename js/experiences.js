(function () {
  "use strict";

  function render() {
    var grid = document.getElementById("experienceGrid");
    if (!grid || !window.KemoData) return;
    var items = filteredExperiences();
    if (!items.length) {
      grid.innerHTML = '<div class="empty-state"><h3>No matching luxury experiences</h3><p class="muted">Adjust the filters to reveal more Tanzania journeys.</p></div>';
      return;
    }
    grid.innerHTML = items
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

  function filteredExperiences() {
    var filters = {};
    document.querySelectorAll("[data-filter]").forEach(function (field) {
      filters[field.getAttribute("data-filter")] = field.value || "";
    });
    var query = String(filters.search || "").toLowerCase().trim();
    var items = window.KemoData.experiences.filter(function (experience) {
      var days = Number.parseInt(experience.duration, 10) || 0;
      var matchesQuery = !query || [experience.title, experience.destination, experience.category, experience.level].join(" ").toLowerCase().indexOf(query) >= 0;
      var matchesPrice =
        !filters.price ||
        filters.price === "All" ||
        (filters.price === "Under $1,500" && experience.price < 1500) ||
        (filters.price === "$1,500 - $2,500" && experience.price >= 1500 && experience.price <= 2500) ||
        (filters.price === "$2,500+" && experience.price > 2500);
      var matchesDuration =
        !filters.duration ||
        filters.duration === "All" ||
        (filters.duration === "1-3 Days" && days <= 3) ||
        (filters.duration === "4-6 Days" && days >= 4 && days <= 6) ||
        (filters.duration === "7+ Days" && days >= 7);
      return (
        matchesQuery &&
        (!filters.destination || filters.destination === "All" || filters.destination === experience.destination) &&
        (!filters.category || filters.category === "All" || filters.category === experience.category) &&
        (!filters.level || filters.level === "All" || filters.level === experience.level) &&
        (!filters.availability || filters.availability === "All" || filters.availability === experience.availability) &&
        matchesPrice &&
        matchesDuration
      );
    });
    if (filters.sort === "Highest Rated") items.sort(function (a, b) { return Number(b.rating) - Number(a.rating); });
    if (filters.sort === "Price Low") items.sort(function (a, b) { return a.price - b.price; });
    if (filters.sort === "Price High") items.sort(function (a, b) { return b.price - a.price; });
    return items;
  }

  document.addEventListener("DOMContentLoaded", function () {
    render();
    document.querySelectorAll("[data-filter]").forEach(function (field) {
      field.addEventListener("input", render);
      field.addEventListener("change", render);
    });
  });
})();
