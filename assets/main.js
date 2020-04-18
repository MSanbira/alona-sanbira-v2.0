document.addEventListener("click", (event) => {
  for (const menu of document.querySelectorAll("[data-menu-to-open]")) {
    if (
      event.target.getAttribute("data-open-menu") ===
      menu.getAttribute("data-menu-to-open")
    ) {
      menu.classList.toggle("show");
    } else {
      menu.classList.remove("show");
    }
  }
});
