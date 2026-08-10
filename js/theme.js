const THEME_KEY = "site-theme";

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);

  const toggleBtn = document.querySelector(".theme-toggle");
  if (toggleBtn) {
    toggleBtn.textContent = theme === "dark" ? "☀️" : "🌙";
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
    );
  }
}

function getPreferredTheme() {
  const stored = localStorage.getItem(THEME_KEY);
  const windows_pref = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  if (stored === "dark" || stored === "light") {
    return stored;
  }
  else if (windows_pref) {
    return windows_pref
  }
  else {
    return "light"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());

  const toggleBtn = document.querySelector(".theme-toggle");
  if (!toggleBtn) return;

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });
});
