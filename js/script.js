// ================================ typing animation
var typed = new Typed(".typing", {
  strings: ["", "Software Engineer", "Software Developer"],
  typeSpeed: 100,
  BackSpeed: 60,
  loop: true,
});
// ================================ Acide
const nav = document.querySelector(".nav"),
  navList = nav.querySelectorAll("li"),
  totalNavList = navList.length,
  allSection = document.querySelectorAll(".section");
totalSection = allSection.length;

// Initialize on page load
window.addEventListener("load", function () {
  const hash = window.location.hash || "#home";
  const targetSection = hash.substring(1);
  navigateToSection(targetSection, false);
});

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  const targetSection = event.state ? event.state.section : "home";
  navigateToSection(targetSection, false);
});

for (let i = 0; i < totalNavList; i++) {
  const a = navList[i].querySelector("a");
  a.addEventListener("click", function (e) {
    e.preventDefault();
    const targetSection = this.getAttribute("href").split("#")[1];
    navigateToSection(targetSection, true);
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
  });
}
// Main navigation function
function navigateToSection(targetSection, addToHistory = true) {
  removeBackSection();

  // Find and set the active section
  for (let j = 0; j < totalNavList; j++) {
    if (navList[j].querySelector("a").classList.contains("active")) {
      addBackSection(j);
    }
    navList[j].querySelector("a").classList.remove("active");
  }

  // Set active navigation item
  for (let i = 0; i < totalNavList; i++) {
    const navHref = navList[i]
      .querySelector("a")
      .getAttribute("href")
      .split("#")[1];
    if (navHref === targetSection) {
      navList[i].querySelector("a").classList.add("active");
      break;
    }
  }

  // Show the target section
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const targetElement = document.querySelector("#" + targetSection);
  if (targetElement) {
    targetElement.classList.add("active");
  }

  // Add to browser history
  if (addToHistory) {
    const newUrl = window.location.pathname + "#" + targetSection;
    history.pushState({ section: targetSection }, "", newUrl);
  }
}

function removeBackSection() {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("back-section");
  }
}
function addBackSection(num) {
  allSection[num].classList.add("back-section");
}
function showSection(element) {
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.remove("active");
  }
  const target = element.getAttribute("href").split("#")[1];
  document.querySelector("#" + target).classList.add("active");
}
function updateNav(element) {
  for (let i = 0; i < totalNavList; i++) {
    navList[i].querySelector("a").classList.remove("active");
    const target = element.getAttribute("href").split("#")[1];
    if (
      target ===
      navList[i].querySelector("a").getAttribute("href").split("#")[1]
    ) {
      navList[i].querySelector("a").classList.add("active");
    }
  }
}
document.querySelector(".hire-me").addEventListener("click", function (e) {
  e.preventDefault();
  const targetSection = this.getAttribute("href").split("#")[1];
  navigateToSection(targetSection, true);
});
const navTogglerBtn = document.querySelector(".nav-toggler"),
  aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
  asideSectionTogglerBtn();
});
function asideSectionTogglerBtn() {
  aside.classList.toggle("open");
  navTogglerBtn.classList.toggle("open");
  for (let i = 0; i < totalSection; i++) {
    allSection[i].classList.toggle("open");
  }
}
