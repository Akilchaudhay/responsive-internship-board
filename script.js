// Internship data
const internships = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    company: "PixelSpring Studio",
    domain: "Development",
    location: "Remote",
    duration: "3 months",
    stipend: "₹8,000/mo",
    logo: "PS",
    tone: "",
    description: "Build responsive interfaces and create useful digital experiences."
  },
  {
    id: 2,
    title: "UI/UX Design Intern",
    company: "Northstar Creative",
    domain: "Design",
    location: "Hybrid · Delhi",
    duration: "2 months",
    stipend: "₹7,000/mo",
    logo: "NC",
    tone: "pink",
    description: "Create wireframes, user journeys, and accessible product designs."
  },
  {
    id: 3,
    title: "Digital Marketing Intern",
    company: "BrightPath Media",
    domain: "Marketing",
    location: "Remote",
    duration: "3 months",
    stipend: "₹6,000/mo",
    logo: "BP",
    tone: "peach",
    description: "Learn digital campaigns, audience research, and growth marketing."
  },
  {
    id: 4,
    title: "Data Analyst Intern",
    company: "MetricMint",
    domain: "Data",
    location: "Hybrid · Noida",
    duration: "4 months",
    stipend: "₹10,000/mo",
    logo: "MM",
    tone: "blue",
    description: "Explore datasets and turn information into useful insights."
  },
  {
    id: 5,
    title: "Backend Developer Intern",
    company: "CloudHarbor Labs",
    domain: "Development",
    location: "Remote",
    duration: "3 months",
    stipend: "₹9,000/mo",
    logo: "CH",
    tone: "mint",
    description: "Learn APIs, databases, and server-side development."
  },
  {
    id: 6,
    title: "Content Writing Intern",
    company: "PaperPlane Digital",
    domain: "Content",
    location: "Remote",
    duration: "2 months",
    stipend: "₹5,000/mo",
    logo: "PP",
    tone: "pink",
    description: "Write helpful articles and engaging social media content."
  },
  {
    id: 7,
    title: "Business Development Intern",
    company: "OrbitWorks",
    domain: "Business",
    location: "On-site · Gurugram",
    duration: "3 months",
    stipend: "₹8,000/mo",
    logo: "OW",
    tone: "",
    description: "Research markets and learn about customers and business growth."
  },
  {
    id: 8,
    title: "React Developer Intern",
    company: "CodeCanvas",
    domain: "Development",
    location: "Remote",
    duration: "3 months",
    stipend: "₹12,000/mo",
    logo: "CC",
    tone: "blue",
    description: "Build reusable components and interactive web applications."
  },
  {
    id: 9,
    title: "Graphic Design Intern",
    company: "Mango & Maple",
    domain: "Design",
    location: "Hybrid · Jaipur",
    duration: "2 months",
    stipend: "₹6,500/mo",
    logo: "M",
    tone: "peach",
    description: "Create graphics for digital campaigns and brand storytelling."
  },
  {
    id: 10,
    title: "SEO Intern",
    company: "SearchBloom",
    domain: "Marketing",
    location: "Remote",
    duration: "3 months",
    stipend: "₹5,500/mo",
    logo: "SB",
    tone: "mint",
    description: "Learn keyword research, SEO basics, and performance reporting."
  },
  {
    id: 11,
    title: "Product Data Intern",
    company: "InsightLoop",
    domain: "Data",
    location: "Hybrid · Bengaluru",
    duration: "4 months",
    stipend: "₹11,000/mo",
    logo: "IL",
    tone: "blue",
    description: "Explore product metrics and help teams understand their data."
  },
  {
    id: 12,
    title: "Social Media Intern",
    company: "GoodDay Collective",
    domain: "Content",
    location: "Remote",
    duration: "2 months",
    stipend: "₹5,000/mo",
    logo: "GD",
    tone: "pink",
    description: "Plan social posts and learn to track audience engagement."
  }
];

// Select HTML elements
const searchInput = document.querySelector("#search");
const domainFilter = document.querySelector("#domain");
const filterForm = document.querySelector("#filter-form");
const internshipGrid = document.querySelector("#internship-grid");
const resultsCount = document.querySelector("#results-count");
const totalCount = document.querySelector("#total-count");
const emptyState = document.querySelector("#empty-state");
const errorState = document.querySelector("#error-state");

// Escape text before inserting it into HTML
function escapeHTML(value) {
  const characters = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };

  return String(value).replace(
    /[&<>"']/g,
    character => characters[character]
  );
}

// Create one internship card
function createCard(internship) {
  const safeTitle = escapeHTML(internship.title);
  const safeCompany = escapeHTML(internship.company);
  const safeDomain = escapeHTML(
    internship.domain === "Data"
      ? "Data & Analytics"
      : internship.domain
  );

  return `
    <article class="internship-card">
      <div class="card-top">
        <div class="company-logo ${internship.tone}"
             aria-hidden="true">
          ${escapeHTML(internship.logo)}
        </div>

        <button
          class="bookmark"
          type="button"
          aria-label="Save ${safeTitle}"
          aria-pressed="false"
          title="Save internship"
        >☆</button>
      </div>

      <span class="domain-pill">${safeDomain}</span>

      <h3>${safeTitle}</h3>
      <p class="company-name">${safeCompany}</p>

      <p class="card-description">
        ${escapeHTML(internship.description)}
      </p>

      <div class="card-meta">
        <span>⌖ ${escapeHTML(internship.location)}</span>
        <span>◷ ${escapeHTML(internship.duration)}</span>
      </div>

      <div class="card-footer">
        <span class="stipend">
          ${escapeHTML(internship.stipend)}
        </span>

        <a
          class="apply-link"
          href="mailto:careers@example.com?subject=${encodeURIComponent(
            "Interest in " + internship.title
          )}"
          aria-label="Ask about ${safeTitle}"
        >View role ↗</a>
      </div>
    </article>
  `;
}

// Search and filter internships
function getFilteredInternships() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedDomain = domainFilter.value;

  return internships.filter(internship => {
    const matchesDomain =
      selectedDomain === "all" ||
      internship.domain === selectedDomain;

    const searchableText = [
      internship.title,
      internship.company,
      internship.domain,
      internship.location,
      internship.description
    ].join(" ").toLowerCase();

    const matchesSearch = searchableText.includes(query);

    return matchesDomain && matchesSearch;
  });
}

// Display filtered cards
function renderInternships() {
  errorState.hidden = true;

  const filteredInternships = getFilteredInternships();

  totalCount.textContent = internships.length;

  resultsCount.textContent =
    `Showing ${filteredInternships.length} ${
      filteredInternships.length === 1
        ? "opportunity"
        : "opportunities"
    }`;

  const hasResults = filteredInternships.length > 0;

  emptyState.hidden = hasResults;
  internshipGrid.hidden = !hasResults;
  internshipGrid.setAttribute("aria-busy", "false");

  internshipGrid.innerHTML = filteredInternships
    .map(createCard)
    .join("");

  // Add bookmark functionality
  internshipGrid.querySelectorAll(".bookmark").forEach(button => {
    button.addEventListener("click", () => {
      const isSaved =
        button.getAttribute("aria-pressed") === "true";

      button.setAttribute("aria-pressed", String(!isSaved));
      button.textContent = isSaved ? "☆" : "★";
      button.title = isSaved
        ? "Save internship"
        : "Remove saved internship";
    });
  });
}

// Search while typing
searchInput.addEventListener("input", renderInternships);

// Filter when domain changes
domainFilter.addEventListener("change", renderInternships);

// Prevent the form from reloading the page
filterForm.addEventListener("submit", event => {
  event.preventDefault();
  renderInternships();
});

// Clear all filters
function resetFilters() {
  searchInput.value = "";
  domainFilter.value = "all";
  renderInternships();
  searchInput.focus();
}

document.querySelector("#reset")
  .addEventListener("click", resetFilters);

document.querySelector("#empty-reset")
  .addEventListener("click", resetFilters);

// Retry rendering if an error occurs
document.querySelector("#retry").addEventListener("click", () => {
  try {
    renderInternships();
  } catch (error) {
    showError(error);
  }
});

function showError(error) {
  console.error("Internship rendering error:", error);

  internshipGrid.hidden = true;
  emptyState.hidden = true;
  errorState.hidden = false;
}

// Add current year to footer
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Render initial internship listings
try {
  renderInternships();
} catch (error) {
  showError(error);
}