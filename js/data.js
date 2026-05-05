(function () {
  "use strict";

  function image(id, width) {
    return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + (width || 1600) + "&q=82";
  }

  var experiences = [
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
    },
    {
      id: "tarangire",
      title: "Tarangire Elephant Migration Safari",
      destination: "Tarangire",
      category: "Safari",
      level: "Premium",
      duration: "4 Days",
      rating: "4.90",
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
    },
  ];

  function getExperienceById(id) {
    var fallback = experiences[0];
    if (!id) return fallback;
    for (var i = 0; i < experiences.length; i += 1) {
      if (experiences[i].id === id) return experiences[i];
    }
    return fallback;
  }

  window.KemoData = {
    experiences: experiences,
    getExperienceById: getExperienceById,
  };
})();
