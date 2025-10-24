// ===== NEPAESTHETIC.JS =====
window.addEventListener("DOMContentLoaded", () => {
  const taskbar = document.querySelector('.taskbar');
  const productsSection = document.getElementById('products');
  const productsBtn = document.getElementById('products-btn');
  const logoLink = document.querySelector('.taskbar-logo-link');

  // --- TASKBAR HIDE/SHOW ---
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY) taskbar.classList.add('hide');
    else taskbar.classList.remove('hide');
    lastScrollY = window.scrollY;
  });

  // --- SECTION SCROLL STATE ---
  let isScrolling = false;
  let currentSection = 0; // 0 = hero, 1 = products

  const scrollToSection = (index) => {
    const yOffset = index === 0 ? 0 : window.innerHeight;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
  };

  // --- WHEEL SCROLL BETWEEN HERO AND PRODUCTS ---
  window.addEventListener('wheel', (e) => {
    if (isScrolling) return;

    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (e.deltaY > 0 && currentSection === 0) {
      isScrolling = true;
      currentSection = 1;
      showProductsOverlay();
      scrollToSection(1);
      setTimeout(() => { isScrolling = false; }, 1200);
    } else if (e.deltaY < 0 && currentSection === 1 && scrollY < heroHeight * 0.2) {
      isScrolling = true;
      currentSection = 0;
      hideProductsOverlay();
      scrollToSection(0);
      setTimeout(() => { isScrolling = false; }, 1200);
    }
  });

  // --- BUTTON / LOGO CLICK FUNCTIONS ---
  const showProductsOverlay = () => {
    productsSection.classList.add('visible');
    document.body.style.overflow = 'hidden'; // lock body scroll
  };

  const hideProductsOverlay = () => {
    productsSection.classList.remove('visible');
    document.body.style.overflow = 'auto'; // restore scroll
  };

  productsBtn.addEventListener('click', () => {
    currentSection = 1;
    showProductsOverlay();
    scrollToSection(1);
  });

  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    currentSection = 0;
    hideProductsOverlay();
    scrollToSection(0);
  });

  // --- SYNC CURRENT SECTION ON PAGE LOAD / SCROLL ---
  const updateCurrentSection = () => {
    currentSection = window.scrollY < window.innerHeight * 0.5 ? 0 : 1;
  };
  window.addEventListener('scroll', updateCurrentSection);
  updateCurrentSection();

  // --- OPTIONAL: ESC KEY TO CLOSE OVERLAY ---
  window.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && productsSection.classList.contains('visible')) {
      hideProductsOverlay();
      currentSection = 0;
    }
  });
});
