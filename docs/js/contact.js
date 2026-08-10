function showToast(message) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
  }

  toast.textContent = message;

  void toast.offsetWidth;

  toast.classList.add("is-visible");

  clearTimeout(showToast.hideTimer);
  showToast.hideTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 850);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!navigator.clipboard) return;

      event.preventDefault();
      const email = link.getAttribute("href").replace("mailto:", "");

      navigator.clipboard.writeText(email).then(() => {
        showToast("Copied to clipboard");
      });
    });
  });
});
