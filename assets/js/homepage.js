(function () {
  "use strict";

  function initializeHomepageNavigation() {
    var navigation = document.getElementById("site-nav");
    if (!navigation) {
      return;
    }

    var menuButton = navigation.querySelector("button");
    var hiddenLinks = navigation.querySelector(".hidden-links");
    var anchorLinks = navigation.querySelectorAll('a[href*="#"]');

    // The legacy bundle applies a fixed offset to every link. Native fragment
    // navigation honors the headings' responsive scroll-margin instead.
    if (window.jQuery) {
      window.jQuery(anchorLinks).off("click.smoothscroll");
    }

    if (!menuButton || !hiddenLinks) {
      return;
    }

    function syncMenuState() {
      var expanded = !hiddenLinks.classList.contains("hidden");
      menuButton.setAttribute("aria-expanded", String(expanded));
      menuButton.setAttribute(
        "aria-label",
        expanded ? "Hide navigation menu" : "Show navigation menu"
      );
      menuButton.classList.toggle("close", expanded);
    }

    menuButton.addEventListener("click", function () {
      window.setTimeout(syncMenuState, 0);
    });

    function closeMenu() {
      hiddenLinks.classList.add("hidden");
      syncMenuState();
    }

    hiddenLinks.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      closeMenu();
      window.setTimeout(syncMenuState, 0);
    });
    syncMenuState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeHomepageNavigation);
  } else {
    initializeHomepageNavigation();
  }
}());
