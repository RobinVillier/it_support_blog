function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

function getSystemTheme(mediaQuery) {
  return mediaQuery.matches ? "dark" : "light";
}

document.addEventListener("DOMContentLoaded", () => {
  const darkSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
  applyTheme(getSystemTheme(darkSchemeQuery));

  darkSchemeQuery.addEventListener("change", (event) => {
    applyTheme(event.matches ? "dark" : "light");
  });

  const toggleBtn = document.querySelector(".theme-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
  });
});
