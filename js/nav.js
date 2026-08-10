document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggleBtn || !nav) return;

  document.body.classList.add("nav-ready");

  toggleBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Crossing the mobile breakpoint mid-resize changes .site-nav's transform
  // (fixed off-screen vs normal flow) — without this, the open/close
  // transition would animate that change too, even though the user never
  // touched the toggle. Disable transitions while actively resizing, and
  // restore them once the size has settled.
  let resizeTimer;
  window.addEventListener("resize", () => {
    document.body.classList.add("resizing");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.body.classList.remove("resizing");
    }, 150);
  });
});
