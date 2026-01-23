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
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // Here you would typically send the data to a server
    // For now, we'll just show an alert
    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
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
getStartedForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(getStartedForm);
  const data = Object.fromEntries(formData);

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

  // Reset overflow after 3 seconds if user doesn't close
  setTimeout(() => {
    document.body.style.overflow = "auto";
  }, 3000);
});
