/*  ========== BURGER ========== */
function burgerMenu() {
  console.log('header js loaded');
  const burger = document.querySelector(".burger");
  const menu = document.querySelector(".menu");
  const body = document.querySelector("body");

  if (!burger || !menu) return;

  burger.addEventListener("click", () => {
    if (!menu.classList.contains("active")) {
      menu.classList.add("active");
      burger.classList.add("active");
      burger.setAttribute("aria-expanded", "true");
    } else {
      menu.classList.remove("active");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 991.98) {
      menu.classList.remove("active");
      burger.classList.remove("active");
      burger.setAttribute("aria-expanded", "false");
      body.classList.remove("locked");
    }
  });
}
burgerMenu();
/*  ========== BURGER ========== */

// if fix scroll
// function fixedHeader() {
//   const nav = document.querySelector(".header");

//   // px for scroll
//   const breakpoint = 1;
//   if (window.scrollY >= breakpoint) {
//     nav.classList.add("fixed");
//   } else {
//     nav.classList.remove("fixed");
//   }
// }
// window.addEventListener("scroll", fixedHeader);
