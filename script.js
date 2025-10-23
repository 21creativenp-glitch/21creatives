 // === BUTTONS & OVERLAYS ===
    const buttons = [
      document.getElementById("work-btn"),
      document.getElementById("services-btn"),
      document.getElementById("about-btn"),
      document.getElementById("programs-btn"),
      document.querySelector(".join-btn")
    ];

    const overlays = [
      document.getElementById("work-overlay"),
      document.getElementById("services-overlay"),
      document.getElementById("about-overlay"),
      document.getElementById("programs-overlay"),
      document.getElementById("join-overlay")
    ];

    let overlayActive = false; // track if an overlay is active

    // Connect buttons to overlays and animate hero elements
    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => {
        overlayActive = true; // overlay is active

        // Remove all existing overlay/scroll classes
        document.body.classList.remove(
          "scrolled",
          "services-active",
          "about-active",
          "programs-active",
          "join-active"
        );

        // Add the correct class for this overlay
        const classes = ["scrolled", "services-active", "about-active", "programs-active", "join-active"];
        document.body.classList.add(classes[i]);

        // Animate hero elements out (selectors present to match original behavior)
        const build = document.querySelector(".build-text");
        const legacy = document.querySelector(".legacy-text");
        const heroBtn = document.querySelector(".hero-button");
        // (no changes to animation logic — kept intentionally empty as in original)
      });
    });

    const brandButton = document.querySelector(".brand");
    brandButton.addEventListener("click", (e) => {
      e.preventDefault();
      overlayActive = false; // no overlay is active

      // Remove all overlay classes
      document.body.classList.remove(
        "scrolled",
        "services-active",
        "about-active",
        "programs-active",
        "join-active"
      );

      // Add .hero-active to center hero texts
      document.body.classList.add("hero-active");

      // Temporarily disable scroll listener to prevent conflicts
      window.removeEventListener("scroll", scrollHandler);

      // Scroll back to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Remove .hero-active after animation completes and re-enable scroll
      setTimeout(() => {
        document.body.classList.remove("hero-active");
        window.addEventListener("scroll", scrollHandler);
      }, 500); // match your CSS transition duration
    });

    // Enable horizontal scrolling for any old coverflow containers (kept for backward-compat)
    const coverflows = document.querySelectorAll(".coverflow-container");

    coverflows.forEach((container) => {
      const inner = container.querySelector(".coverflow");

      container.addEventListener("wheel", (e) => {
        e.preventDefault();
        container.scrollLeft += e.deltaY;

        // Infinite loop logic (kept as was)
        const scrollMax = inner.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= scrollMax) {
          container.scrollLeft = 0; // jump back to start
        } else if (container.scrollLeft <= 0) {
          container.scrollLeft = scrollMax; // jump to end if scrolling back
        }
      });
    });

    // === SCROLL-BASED CLASS TRIGGERS ===
    function scrollHandler() {
      if (overlayActive) return; // prevent scroll animations if overlay is active

      const scrollY = window.scrollY;
      const triggerWork = window.innerHeight * 0.2;
      const triggerServices = window.innerHeight * 1.2;
      const triggerAbout = window.innerHeight * 2.2;
      const triggerPrograms = window.innerHeight * 3.2;
      const triggerJoin = window.innerHeight * 4.2;

      if (scrollY > triggerWork && scrollY < triggerServices) {
        document.body.classList.add("scrolled");
        document.body.classList.remove("services-active");
      } else if (scrollY >= triggerServices && scrollY < triggerAbout) {
        document.body.classList.add("services-active");
        document.body.classList.remove("about-active");
      } else if (scrollY >= triggerAbout && scrollY < triggerPrograms) {
        document.body.classList.add("about-active");
        document.body.classList.remove("programs-active");
      } else if (scrollY >= triggerPrograms && scrollY < triggerJoin) {
        document.body.classList.add("programs-active");
        document.body.classList.remove("join-active");
      } else if (scrollY >= triggerJoin) {
        document.body.classList.add("join-active");
      } else {
        document.body.classList.remove(
          "scrolled",
          "services-active",
          "about-active",
          "programs-active",
          "join-active"
        );
      }
    }

    // Attach it to the scroll event
    window.addEventListener("scroll", scrollHandler);

    // === SWIPER INITIALIZATION ===
    
    const swipers = document.querySelectorAll(".mySwiper");
    swipers.forEach(swiperEl => {
      new Swiper(swiperEl, {
        slidesPerView: 'auto',      // Show multiple slides
        spaceBetween: 40,           // Gap between slides
        loop: true,                 // Infinite loop
        centeredSlides: true,       // Center current slide
        grabCursor: true,           // Change cursor on hover
        mousewheel: true,           // Enable scroll by wheel
        breakpoints: {              // Responsive
          480: { spaceBetween: 20 },
          768: { spaceBetween: 30 },
          1200: { spaceBetween: 40 }
        }
      });
    });