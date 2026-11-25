const curtain = document.querySelector(".loading-curtain");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (curtain && !reducedMotion.matches) {
  const configuredOpenDelay = Number(curtain.dataset.openDelay);
  const openDelay = Number.isFinite(configuredOpenDelay)
    ? configuredOpenDelay
    : Math.floor(Math.random() * 5) + 1;
  curtain.style.setProperty("--curtain-open-delay", `${openDelay}s`);

  let navigating = false;

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const link = event.target.closest("a");
    if (
      !link ||
      link.target && link.target !== "_self" ||
      link.hasAttribute("download")
    ) {
      return;
    }

    const destination = new URL(link.href, window.location.href);
    if (
      destination.origin !== window.location.origin ||
      destination.pathname === window.location.pathname &&
        destination.search === window.location.search
    ) {
      return;
    }

    event.preventDefault();
    if (navigating) return;
    navigating = true;
    curtain.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.assign(destination.href);
    }, 700);
  });

  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    navigating = false;
    curtain.classList.remove("is-leaving");
  });
}
