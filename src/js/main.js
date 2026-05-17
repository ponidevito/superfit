/*  ========== BURGER ========== */
function burgerMenu() {
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      burger.classList.add("active");
      body.classList.add("locked");
      burger.setAttribute("aria-expanded", "true");
    } else {
      menu.classList.remove("active");
      body.classList.remove("locked");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      body.classList.remove("locked");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}
burgerMenu();
/*  ========== BURGER ========== */
