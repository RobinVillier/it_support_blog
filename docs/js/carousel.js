document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector(".carousel-btn-prev");
    const nextBtn = carousel.querySelector(".carousel-btn-next");
    const dots = Array.from(carousel.parentElement.querySelectorAll(".carousel-dot"));

    let index = 0;

    function goTo(newIndex) {
      index = (newIndex + slides.length) % slides.length;
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.style.transform = `translateX(calc(-${index * 100}% - ${index * gap}px))`;
      dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
    }

    prevBtn.addEventListener("click", () => goTo(index - 1));
    nextBtn.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  });
});
