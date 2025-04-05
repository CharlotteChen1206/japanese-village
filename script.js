  document.addEventListener("DOMContentLoaded", function () {
    const current = window.location.pathname;
const links = document.querySelectorAll("nav a");

links.forEach(link => {
  const href = link.getAttribute("href");
  if (current.includes(href)) {
    link.classList.add("active");
  }
});
  
    links.forEach(link => {
      const href = link.getAttribute("href");
      if (current.includes(href)) {
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
  });
  