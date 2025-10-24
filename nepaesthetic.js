



window.addEventListener("DOMContentLoaded", () => {
  const products = document.getElementById("products");

  function updateProductsPosition() {
    const scrollY = window.scrollY;
    const windowH = window.innerHeight;
    const productsH = products.offsetHeight;

    // Calculate raw translateY (products start offscreen)
    let translateY = windowH - scrollY;

    // Clamp: don't move past fully visible
    if (translateY < 0) translateY = 0;

    // Optional: don't let it go too far if section shorter than viewport
    const maxTranslate = windowH;
    if (translateY > maxTranslate) translateY = maxTranslate;

    products.style.transform = `translateY(${translateY}px)`;
  }

  window.addEventListener("scroll", () => {
    window.requestAnimationFrame(updateProductsPosition);
  });

  // Initialize position
  updateProductsPosition();

  // Update on resize
  window.addEventListener("resize", updateProductsPosition);
});
 

window.addEventListener("DOMContentLoaded", () => {
  const taskbar = document.querySelector(".taskbar");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      // Scrolling down → hide taskbar
      taskbar.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up → show taskbar
      taskbar.style.transform = "translateY(0)";
    }

    lastScrollY = currentScrollY;
  });
});
