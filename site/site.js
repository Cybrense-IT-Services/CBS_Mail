(function () {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".main-nav");
  const year = document.querySelector("[data-year]");

  function setMenu(open) {
    if (!menuButton || !navigation) {
      return;
    }

    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("is-open", open);
    document.body.classList.toggle("menu-open", open);
  }

  if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
      setMenu(menuButton.getAttribute("aria-expanded") !== "true");
    });

    navigation.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        setMenu(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        setMenu(false);
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 930) {
        setMenu(false);
      }
    });
  }

  document.querySelectorAll("[data-copy-target]").forEach(function (button) {
    button.addEventListener("click", async function () {
      const target = document.getElementById(button.dataset.copyTarget);
      const status = button
        .closest(".code-panel")
        .querySelector(".copy-status");

      if (!target) {
        return;
      }

      try {
        await navigator.clipboard.writeText(target.innerText.trim());
        button.textContent = "Copied";
        status.textContent = "Commands copied to the clipboard.";
      } catch (error) {
        status.textContent = "Select the commands to copy them manually.";
      }

      window.setTimeout(function () {
        button.textContent = "Copy";
        status.textContent = "";
      }, 2400);
    });
  });

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();
