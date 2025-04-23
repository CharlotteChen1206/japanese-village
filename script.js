// navbar.js

// Wait until the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Load the navbar.html and attach event handlers after it's inserted
  fetch("navbar.html")
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById("navbar-placeholder");
      if (!placeholder) return;

      placeholder.innerHTML = html;

      const currentPath = window.location.pathname;
      const navLinks = document.querySelectorAll("#nav-menu a");

      navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (currentPath.includes(href)) {
          link.classList.add("active");
        }
      });

      const hamburger = document.getElementById("hamburger");
      const navMenu = document.getElementById("nav-menu");

      if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
          navMenu.classList.toggle("show");
        });
      }
    })
    .catch(error => console.error("Error loading navbar:", error));
});
