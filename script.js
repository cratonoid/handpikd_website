// Configuration for Google Sheets
const FORM_CONFIG = {
  // Google Sheets Web App URL - handles both saving data AND sending email
  googleSheetsUrl:
    "https://script.google.com/macros/s/AKfycbzAtwSR9ecYYjL-gqPy0x0bpSw_Dy1Uoob44083l1HRBGL3Im52nPGuL6plEv8uJm07/exec",
};

// Function to send form data to Google Sheets (which also sends email)
async function sendFormData(formData) {
  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const submissionData = {
    timestamp: timestamp,
    name: formData.name || "",
    email: formData.email || "",
    phone: formData.phone || "",
    occasion: formData.occasion || "",
    quantity: formData.quantity || "",
    budget: formData.budget || "",
    message: formData.message || "",
  };

  // Send to Google Sheets (which also triggers email)
  try {
    await fetch(FORM_CONFIG.googleSheetsUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    });
    console.log("✅ Form submitted successfully - Data saved and email sent");
  } catch (error) {
    console.error("Submission error:", error);
    throw new Error("Failed to submit form. Please try again.");
  }
}

// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Animate hamburger
  hamburger.classList.toggle("active");
});

// Catalogue Dropdown Functionality
const dropdown = document.querySelector(".dropdown");
const dropdownToggle = document.querySelector(".dropdown-toggle");
const hasSubmenuItems = document.querySelectorAll(".has-submenu > a");

// Mobile dropdown toggle
if (window.innerWidth <= 968) {
  dropdownToggle?.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("active");
  });

  hasSubmenuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      item.parentElement.classList.toggle("active");
    });
  });
}

// Handle catalogue PDF clicks
document.querySelectorAll("[data-catalogue]").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pdfPath = link.getAttribute("data-catalogue");

    // Open PDF in new tab
    window.open(pdfPath, "_blank");

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Handle catalogue image gallery clicks
document.querySelectorAll("[data-gallery]").forEach((link) => {
  link.addEventListener("click", async (e) => {
    e.preventDefault();
    const galleryPath = link.getAttribute("data-gallery");
    const galleryName = link.querySelector("h3").textContent;

    // Create loading overlay
    const loadingOverlay = document.createElement("div");
    loadingOverlay.className = "gallery-loading";
    loadingOverlay.innerHTML =
      '<div class="loader"></div><p>Loading gallery...</p>';
    document.body.appendChild(loadingOverlay);

    try {
      // Fetch directory listing to get all images
      const images = await fetchGalleryImages(galleryPath);

      if (images.length === 0) {
        throw new Error("No images found in gallery");
      }

      // Remove loading overlay
      document.body.removeChild(loadingOverlay);

      // Create and show lightbox gallery
      showLightboxGallery(images, galleryName);
    } catch (error) {
      console.error("Error loading gallery:", error);
      document.body.removeChild(loadingOverlay);
      alert("Unable to load gallery. Please try again.");
    }

    // Close mobile menu if open
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

// Function to fetch gallery images
async function fetchGalleryImages(galleryPath) {
  // Map of gallery paths to their actual file naming patterns
  const galleryConfig = {
    "images/catalogs/combo box/2 in 1": { pattern: "2 in 1", max: 41 },
    "images/catalogs/combo box/3 in 1": { pattern: "3 in 1", max: 51 },
    "images/catalogs/combo box/4 in 1": { pattern: "4 in 1", max: 49 },
    "images/catalogs/combo box/5 in 1": { pattern: "5 in 1", max: 29 },
    "images/catalogs/awards and trophies/amaze": {
      pattern: "amaze trophies",
      max: 72,
    },
    "images/catalogs/awards and trophies/awards tro": {
      pattern: "AWARDS TRO",
      max: 69,
    },
    "images/catalogs/awards and trophies/AZ series": {
      pattern: "AZ SERIES",
      max: 51,
    },
    "images/catalogs/awards and trophies/crystal": {
      pattern: "crystal trophies",
      max: 28,
    },
    "images/catalogs/awards and trophies/crystal tro": {
      pattern: "CRYSTAL TROPHIES",
      max: 71,
    },
    "images/catalogs/awards and trophies/H series 23-24": {
      pattern: "H SERIES 23-24",
      max: 69,
    },
    "images/catalogs/awards and trophies/H series 25-26": {
      pattern: "H SERIES 25-26",
      max: 85,
    },
    "images/catalogs/awards and trophies/N series": {
      pattern: "N SERIES 25-26",
      max: 126,
    },
    "images/catalogs/awards and trophies/sprts tro": {
      pattern: "SPORTS TRO",
      max: 27,
    },
    "images/catalogs/awards and trophies/wooden": {
      pattern: "WOODEN MOMENTOS",
      max: 14,
    },
    "images/catalogs/bottles/bottles": {
      pattern: "Aquabot Bottle and Drinkware 2025",
      max: 10,
    },
    "images/catalogs/diaries/diaries": { pattern: "diaries", max: 74 },
    "images/catalogs/diaries/notebooks": { pattern: "sca notebooks", max: 48 },
    "images/catalogs/keychains/keychains": { pattern: "keychains", max: 8 },
    "images/catalogs/mugs/mugs": { pattern: "aquabot mugs", max: 10 },
    "images/catalogs/pens/pens": { pattern: "metal pen shah", max: 38 },
  };

  const images = [];
  const config = galleryConfig[galleryPath];

  if (config) {
    // Use the specific naming pattern for this gallery
    for (let i = 1; i <= config.max; i++) {
      const imgPath = `${galleryPath}/${config.pattern}-${i}.jpg`;
      images.push(imgPath);
    }
  } else {
    // Fallback for unknown paths
    const baseName = galleryPath.split("/").pop();
    for (let i = 1; i <= 100; i++) {
      const imgPath = `${galleryPath}/${baseName}-${i}.jpg`;
      images.push(imgPath);
    }
  }

  return images;
}

// Function to show lightbox gallery
function showLightboxGallery(images, title) {
  // Create lightbox overlay
  const lightbox = document.createElement("div");
  lightbox.className = "lightbox-overlay";

  // Generate all images in a scrollable container
  const imagesHTML = images
    .map(
      (img, index) => `
      <div class="lightbox-image-item">
        <img src="${img}" alt="${title} - Image ${index + 1}" class="lightbox-scroll-image" loading="lazy" />
        <div class="lightbox-image-number">${index + 1} / ${images.length}</div>
      </div>
    `,
    )
    .join("");

  lightbox.innerHTML = `
    <div class="lightbox-container">
      <button class="lightbox-close">&times;</button>
      <h2 class="lightbox-title">${title}</h2>
      <div class="lightbox-scroll-content">
        ${imagesHTML}
      </div>
    </div>
  `;

  document.body.appendChild(lightbox);
  document.body.style.overflow = "hidden";

  const closeBtn = lightbox.querySelector(".lightbox-close");

  // Keyboard navigation
  function handleKeyPress(e) {
    if (e.key === "Escape") closeBtn.click();
  }
  document.addEventListener("keydown", handleKeyPress);

  // Close lightbox
  function closeLightbox() {
    document.removeEventListener("keydown", handleKeyPress);
    document.body.removeChild(lightbox);
    document.body.style.overflow = "auto";
  }

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// Close mobile menu when clicking on regular links
document
  .querySelectorAll(
    ".nav-menu a:not([data-catalogue]):not(.dropdown-toggle):not(.has-submenu > a)",
  )
  .forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 2px 30px rgba(0, 0, 0, 0.15)";
  }

  lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections for animation
document
  .querySelectorAll(
    ".service-card, .portfolio-item, .testimonial-card, .stat-item",
  )
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// Form submission handler
const contactForm = document.querySelector(".contact-form form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    // Show loading state
    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    try {
      // Send email via SMTP and save to Google Sheets
      await sendFormData(data);

      alert("Thank you for your message! We will get back to you soon.");
      contactForm.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "There was an error submitting your form. Please try again or contact us directly via email.",
      );
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
}

// Add parallax effect to hero section background only
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroOverlay = document.querySelector(".hero-overlay");
  const hero = document.querySelector(".hero");

  if (hero && scrolled < hero.offsetHeight) {
    // Apply subtle parallax only to the overlay/background
    if (heroOverlay) {
      heroOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    // Fade out hero content as you scroll
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      const opacity = 1 - scrolled / (hero.offsetHeight * 0.6);
      heroContent.style.opacity = Math.max(0, opacity);
    }
  }
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
  let start = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target.toString().includes("+")
        ? target
        : Math.floor(target) + "+";
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start).toString();
    }
  }, 16);
};

// Observe stats for counter animation
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector("h4");
        const value = parseInt(statNumber.textContent.replace(/\D/g, ""));
        const hasPlus = statNumber.textContent.includes("+");
        const hasPercent = statNumber.textContent.includes("%");

        animateCounter(statNumber, value);

        // Add back symbols after animation
        setTimeout(() => {
          if (hasPlus) statNumber.textContent += "+";
          if (hasPercent) statNumber.textContent += "%";
        }, 2000);

        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll(".stat-item").forEach((stat) => {
  statsObserver.observe(stat);
});

// Get Started Modal Functionality
const getStartedBtn = document.getElementById("getStartedBtn");
const getStartedModal = document.getElementById("getStartedModal");
const modalClose = document.querySelector(".modal-close");
const getStartedForm = document.getElementById("getStartedForm");

// Open modal
getStartedBtn?.addEventListener("click", () => {
  getStartedModal.style.display = "flex";
  document.body.style.overflow = "hidden";
});

// Close modal
modalClose?.addEventListener("click", () => {
  getStartedModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Close modal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === getStartedModal) {
    getStartedModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Handle form submission
getStartedForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(getStartedForm);
  const data = Object.fromEntries(formData);

  // Show loading in modal
  const submitBtn = getStartedForm.querySelector("button[type='submit']");
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;

  try {
    // Send email via SMTP and save to Google Sheets
    await sendFormData(data);

    // Show success message
    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
      <div class="modal-success">
        <div class="success-icon">✓</div>
        <h2>Thank You!</h2>
        <p>We've received your request and will get back to you within 24 hours.</p>
        <button class="btn btn-primary" onclick="document.getElementById('getStartedModal').style.display='none'; document.body.style.overflow='auto'; location.reload();">Close</button>
      </div>
    `;
  } catch (error) {
    console.error("Error submitting form:", error);
    alert(
      "There was an error submitting your form. Please try again or contact us directly via WhatsApp.",
    );
    submitBtn.textContent = "Submit Request";
    submitBtn.disabled = false;
  }

  // Reset overflow after 3 seconds if user doesn't close
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 3000);
});
