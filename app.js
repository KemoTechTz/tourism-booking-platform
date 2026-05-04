const pages = [
  { id: "overview", label: "Overview" },
  { id: "experiences", label: "Luxury Experiences" },
  { id: "details", label: "Experience Details" },
  { id: "booking", label: "Booking Engine" },
  { id: "guest", label: "Guest Portal" },
  { id: "operator", label: "Operator Portal" },
  { id: "admin", label: "Admin Command Center" },
];

const image = (id, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=82`;

const experiences = [
  {
    id: "serengeti",
    title: "Serengeti Private Migration Safari",
    destination: "Serengeti",
    category: "Safari",
    level: "Ultra Luxury",
    duration: "6 Days",
    rating: "4.98",
    reviews: 286,
    price: 2800,
    availability: "Limited Availability",
    image: image("photo-1516426122078-c23e76319801"),
    gallery: [
      image("photo-1516426122078-c23e76319801"),
      image("photo-1523805009345-7448845a9e53"),
      image("photo-1547471080-7cc2caa01a7e"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A polished private safari designed for guests who want migration access, private guiding, elegant lodge service, and a concierge-level operations flow from arrival to departure.",
    highlights: [
      "Private game drives across prime migration corridors",
      "Luxury lodge suites with sundowner hosting",
      "Dedicated guide, airport pickup, park logistics, and dining coordination",
    ],
    itinerary: [
      "VIP arrival, airstrip transfer, champagne briefing, and sunset drive.",
      "Full-day migration tracking with private picnic service and lodge dining.",
      "Predator territory drive, optional hot-air balloon setup, and spa recovery.",
      "Remote kopje route, photographic hides, and private bush dinner.",
      "Flexible conservation visit, final game drive, and concierge checkout.",
      "Airstrip departure with onward Zanzibar or Arusha connection support.",
    ],
  },
  {
    id: "zanzibar",
    title: "Zanzibar Presidential Beach Escape",
    destination: "Zanzibar",
    category: "Beach",
    level: "Presidential",
    duration: "5 Days",
    rating: "4.96",
    reviews: 194,
    price: 2400,
    availability: "Open",
    image: image("photo-1519046904884-53103b34b206"),
    gallery: [
      image("photo-1519046904884-53103b34b206"),
      image("photo-1507525428034-b723cf961d3e"),
      image("photo-1526772662000-3f88f10405ff"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A presidential-grade beach retreat with private transfers, chef-led dining, spice route options, and curated Indian Ocean leisure for premium leisure guests.",
    highlights: [
      "Oceanfront suite with private dining setup",
      "Curated Stone Town and spice route extension",
      "Concierge itinerary control and airport pickup",
    ],
    itinerary: [
      "VIP airport reception, beach resort arrival, and sunset dinner.",
      "Private lagoon day with chef lunch and wellness session.",
      "Stone Town heritage route with curated spice tasting.",
      "Leisure day with optional yacht, diving, or spa programming.",
      "Late checkout, airport transfer, and guest portal handoff.",
    ],
  },
  {
    id: "kilimanjaro",
    title: "Kilimanjaro Elite Trekking Expedition",
    destination: "Kilimanjaro",
    category: "Trekking",
    level: "Elite",
    duration: "8 Days",
    rating: "4.94",
    reviews: 151,
    price: 3200,
    availability: "Limited Availability",
    image: image("photo-1551632811-561732d1e306"),
    gallery: [
      image("photo-1551632811-561732d1e306"),
      image("photo-1500530855697-b586d89ba3ee"),
      image("photo-1605640840605-14ac1855827b"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "An elite summit experience with specialist mountain crew, premium logistics, acclimatization planning, medical checks, and post-trek recovery coordination.",
    highlights: [
      "Specialist summit team and premium camp logistics",
      "Private airport pickup and Arusha recovery night",
      "Daily guest status updates for operators and admin",
    ],
    itinerary: [
      "Arrival, gear audit, briefing, and lodge acclimatization.",
      "Trailhead transfer and first forest-zone ascent.",
      "Moorland approach with private crew service.",
      "Acclimatization rotation and medical checkpoint.",
      "Alpine desert crossing with summit preparation.",
      "Summit push and controlled descent.",
      "Exit route, celebration dinner, and recovery lodge.",
      "Departure transfer or safari extension.",
    ],
  },
  {
    id: "ngorongoro",
    title: "Ngorongoro Crater Signature Tour",
    destination: "Ngorongoro",
    category: "Safari",
    level: "Signature",
    duration: "3 Days",
    rating: "4.97",
    reviews: 221,
    price: 1850,
    availability: "Open",
    image: image("photo-1547471080-7cc2caa01a7e"),
    gallery: [
      image("photo-1547471080-7cc2caa01a7e"),
      image("photo-1516026672322-bc52d61a55d5"),
      image("photo-1523805009345-7448845a9e53"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A concise luxury crater itinerary for guests who need impeccable logistics, dramatic wildlife access, and premium accommodation without an extended safari window.",
    highlights: [
      "Private crater descent and early access planning",
      "Highland lodge stay with curated dining",
      "Smooth transfer routing from Arusha or Serengeti",
    ],
    itinerary: [
      "Arusha pickup, highland transfer, and lodge arrival.",
      "Private crater descent, picnic service, and rim sundowner.",
      "Coffee estate stop and onward transfer.",
    ],
  },
  {
    id: "mafia",
    title: "Mafia Island Private Diving Escape",
    destination: "Mafia Island",
    category: "Marine",
    level: "Ultra Luxury",
    duration: "4 Days",
    rating: "4.91",
    reviews: 88,
    price: 2100,
    availability: "Limited Availability",
    image: image("photo-1507525428034-b723cf961d3e"),
    gallery: [
      image("photo-1507525428034-b723cf961d3e"),
      image("photo-1519046904884-53103b34b206"),
      image("photo-1530789253388-582c481c54b0"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A marine-focused private escape with diving coordination, island transfers, boutique accommodation, and flexible low-density ocean programming.",
    highlights: [
      "Private dive master coordination",
      "Island transfer and resort operations flow",
      "Optional whale shark season routing",
    ],
    itinerary: [
      "Arrival, island transfer, and dive readiness briefing.",
      "Private reef diving and waterfront dinner.",
      "Marine park day with flexible snorkeling or diving.",
      "Departure transfer with optional Zanzibar extension.",
    ],
  },
  {
    id: "tarangire",
    title: "Tarangire Elephant Migration Safari",
    destination: "Tarangire",
    category: "Safari",
    level: "Premium",
    duration: "4 Days",
    rating: "4.9",
    reviews: 132,
    price: 1750,
    availability: "Open",
    image: image("photo-1523805009345-7448845a9e53"),
    gallery: [
      image("photo-1523805009345-7448845a9e53"),
      image("photo-1516426122078-c23e76319801"),
      image("photo-1547471080-7cc2caa01a7e"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A premium wildlife itinerary built around elephant movement, baobab landscapes, reliable vehicle routing, and operator-ready booking controls.",
    highlights: [
      "Elephant corridor game drives",
      "Premium tented lodge accommodation",
      "Private vehicle and guide assignment",
    ],
    itinerary: [
      "Arrival transfer and evening drive.",
      "Full-day elephant corridor routing.",
      "Baobab landscape route and lodge leisure.",
      "Morning drive and Arusha return.",
    ],
  },
  {
    id: "nyerere",
    title: "Nyerere Luxury Wildlife Retreat",
    destination: "Nyerere",
    category: "Safari",
    level: "Signature",
    duration: "5 Days",
    rating: "4.93",
    reviews: 109,
    price: 2650,
    availability: "Open",
    image: image("photo-1516026672322-bc52d61a55d5"),
    gallery: [
      image("photo-1516026672322-bc52d61a55d5"),
      image("photo-1516426122078-c23e76319801"),
      image("photo-1523805009345-7448845a9e53"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A southern Tanzania retreat for high-end guests who want water-based safari, low crowd density, and premium service operations.",
    highlights: [
      "Boat safari and riverfront lodge routing",
      "Private guide and vehicle planning",
      "Remote luxury retreat inventory management",
    ],
    itinerary: [
      "Fly-in arrival and riverfront lodge welcome.",
      "Boat safari and private dining.",
      "Walking safari with specialist guide.",
      "Private vehicle game drive and leisure block.",
      "Departure flight and concierge follow-up.",
    ],
  },
  {
    id: "stone-town",
    title: "Stone Town Heritage & Spice Route",
    destination: "Stone Town",
    category: "Culture",
    level: "Premium",
    duration: "2 Days",
    rating: "4.89",
    reviews: 176,
    price: 780,
    availability: "Open",
    image: image("photo-1578922746465-3a80a228f223"),
    gallery: [
      image("photo-1578922746465-3a80a228f223"),
      image("photo-1519046904884-53103b34b206"),
      image("photo-1530789253388-582c481c54b0"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A premium culture route for guests who want heritage access, guided shopping, spice farm programming, and elevated urban hospitality.",
    highlights: [
      "Private heritage guide and artisan routing",
      "Spice estate tasting with premium transfers",
      "Boutique hotel and restaurant coordination",
    ],
    itinerary: [
      "Stone Town arrival, heritage route, and rooftop dinner.",
      "Spice route, artisan visits, and beach transfer option.",
    ],
  },
  {
    id: "honeymoon",
    title: "Tanzania Honeymoon Signature Journey",
    destination: "Serengeti & Zanzibar",
    category: "Honeymoon",
    level: "Presidential",
    duration: "10 Days",
    rating: "4.99",
    reviews: 244,
    price: 5400,
    availability: "Limited Availability",
    image: image("photo-1526772662000-3f88f10405ff"),
    gallery: [
      image("photo-1526772662000-3f88f10405ff"),
      image("photo-1516426122078-c23e76319801"),
      image("photo-1519046904884-53103b34b206"),
    ],
    badges: ["Private Guide", "Luxury Lodge", "Airport Transfer", "All Inclusive"],
    overview:
      "A flagship safari-to-beach journey built for high-value couples, with concierge routing, premium stays, private guiding, and elegant payment milestones.",
    highlights: [
      "Safari and beach itinerary in one booking flow",
      "Private guide, premium lodges, and oceanfront suite",
      "Deposit, invoice, and guest portal simulation",
    ],
    itinerary: [
      "VIP arrival and Arusha lodge recovery.",
      "Serengeti fly-in and sunset drive.",
      "Full-day private safari and bush dinner.",
      "Ngorongoro highlands extension.",
      "Crater descent and transition night.",
      "Zanzibar flight and beach arrival.",
      "Private lagoon day and wellness session.",
      "Stone Town and spice route option.",
      "Leisure day with yacht or diving extension.",
      "Departure transfer and concierge closing.",
    ],
  },
];

const modules = [
  ["Booking Engine", "Configure travel dates, guests, upgrades, deposits, invoices, and booking references."],
  ["Luxury Experience Inventory", "Manage premium safari, beach, trekking, culture, and honeymoon products."],
  ["Guest Portal", "Give guests one polished space for itineraries, invoices, documents, and support."],
  ["Operator Portal", "Let providers control availability, requests, guide assignments, vehicles, and payouts."],
  ["Payment Simulation", "Show mobile money, card, bank transfer, pay-on-arrival, deposit, and full payment flows."],
  ["Revenue Analytics", "Track simulated revenue, booking conversion, destination mix, and operator performance."],
  ["Admin Command Center", "Run approvals, payments, reservations, guests, operators, and system health centrally."],
  ["Destination Management", "Coordinate Tanzania destinations, partners, availability, and experience performance."],
];

const app = document.getElementById("app");
const navLinks = document.getElementById("navLinks");
const topbar = document.getElementById("topbar");
const modalRoot = document.getElementById("modalRoot");

let selectedExperienceId = "serengeti";
let currentBookingStep = 1;
let modal = null;
let filters = {
  search: "",
  destination: "All",
  category: "All",
  level: "All",
  price: "All",
  duration: "All",
  availability: "All",
  sort: "Featured",
};

let booking = {
  experience: "serengeti",
  travelDate: "2026-09-18",
  adults: 2,
  children: 0,
  accommodation: "Luxury Lodge",
  transport: "Private 4x4",
  privateGuide: "Yes",
  airportPickup: "Yes",
  fullName: "Amina Hassan",
  email: "amina.hassan@example.com",
  phone: "+255 742 800 119",
  nationality: "Tanzanian",
  notes: "Prefer a quiet lodge suite, vegetarian dining, and a photography-focused guide.",
  payment: "Deposit Payment",
};

const bookingSteps = [
  ["Experience", "Select journey"],
  ["Journey Setup", "Dates and guests"],
  ["Guest Profile", "Primary traveler"],
  ["Payment", "Simulation"],
  ["Confirmation", "Reference issued"],
];

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

const getPage = () => {
  const hash = window.location.hash.replace("#", "");
  return pages.some((page) => page.id === hash) ? hash : "overview";
};

const getExperience = (id = selectedExperienceId) =>
  experiences.find((experience) => experience.id === id) || experiences[0];

const availabilityClass = (label) =>
  label.toLowerCase().includes("limited") ? "limited" : "open";

const statusClass = (label) => {
  const normalized = label.toLowerCase();
  if (normalized.includes("confirmed") || normalized.includes("completed") || normalized.includes("healthy") || normalized.includes("paid")) {
    return "confirmed";
  }
  if (normalized.includes("cancel")) return "cancelled";
  return "pending";
};

function renderNav() {
  const active = getPage();
  navLinks.innerHTML = pages
    .filter((page) => page.id !== "details")
    .map(
      (page) =>
        `<a class="nav-link ${active === page.id ? "active" : ""}" href="#${page.id}">${page.label}</a>`,
    )
    .join("");
}

function setRoute(page) {
  window.location.hash = page;
}

function selectExperience(id, route = "details") {
  selectedExperienceId = id;
  booking.experience = id;
  currentBookingStep = route === "booking" ? 1 : currentBookingStep;
  setRoute(route);
}

function renderApp() {
  const page = getPage();
  renderNav();
  topbar.classList.remove("nav-open");
  const renderers = {
    overview: renderOverview,
    experiences: renderExperiences,
    details: renderDetails,
    booking: renderBooking,
    guest: renderGuestPortal,
    operator: renderOperatorPortal,
    admin: renderAdmin,
  };
  app.innerHTML = renderers[page]();
  renderModal();
  bindPageEvents();
}

function renderOverview() {
  return `
    <section class="page">
      <section class="hero" style="--hero-image: url('${image("photo-1516426122078-c23e76319801", 2200)}')">
        <div class="hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">Tourism OS</p>
            <h1>Premium Tanzania Tourism</h1>
            <p class="hero-subtitle">
              A digital booking platform for safari operators, hotels, travel agencies, and destination managers &mdash; built to showcase bookings, payments, guest portals, operator tools, and admin control in one premium system.
            </p>
            <div class="cta-row">
              <button class="btn primary" type="button" data-route="booking">Explore Booking  <span aria-hidden="true">&rarr;</span></button>
              <button class="btn secondary" type="button" data-route="admin">Admin Command Center</button>
            </div>
          </div>
          <div class="hero-panel" aria-label="Tourism OS previews">
            <div class="floating-card search-widget">
              <div class="card-title-row">
                <div>
                  <div class="card-kicker">Booking Search</div>
                  <strong>Luxury journey finder</strong>
                </div>
                <span class="status-chip success">Live</span>
              </div>
              <div class="field-grid" style="margin-top: 16px">
                <label class="mini-field"><span>Destination</span><div class="input-shell">Serengeti & Zanzibar</div></label>
                <label class="mini-field"><span>Travel Window</span><div class="input-shell">Sep 18 - Sep 28, 2026</div></label>
                <label class="mini-field"><span>Guests</span><div class="input-shell">2 Adults - Private guide</div></label>
                <button class="btn primary small" type="button" data-route="booking">Reserve Demo</button>
              </div>
            </div>
            <div class="floating-card revenue-preview">
              <div class="split-row">
                <div>
                  <div class="card-kicker">Revenue Dashboard</div>
                  <div class="metric gold">$56,420</div>
                </div>
                <span class="trend">+18.6%</span>
              </div>
              <div class="bar-stack" aria-hidden="true">
                <span style="height: 38%"></span>
                <span style="height: 56%"></span>
                <span style="height: 44%"></span>
                <span style="height: 71%"></span>
                <span style="height: 83%"></span>
                <span style="height: 64%"></span>
                <span style="height: 92%"></span>
              </div>
            </div>
            <div class="floating-card active-booking">
              <div class="card-kicker">Active Booking Preview</div>
              <div class="booking-person">
                <div class="avatar">AH</div>
                <div>
                  <strong>Amina Hassan</strong>
                  <p class="muted" style="margin: 2px 0 0">Serengeti Private Migration Safari</p>
                </div>
                <span class="status-chip confirmed">Confirmed</span>
              </div>
              <div class="summary-line"><span>Reference</span><strong>KEMO-OS-48392</strong></div>
              <div class="summary-line"><span>Deposit</span><strong>$2,146 paid</strong></div>
            </div>
          </div>
        </div>
      </section>
      <div class="hero-stat-strip">
        ${renderStats([
          ["124", "Active Bookings"],
          ["$56,420", "Revenue"],
          ["38", "Luxury Experiences"],
          ["12", "Destination Partners"],
        ])}
      </div>
      <section class="section">
        <div class="section-header center">
          <p class="eyebrow">Operating System</p>
          <h2>One Platform. Every Tourism Operation.</h2>
          <p>
             Interface layer for the entire Tanzania tourism lifecycle: discovery, booking, payment, guest experience, supplier operations, and command-center intelligence.
          </p>
        </div>
        <div class="module-grid">
          ${modules
            .map(
              ([title, copy], index) => `
                <article class="module-card">
                  <div class="module-icon">${String(index + 1).padStart(2, "0")}</div>
                  <h3>${title}</h3>
                  <p>${copy}</p>
                </article>
              `,
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}

function renderStats(stats) {
  return stats
    .map(
      ([value, label]) => `
        <article class="stat-card">
          <strong>${value}</strong>
          <span>${label}</span>
        </article>
      `,
    )
    .join("");
}

function renderPageHero(title, subtitle, eyebrow = "Kemo Tourism OS") {
  return `
    <section class="page-hero">
      <div class="page-title">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    </section>
  `;
}

function renderExperiences() {
  return `
    <section class="page">
      ${renderPageHero(
        "Luxury Experiences",
        "Curated premium Tanzania journeys with simulated availability, pricing, reservation logic, guest flow, and booking management.",
        "Experience Inventory",
      )}
      <section class="section compact">
        ${renderFilterBar()}
        <div class="experience-grid" id="experienceGrid">
          ${renderExperienceCards(getFilteredExperiences())}
        </div>
      </section>
    </section>
  `;
}

function renderFilterBar() {
  const destinations = ["All", ...new Set(experiences.map((experience) => experience.destination))];
  const categories = ["All", ...new Set(experiences.map((experience) => experience.category))];
  const levels = ["All", ...new Set(experiences.map((experience) => experience.level))];
  return `
    <div class="filter-bar">
      <label class="filter-field">
        <span>Search</span>
        <input id="filter-search" data-filter="search" value="${filters.search}" placeholder="Safari, beach, honeymoon..." aria-label="Search experiences" />
      </label>
      ${renderSelectFilter("destination", "Destination", destinations)}
      ${renderSelectFilter("category", "Category", categories)}
      ${renderSelectFilter("level", "Luxury Level", levels)}
      ${renderSelectFilter("price", "Price Range", ["All", "Under $1,500", "$1,500 - $2,500", "$2,500+"])}
      ${renderSelectFilter("duration", "Duration", ["All", "1-3 Days", "4-6 Days", "7+ Days"])}
      ${renderSelectFilter("availability", "Availability", ["All", "Open", "Limited Availability"])}
      ${renderSelectFilter("sort", "Sort", ["Featured", "Highest Rated", "Price Low", "Price High"])}
    </div>
  `;
}

function renderSelectFilter(key, label, options) {
  return `
    <label class="filter-field">
      <span>${label}</span>
      <select id="filter-${key}" data-filter="${key}" aria-label="${label}">
        ${options
          .map((option) => `<option value="${option}" ${filters[key] === option ? "selected" : ""}>${option}</option>`)
          .join("")}
      </select>
    </label>
  `;
}

function getFilteredExperiences() {
  const query = filters.search.trim().toLowerCase();
  let filtered = experiences.filter((experience) => {
    const matchesSearch =
      !query ||
      [experience.title, experience.destination, experience.category, experience.level]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const durationDays = Number.parseInt(experience.duration, 10);
    const durationMatch =
      filters.duration === "All" ||
      (filters.duration === "1-3 Days" && durationDays <= 3) ||
      (filters.duration === "4-6 Days" && durationDays >= 4 && durationDays <= 6) ||
      (filters.duration === "7+ Days" && durationDays >= 7);
    const priceMatch =
      filters.price === "All" ||
      (filters.price === "Under $1,500" && experience.price < 1500) ||
      (filters.price === "$1,500 - $2,500" && experience.price >= 1500 && experience.price <= 2500) ||
      (filters.price === "$2,500+" && experience.price > 2500);

    return (
      matchesSearch &&
      (filters.destination === "All" || filters.destination === experience.destination) &&
      (filters.category === "All" || filters.category === experience.category) &&
      (filters.level === "All" || filters.level === experience.level) &&
      (filters.availability === "All" || filters.availability === experience.availability) &&
      durationMatch &&
      priceMatch
    );
  });

  if (filters.sort === "Highest Rated") {
    filtered = [...filtered].sort((a, b) => Number(b.rating) - Number(a.rating));
  }
  if (filters.sort === "Price Low") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  }
  if (filters.sort === "Price High") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }
  return filtered;
}

function renderExperienceCards(items) {
  if (!items.length) {
    return `
      <div class="empty-state">
        <h3>No matching experiences</h3>
        <p class="muted">Adjust the premium filters to reveal more Tanzania journeys.</p>
      </div>
    `;
  }
  return items.map(renderExperienceCard).join("");
}

function renderExperienceCard(experience) {
  return `
    <article class="experience-card">
      <div class="experience-media">
        <img src="${experience.image}" alt="${experience.title}" loading="lazy" />
        <button class="wishlist" type="button" data-modal="wishlist" aria-label="Save ${experience.title}">&#9825;</button>
        <div class="media-badges">
          ${experience.badges.map((badge) => `<span class="pill">${badge}</span>`).join("")}
        </div>
      </div>
      <div class="experience-body">
        <div class="experience-meta">
          <span class="pill">${experience.destination}</span>
          <span class="pill">${experience.duration}</span>
          <span class="level-badge">${experience.level}</span>
        </div>
        <h3>${experience.title}</h3>
        <p class="muted">${experience.overview}</p>
        <div class="rating-row">
          <span class="rating">${experience.rating} / 5 - ${experience.reviews} reviews</span>
          <span class="availability ${availabilityClass(experience.availability)}">${experience.availability}</span>
        </div>
        <div class="split-row">
          <div class="price">${money(experience.price)} <small>/ guest</small></div>
          <div class="button-row">
            <button class="btn primary small" type="button" data-reserve="${experience.id}">Reserve Now</button>
            <button class="btn ghost small" type="button" data-details="${experience.id}">View Experience</button>
          </div>
        </div>
      </div>
    </article>
  `;
}

function renderDetails() {
  const experience = getExperience();
  return `
    <section class="page">
      <section class="details-hero">
        <div class="details-title">
          <p class="eyebrow">Cinematic Experience Details</p>
          <h1>${experience.title}</h1>
          <p>${experience.overview}</p>
          <div class="meta-line">
            <span class="pill">${experience.destination}</span>
            <span class="pill">${experience.duration}</span>
            <span class="level-badge">${experience.level}</span>
            <span class="rating">${experience.rating} / 5 - ${experience.reviews} reviews</span>
            <span class="availability ${availabilityClass(experience.availability)}">${experience.availability}</span>
          </div>
        </div>
        <div class="details-shell">
          <div class="gallery">
            <div class="gallery-main"><img src="${experience.gallery[0]}" alt="${experience.title} hero gallery" /></div>
            <div class="gallery-thumb-grid">
              <div class="gallery-thumb"><img src="${experience.gallery[1]}" alt="${experience.destination} secondary gallery" /></div>
              <div class="gallery-thumb"><img src="${experience.gallery[2]}" alt="${experience.destination} lodge gallery" /></div>
            </div>
          </div>
          ${renderReservationCard(experience)}
        </div>
      </section>
      <section class="details-content">
        <div class="content-stack">
          <article class="glass-card">
            <div class="section-header" style="margin-bottom: 14px">
              <div>
                <p class="card-kicker">Luxury Overview</p>
                <h3>Designed for private premium travel operations</h3>
              </div>
            </div>
            <p class="muted">${experience.overview}</p>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Experience Highlights</p>
            <div class="highlight-grid">
              ${experience.highlights
                .map((highlight) => `<div class="mini-panel"><strong>${highlight}</strong><span class="muted">Included in the operator-ready reservation flow.</span></div>`)
                .join("")}
            </div>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Day-by-Day Itinerary</p>
            <div class="itinerary">
              ${experience.itinerary
                .map(
                  (item, index) => `
                    <div class="itinerary-item">
                      <div class="day-badge">${String(index + 1).padStart(2, "0")}</div>
                      <div>
                        <strong>Day ${index + 1}</strong>
                        <p class="muted">${item}</p>
                      </div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Accommodation & Transport Class</p>
            <div class="highlight-grid">
              <div class="mini-panel"><strong>Accommodation</strong><p class="muted">Luxury lodge, boutique resort, or premium tented suite depending on destination.</p></div>
              <div class="mini-panel"><strong>Transport</strong><p class="muted">Private 4x4 safari vehicle, airstrip routing, and airport transfer coordination.</p></div>
              <div class="mini-panel"><strong>Operations</strong><p class="muted">Availability, guide, vehicle, invoice, and guest status synchronized across dashboards.</p></div>
            </div>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Private Guide Profile</p>
            <div class="guide-card">
              <div class="guide-photo">MK</div>
              <div>
                <h3>Musa Kileo</h3>
                <p class="muted">Senior Tanzania safari specialist, fluent in English and Swahili, with 14 years guiding private luxury groups across northern and coastal circuits.</p>
                <div class="experience-meta">
                  <span class="pill">Photography</span>
                  <span class="pill">Wildlife Tracking</span>
                  <span class="pill">VIP Protocol</span>
                </div>
              </div>
            </div>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Included Services</p>
            <ul class="service-list">
              ${["Luxury lodge", "Airport pickup", "Private guide", "Park fees", "Concierge support", "Booking documents"]
                .map((item) => `<li>${item}</li>`)
                .join("")}
            </ul>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Excluded Services</p>
            <ul class="service-list">
              ${["International flights", "Visa fees", "Premium alcohol", "Optional balloon flight", "Travel insurance", "Personal purchases"]
                .map((item) => `<li>${item}</li>`)
                .join("")}
            </ul>
          </article>
          <article class="glass-card">
            <p class="card-kicker">Guest Reviews</p>
            <div class="highlight-grid">
              ${[
                ["David Wilson", "The booking journey felt like a private concierge system, not a generic travel checkout."],
                ["Neema Joseph", "Every step from deposit to documents was beautifully organized in the guest portal."],
                ["Michael Turner", "The operator updates and guide assignment made the experience feel professionally run."],
              ]
                .map(
                  ([name, copy]) => `
                    <div class="mini-panel">
                      <strong>${name}</strong>
                      <p class="muted">${copy}</p>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
        </div>
        <aside class="content-stack">
          <article class="glass-card">
            <p class="card-kicker">Availability Calendar</p>
            ${renderCalendar()}
          </article>
          ${renderReservationCard(experience, true)}
        </aside>
      </section>
    </section>
  `;
}

function renderReservationCard(experience, compact = false) {
  return `
    <aside class="reservation-card">
      <p class="card-kicker">Sticky Reservation</p>
      <h3>From</h3>
      <div class="reservation-price">${money(experience.price)} <small>/ guest</small></div>
      <p class="muted">${experience.duration} - Private Safari - Limited Availability</p>
      <div class="service-list" style="margin: 18px 0">
        ${["Luxury lodge", "Airport pickup", "Private guide", "Park fees"]
          .map((item) => `<div class="mini-panel"><strong>${item}</strong></div>`)
          .join("")}
      </div>
      <div class="button-row">
        <button class="btn primary" type="button" data-reserve="${experience.id}">Reserve Experience</button>
        <button class="btn secondary" type="button" data-modal="quote">Request Custom Quote</button>
      </div>
      <p class="muted" style="margin: 16px 0 0">Demo mode: no real payment charged.</p>
      ${compact ? "" : `<button class="btn ghost small" type="button" data-route="experiences" style="margin-top: 14px">View All Experiences</button>`}
    </aside>
  `;
}

function renderCalendar() {
  return `
    <div class="calendar-grid">
      ${Array.from({ length: 28 }, (_, index) => {
        const day = index + 1;
        const className = [6, 11, 18, 24].includes(day) ? "hot" : [3, 9, 14, 21, 27].includes(day) ? "open" : "";
        return `<div class="date-cell ${className}">${day}</div>`;
      }).join("")}
    </div>
  `;
}

function renderBooking() {
  return `
    <section class="page">
      ${renderPageHero(
        "Premium Booking Engine",
        "Configure a luxury Tanzania journey, simulate payment, generate a booking reference, and push the reservation into guest and admin dashboards.",
        "Booking Simulation",
      )}
      <section class="booking-layout">
        <div>
          <div class="stepper">
            ${bookingSteps
              .map(
                ([title, subtitle], index) => `
                  <button class="step-button ${currentBookingStep === index + 1 ? "active" : ""}" type="button" data-step="${index + 1}">
                    <small>${String(index + 1).padStart(2, "0")}</small>
                    <strong>${title}</strong>
                    <span>${subtitle}</span>
                  </button>
                `,
              )
              .join("")}
          </div>
          <article class="glass-card">
            ${renderBookingStep()}
            <div class="button-row" style="margin-top: 22px">
              ${currentBookingStep > 1 ? `<button class="btn secondary" type="button" data-step="${currentBookingStep - 1}">Back</button>` : ""}
              ${
                currentBookingStep < 4
                  ? `<button class="btn primary" type="button" data-step="${currentBookingStep + 1}">Continue</button>`
                  : currentBookingStep === 4
                    ? `<button class="btn primary" type="button" data-step="5">Confirm Booking</button>`
                    : ""
              }
            </div>
          </article>
        </div>
        ${renderBookingSummary()}
      </section>
    </section>
  `;
}

function renderBookingStep() {
  const experience = getExperience(booking.experience);
  if (currentBookingStep === 1) {
    return `
      <p class="card-kicker">01 Experience</p>
      <h3>Select the premium journey</h3>
      <div class="form-grid">
        <label class="form-field full">
          <span>Experience</span>
          <select data-booking="experience">
            ${experiences.map((item) => `<option value="${item.id}" ${booking.experience === item.id ? "selected" : ""}>${item.title}</option>`).join("")}
          </select>
        </label>
        <div class="mini-panel">
          <strong>${experience.destination}</strong>
          <p class="muted">${experience.duration} - ${experience.level} - ${experience.rating} rated</p>
        </div>
        <div class="mini-panel">
          <strong>${money(experience.price)} / guest</strong>
          <p class="muted">${experience.availability}</p>
        </div>
      </div>
    `;
  }

  if (currentBookingStep === 2) {
    return `
      <p class="card-kicker">02 Journey Setup</p>
      <h3>Travel date, guests, and service class</h3>
      <div class="form-grid">
        ${field("travelDate", "Travel Date", "date")}
        ${field("adults", "Adults", "number", { min: 1, max: 12 })}
        ${field("children", "Children", "number", { min: 0, max: 8 })}
        ${selectField("accommodation", "Accommodation Class", ["Luxury Lodge", "Presidential Suite", "Boutique Villa", "Premium Tented Camp"])}
        ${selectField("transport", "Transport Class", ["Private 4x4", "Executive SUV", "Charter Flight + 4x4", "Luxury Van"])}
        ${selectField("privateGuide", "Private Guide", ["Yes", "No"])}
        ${selectField("airportPickup", "Airport Pickup", ["Yes", "No"])}
        <div class="mini-panel">
          <strong>Reservation logic</strong>
          <p class="muted">Upgrades and guest multipliers update the booking summary instantly.</p>
        </div>
      </div>
    `;
  }

  if (currentBookingStep === 3) {
    return `
      <p class="card-kicker">03 Guest Profile</p>
      <h3>Primary traveler details</h3>
      <div class="form-grid">
        ${field("fullName", "Full Name")}
        ${field("email", "Email", "email")}
        ${field("phone", "Phone")}
        ${field("nationality", "Nationality")}
        <label class="form-field full">
          <span>Travel Notes</span>
          <textarea data-booking="notes">${booking.notes}</textarea>
        </label>
      </div>
    `;
  }

  if (currentBookingStep === 4) {
    return `
      <p class="card-kicker">04 Payment</p>
      <h3>Payment simulation</h3>
      <div class="payment-grid">
        ${["Mobile Money", "Card Payment", "Bank Transfer", "Pay on Arrival", "Deposit Payment", "Full Payment"]
          .map(
            (method) => `
              <button class="payment-card ${booking.payment === method ? "selected" : ""}" type="button" data-payment="${method}">
                <strong>${method}</strong>
                <span class="muted">${paymentCopy(method)}</span>
              </button>
            `,
          )
          .join("")}
      </div>
    `;
  }

  return `
    <div class="confirmation-card">
      <span class="status-chip confirmed" style="width: max-content">Booking Confirmed</span>
      <div>
        <h3>Booking Confirmed</h3>
        <p class="muted">The reservation has been pushed into the guest portal and admin command center.</p>
      </div>
      <div class="reference-box">
        <span>Reference</span>
        <strong>KEMO-OS-48392</strong>
      </div>
      <div class="button-row">
        <button class="btn secondary" type="button" data-modal="print">Print Booking</button>
        <button class="btn secondary" type="button" data-modal="invoice">Download Invoice</button>
        <button class="btn primary" type="button" data-route="guest">View Guest Portal</button>
        <button class="btn ghost" type="button" data-route="admin">Open Admin Command Center</button>
      </div>
    </div>
  `;
}

function field(key, label, type = "text", attrs = {}) {
  const attr = Object.entries(attrs)
    .map(([name, value]) => `${name}="${value}"`)
    .join(" ");
  return `
    <label class="form-field">
      <span>${label}</span>
      <input type="${type}" data-booking="${key}" value="${booking[key]}" ${attr} />
    </label>
  `;
}

function selectField(key, label, options) {
  return `
    <label class="form-field">
      <span>${label}</span>
      <select data-booking="${key}">
        ${options.map((option) => `<option value="${option}" ${booking[key] === option ? "selected" : ""}>${option}</option>`).join("")}
      </select>
    </label>
  `;
}

function paymentCopy(method) {
  const copy = {
    "Mobile Money": "M-Pesa, Airtel Money, or Tigo Pesa demo status.",
    "Card Payment": "Premium card authorization simulation.",
    "Bank Transfer": "Generate invoice and bank instruction preview.",
    "Pay on Arrival": "Reserve now and collect on operator arrival.",
    "Deposit Payment": "Collect 30% deposit and schedule balance.",
    "Full Payment": "Settle the entire reservation in demo mode.",
  };
  return copy[method];
}

function bookingTotals() {
  const experience = getExperience(booking.experience);
  const adults = Number(booking.adults) || 0;
  const children = Number(booking.children) || 0;
  const guestMultiplier = adults + children * 0.6;
  const base = experience.price;
  const accommodation = {
    "Luxury Lodge": 0,
    "Presidential Suite": 1200,
    "Boutique Villa": 780,
    "Premium Tented Camp": 420,
  }[booking.accommodation];
  const transport = {
    "Private 4x4": 0,
    "Executive SUV": 320,
    "Charter Flight + 4x4": 1850,
    "Luxury Van": 180,
  }[booking.transport];
  const subtotal = base * guestMultiplier + accommodation + transport;
  const service = subtotal * 0.07;
  const vat = (subtotal + service) * 0.18;
  const total = subtotal + service + vat;
  const deposit = total * 0.3;
  return { experience, adults, children, guestMultiplier, base, accommodation, transport, service, vat, total, deposit };
}

function renderBookingSummary() {
  const totals = bookingTotals();
  return `
    <aside class="glass-card summary-card">
      <p class="card-kicker">Live Booking Summary</p>
      <h3 id="summaryExperienceTitle">${totals.experience.title}</h3>
      <p class="muted" id="summaryMeta">${totals.experience.destination} - ${booking.travelDate} - ${totals.adults} adults, ${totals.children} children</p>
      <div id="summaryTotals">${renderSummaryLines(totals)}</div>
      <div class="mini-panel" style="margin-top: 16px">
        <strong>Payment method</strong>
        <p class="muted" id="summaryPayment">${booking.payment}</p>
      </div>
      <p class="muted" style="margin-top: 16px">Demo mode: no real payment charged.</p>
    </aside>
  `;
}

function renderSummaryLines(totals) {
  return `
    <div class="summary-line"><span>Base price</span><strong>${money(totals.base)}</strong></div>
    <div class="summary-line"><span>Guest multiplier</span><strong>x ${totals.guestMultiplier.toFixed(1)}</strong></div>
    <div class="summary-line"><span>Accommodation upgrade</span><strong>${money(totals.accommodation)}</strong></div>
    <div class="summary-line"><span>Transport upgrade</span><strong>${money(totals.transport)}</strong></div>
    <div class="summary-line"><span>Service fee</span><strong>${money(totals.service)}</strong></div>
    <div class="summary-line"><span>VAT</span><strong>${money(totals.vat)}</strong></div>
    <div class="summary-line total"><span>Total</span><strong>${money(totals.total)}</strong></div>
    <div class="summary-line"><span>Deposit required</span><strong>${money(totals.deposit)}</strong></div>
  `;
}

function updateBookingSummary() {
  const totals = bookingTotals();
  const title = document.getElementById("summaryExperienceTitle");
  const meta = document.getElementById("summaryMeta");
  const totalsEl = document.getElementById("summaryTotals");
  const payment = document.getElementById("summaryPayment");
  if (title) title.textContent = totals.experience.title;
  if (meta) meta.textContent = `${totals.experience.destination} - ${booking.travelDate} - ${totals.adults} adults, ${totals.children} children`;
  if (totalsEl) totalsEl.innerHTML = renderSummaryLines(totals);
  if (payment) payment.textContent = booking.payment;
}

function renderGuestPortal() {
  return `
    <section class="page">
      ${renderPageHero(
        "Guest Travel Portal",
        "A private concierge-style dashboard for managing journeys, invoices, saved experiences, travel documents, and support communication.",
        "Guest Experience",
      )}
      <section class="section compact">
        <div class="portal-grid">
          <article class="portal-card">
            <p class="card-kicker">Guest Profile</p>
            <div class="profile-card">
              <div class="avatar large">AH</div>
              <div>
                <h3>Amina Hassan</h3>
                <p class="muted">Tanzanian traveler - Premium concierge tier</p>
                <div class="experience-meta">
                  <span class="status-chip confirmed">Confirmed</span>
                  <span class="pill">KEMO-OS-48392</span>
                </div>
              </div>
            </div>
          </article>
          <article class="portal-card">
            <p class="card-kicker">Upcoming Journeys</p>
            <h3>Serengeti Private Migration Safari</h3>
            <p class="muted">Sep 18 - Sep 23, 2026 - 2 adults - Private guide</p>
            <span class="status-chip confirmed">Confirmed</span>
          </article>
          <article class="portal-card">
            <p class="card-kicker">Special Requests</p>
            <h3>Photography-focused guiding</h3>
            <p class="muted">Quiet lodge suite, vegetarian dining, and golden-hour route planning.</p>
            <span class="status-chip pending">In Review</span>
          </article>
        </div>

        <div class="portal-grid wide" style="margin-top: 16px">
          <article class="portal-card">
            <p class="card-kicker">Booking Timeline</p>
            <div class="timeline">
              ${[
                ["Reservation generated", "KEMO-OS-48392 created inside booking engine."],
                ["Deposit payment", "$2,146 deposit captured in simulation."],
                ["Operator assignment", "Musa Kileo assigned as private guide."],
                ["Documents issued", "Itinerary, invoice, and travel brief ready for download."],
              ]
                .map(
                  ([title, copy]) => `
                    <div class="timeline-item">
                      <span class="timeline-dot"></span>
                      <div><strong>${title}</strong><p class="muted">${copy}</p></div>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
          <article class="portal-card">
            <p class="card-kicker">Support Messages</p>
            <ul class="compact-list">
              <li><span>Concierge</span><strong>Guide confirmed</strong></li>
              <li><span>Operator</span><strong>Lodge suite reserved</strong></li>
              <li><span>Payments</span><strong>Balance due Aug 18</strong></li>
            </ul>
          </article>
        </div>

        <div class="portal-grid" style="margin-top: 16px">
          <article class="portal-card">
            <p class="card-kicker">Invoice History</p>
            ${simpleTable(["Invoice", "Amount", "Status"], [
              ["INV-48392-A", "$2,146", "Paid"],
              ["INV-48392-B", "$5,008", "Pending Payment"],
              ["INV-48392-C", "$0", "Completed"],
            ])}
          </article>
          <article class="portal-card">
            <p class="card-kicker">Travel Documents</p>
            <ul class="compact-list">
              <li><span>Itinerary PDF</span><span class="status-chip confirmed">Ready</span></li>
              <li><span>Visa brief</span><span class="status-chip confirmed">Ready</span></li>
              <li><span>Insurance note</span><span class="status-chip pending">Optional</span></li>
            </ul>
          </article>
          <article class="portal-card">
            <p class="card-kicker">Payment History</p>
            <ul class="compact-list">
              <li><span>Deposit Payment</span><strong>$2,146</strong></li>
              <li><span>Balance</span><strong>$5,008</strong></li>
              <li><span>Method</span><strong>Mobile Money</strong></li>
            </ul>
          </article>
        </div>

        <article class="portal-card" style="margin-top: 16px">
          <p class="card-kicker">Saved Experiences</p>
          <div class="saved-grid">
            ${experiences
              .slice(0, 3)
              .map(
                (experience) => `
                  <button class="saved-card" type="button" data-details="${experience.id}">
                    <img src="${experience.image}" alt="${experience.title}" loading="lazy" />
                    <div><strong>${experience.title}</strong><p class="muted">${money(experience.price)} / guest</p></div>
                  </button>
                `,
              )
              .join("")}
          </div>
        </article>
      </section>
    </section>
  `;
}

function renderOperatorPortal() {
  return `
    <section class="page">
      ${renderPageHero(
        "Operator Portal",
        "A simulated workspace where tourism providers manage experiences, availability, guest requests, guide assignments, vehicles, hotels, and payouts.",
        "Provider Workspace",
      )}
      <section class="section compact">
        <div class="operator-grid three">
          ${renderStats([
            ["18", "Incoming Bookings"],
            ["$42,880", "Operator Revenue"],
            ["7", "Guide Assignments"],
          ])}
        </div>
        <div class="operator-grid" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">My Experiences</p>
            ${simpleTable(["Experience", "Availability", "Status"], [
              ["Serengeti Private Migration Safari", "6 slots", "Confirmed"],
              ["Ngorongoro Crater Signature Tour", "12 slots", "Open"],
              ["Tarangire Elephant Migration Safari", "9 slots", "Open"],
            ])}
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Availability Calendar</p>
            ${renderCalendar()}
          </article>
        </div>

        <div class="operator-grid" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">Incoming Bookings</p>
            ${simpleTable(["Guest", "Journey", "Status"], [
              ["Amina Hassan", "Serengeti Private Migration Safari", "Confirmed"],
              ["David Wilson", "Ngorongoro Crater Signature Tour", "Pending Payment"],
              ["Fatma Said", "Tarangire Elephant Migration Safari", "Confirmed"],
            ])}
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Guest Requests</p>
            <ul class="compact-list">
              <li><span>Amina Hassan</span><strong>Vegetarian dining</strong></li>
              <li><span>David Wilson</span><strong>Balloon quote</strong></li>
              <li><span>Fatma Said</span><strong>Child seat</strong></li>
            </ul>
          </article>
        </div>

        <div class="operator-grid three" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">Revenue Summary</p>
            <div class="metric gold">$42,880</div>
            <p class="trend">+12.4% from last month</p>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Payout Status</p>
            <ul class="compact-list">
              <li><span>Next payout</span><strong>$12,640</strong></li>
              <li><span>Pending release</span><span class="status-chip pending">$6,200</span></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Booking Status Controls</p>
            <div class="button-row">
              <button class="btn secondary small" type="button" data-modal="status">Confirm</button>
              <button class="btn secondary small" type="button" data-modal="status">Hold</button>
              <button class="btn ghost small" type="button" data-modal="status">Cancel</button>
            </div>
          </article>
        </div>

        <div class="operator-grid three" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">Guide Assignments</p>
            <ul class="compact-list">
              <li><span>Musa Kileo</span><span class="status-chip confirmed">Assigned</span></li>
              <li><span>Rehema Mushi</span><span class="status-chip pending">Standby</span></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Vehicle Assignments</p>
            <ul class="compact-list">
              <li><span>Luxury 4x4 - T 482 KMO</span><span class="status-chip confirmed">Ready</span></li>
              <li><span>Executive SUV - T 219 KMO</span><span class="status-chip pending">Service</span></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Hotel Partners</p>
            <ul class="compact-list">
              <li><span>Serengeti Gold Lodge</span><strong>8 suites</strong></li>
              <li><span>Ngorongoro Rim House</span><strong>5 suites</strong></li>
            </ul>
          </article>
        </div>
      </section>
    </section>
  `;
}

function renderAdmin() {
  return `
    <section class="page">
      ${renderPageHero(
        "Admin Command Center",
        "Centralized control for bookings, revenue, guests, operators, payments, and tourism experience inventory.",
        "Executive Control",
      )}
      <div class="admin-stat-grid">
        ${renderStats([
          ["$86,420", "Total Revenue"],
          ["124", "Total Bookings"],
          ["18", "Pending Payments"],
          ["92", "Active Guests"],
          ["12", "Active Operators"],
        ])}
      </div>
      <section class="section compact">
        <div class="admin-grid">
          <article class="dashboard-card">
            <div class="split-row">
              <div>
                <p class="card-kicker">Revenue Intelligence Chart</p>
                <h3>Monthly simulated revenue</h3>
              </div>
              <span class="status-chip confirmed">Conversion Rate: 8.7%</span>
            </div>
            <div class="revenue-chart">
              ${[
                ["Jan", 42],
                ["Feb", 54],
                ["Mar", 48],
                ["Apr", 72],
                ["May", 66],
                ["Jun", 83],
                ["Jul", 92],
                ["Aug", 78],
                ["Sep", 96],
              ]
                .map(([month, height]) => `<div class="revenue-column" style="height:${height}%"><span>${month}</span></div>`)
                .join("")}
            </div>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Booking Pipeline</p>
            <div class="pipeline">
              ${[
                ["Discovery", 84],
                ["Quote Sent", 66],
                ["Deposit", 48],
                ["Confirmed", 37],
                ["Completed", 22],
              ]
                .map(
                  ([label, value]) => `
                    <div class="pipeline-row">
                      <span>${label}</span>
                      <div class="progress-track"><span style="width:${value}%"></span></div>
                      <strong>${value}%</strong>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </article>
        </div>

        <article class="dashboard-card" style="margin-top: 16px">
          <p class="card-kicker">Recent Reservations</p>
          ${reservationTable()}
        </article>

        <div class="admin-grid three" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">Payment Operations</p>
            <ul class="compact-list">
              <li><span>Mobile Money</span><strong>$24,800</strong></li>
              <li><span>Card Payment</span><strong>$32,120</strong></li>
              <li><span>Bank Transfer</span><strong>$21,540</strong></li>
              <li><span>Pay on Arrival</span><strong>$7,960</strong></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Top Performing Experiences</p>
            <ul class="compact-list">
              <li><span>Honeymoon Signature Journey</span><strong>$31,400</strong></li>
              <li><span>Serengeti Private Migration Safari</span><strong>$24,920</strong></li>
              <li><span>Zanzibar Presidential Beach Escape</span><strong>$18,600</strong></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Destination Performance</p>
            <ul class="compact-list">
              <li><span>Serengeti</span><span class="status-chip confirmed">42 bookings</span></li>
              <li><span>Zanzibar</span><span class="status-chip confirmed">31 bookings</span></li>
              <li><span>Ngorongoro</span><span class="status-chip pending">18 bookings</span></li>
            </ul>
          </article>
        </div>

        <div class="admin-grid three" style="margin-top: 16px">
          <article class="dashboard-card">
            <p class="card-kicker">Operator Approval Queue</p>
            <ul class="compact-list">
              <li><span>Coastal Elite Tours</span><span class="status-chip pending">Review</span></li>
              <li><span>Kili Summit Group</span><span class="status-chip pending">Documents</span></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Guest Management</p>
            <ul class="compact-list">
              <li><span>Amina Hassan</span><span class="status-chip confirmed">VIP</span></li>
              <li><span>David Wilson</span><span class="status-chip pending">Balance due</span></li>
              <li><span>Neema Joseph</span><span class="status-chip confirmed">Returning</span></li>
            </ul>
          </article>
          <article class="dashboard-card">
            <p class="card-kicker">Experience Inventory</p>
            <ul class="compact-list">
              <li><span>Published</span><strong>38</strong></li>
              <li><span>Pending QA</span><strong>6</strong></li>
              <li><span>Limited availability</span><strong>11</strong></li>
            </ul>
          </article>
        </div>

        <article class="dashboard-card" style="margin-top: 16px">
          <p class="card-kicker">System Health</p>
          <div class="health-grid">
            <div class="health-item"><strong>Booking API</strong><p class="muted">Healthy - 98ms</p></div>
            <div class="health-item"><strong>Payment Simulation</strong><p class="muted">Healthy - 123ms</p></div>
            <div class="health-item"><strong>Guest Portal</strong><p class="muted">Healthy - 100%</p></div>
            <div class="health-item"><strong>Operator Sync</strong><p class="muted">Healthy - 2m ago</p></div>
          </div>
        </article>
      </section>
    </section>
  `;
}

function simpleTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  ${row
                    .map((cell) =>
                      ["Confirmed", "Pending Payment", "Completed", "Cancelled", "Open", "Paid"].includes(cell)
                        ? `<td><span class="status-chip ${statusClass(cell)}">${cell}</span></td>`
                        : `<td>${cell}</td>`,
                    )
                    .join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function reservationTable() {
  const rows = [
    ["KEMO-OS-48392", "Amina Hassan", "Serengeti Private Migration Safari", "Serengeti", "$7,154", "Deposit Paid", "Confirmed", "Open"],
    ["KEMO-OS-48116", "David Wilson", "Ngorongoro Crater Signature Tour", "Ngorongoro", "$3,940", "Pending", "Pending Payment", "Review"],
    ["KEMO-OS-48052", "Neema Joseph", "Zanzibar Presidential Beach Escape", "Zanzibar", "$5,620", "Paid", "Confirmed", "Open"],
    ["KEMO-OS-47988", "Michael Turner", "Kilimanjaro Elite Trekking Expedition", "Kilimanjaro", "$8,920", "Bank Transfer", "Confirmed", "Open"],
    ["KEMO-OS-47871", "Fatma Said", "Stone Town Heritage & Spice Route", "Stone Town", "$1,560", "Pay on Arrival", "Completed", "Archive"],
  ];
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            ${["Reference", "Guest", "Experience", "Destination", "Amount", "Payment", "Status", "Action"].map((header) => `<th>${header}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>
                  <td><strong>${row[0]}</strong></td>
                  <td>${row[1]}</td>
                  <td>${row[2]}</td>
                  <td>${row[3]}</td>
                  <td>${row[4]}</td>
                  <td>${row[5]}</td>
                  <td><span class="status-chip ${statusClass(row[6])}">${row[6]}</span></td>
                  <td><button class="btn ghost small" type="button" data-modal="reservation">${row[7]}</button></td>
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function bindPageEvents() {
  document.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => setRoute(button.dataset.route));
  });

  document.querySelectorAll("[data-details]").forEach((button) => {
    button.addEventListener("click", () => selectExperience(button.dataset.details, "details"));
  });

  document.querySelectorAll("[data-reserve]").forEach((button) => {
    button.addEventListener("click", () => selectExperience(button.dataset.reserve, "booking"));
  });

  document.querySelectorAll("[data-filter]").forEach((input) => {
    input.addEventListener("input", handleFilter);
    input.addEventListener("change", handleFilter);
  });

  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      currentBookingStep = Number(button.dataset.step);
      renderApp();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-booking]").forEach((input) => {
    const eventName = input.tagName === "SELECT" ? "change" : "input";
    input.addEventListener(eventName, () => {
      booking[input.dataset.booking] = input.value;
      selectedExperienceId = booking.experience;
      updateBookingSummary();
    });
  });

  document.querySelectorAll("[data-payment]").forEach((button) => {
    button.addEventListener("click", () => {
      booking.payment = button.dataset.payment;
      document.querySelectorAll("[data-payment]").forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      updateBookingSummary();
    });
  });

  document.querySelectorAll("[data-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      modal = button.dataset.modal;
      renderModal();
    });
  });
}

function handleFilter(event) {
  filters[event.target.dataset.filter] = event.target.value;
  const grid = document.getElementById("experienceGrid");
  if (grid) grid.innerHTML = renderExperienceCards(getFilteredExperiences());
  bindPageEvents();
}

function renderModal() {
  if (!modal) {
    modalRoot.innerHTML = "";
    return;
  }
  const copy = {
    quote: ["Custom Quote Request", "A premium quote request has been staged for the operator workspace."],
    wishlist: ["Saved Experience", "This experience has been added to the guest portal saved list."],
    print: ["Print Booking", "The demo booking packet is ready for client presentation preview."],
    invoice: ["Invoice Download", "A simulated invoice has been generated for KEMO-OS-48392."],
    status: ["Status Updated", "The operator booking status control has been applied in demo mode."],
    reservation: ["Reservation Opened", "The admin command center reservation drawer would open here in the production build."],
  }[modal] || ["Demo Action", "This premium interaction is simulated for the showcase."];

  modalRoot.innerHTML = `
    <div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal">
        <p class="eyebrow">Kemo Tourism OS</p>
        <h3 id="modalTitle">${copy[0]}</h3>
        <p class="muted">${copy[1]}</p>
        <div class="modal-actions">
          <button class="btn primary" type="button" data-close-modal>Done</button>
        </div>
      </div>
    </div>
  `;

  modalRoot.querySelector("[data-close-modal]").addEventListener("click", () => {
    modal = null;
    renderModal();
  });
  modalRoot.querySelector(".modal-backdrop").addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-backdrop")) {
      modal = null;
      renderModal();
    }
  });
}

document.querySelector("[data-menu-toggle]").addEventListener("click", () => {
  topbar.classList.toggle("nav-open");
});

window.addEventListener("hashchange", () => {
  renderApp();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal) {
    modal = null;
    renderModal();
  }
});

renderApp();
