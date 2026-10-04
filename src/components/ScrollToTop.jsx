import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const scrollKeys = new Set([
  "ArrowDown",
  "ArrowUp",
  "End",
  "Home",
  "PageDown",
  "PageUp",
  " ",
]);

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const targetId = hash.slice(1);
    let frame;
    let attempts = 0;
    let resizeObserver;
    let disposed = false;
    let reveal;

    const handleTransitionEnd = (event) => {
      if (event.target === reveal && event.propertyName === "transform") {
        document
          .getElementById(targetId)
          ?.scrollIntoView({ behavior: "auto", block: "start" });
      }
    };

    const cleanup = () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver?.disconnect();
      reveal?.removeEventListener("transitionend", handleTransitionEnd);
      window.removeEventListener("wheel", cleanup);
      window.removeEventListener("touchstart", cleanup);
      window.removeEventListener("pointerdown", cleanup);
      window.removeEventListener("keydown", handleKeyDown);
    };

    const handleKeyDown = (event) => {
      if (scrollKeys.has(event.key)) {
        cleanup();
      }
    };

    const scrollToTarget = () => {
      if (disposed) {
        return;
      }

      const target = document.getElementById(targetId);

      if (!target) {
        attempts += 1;
        if (attempts < 60) {
          frame = window.requestAnimationFrame(scrollToTarget);
        }
        return;
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });
      reveal = target.closest(".reveal");
      reveal?.addEventListener("transitionend", handleTransitionEnd);

      const content = document.getElementById("main-content");

      if (content && "ResizeObserver" in window) {
        let previousHeight = content.getBoundingClientRect().height;

        resizeObserver = new ResizeObserver(([entry]) => {
          const nextHeight = entry.contentRect.height;

          if (Math.abs(nextHeight - previousHeight) < 1) {
            return;
          }

          previousHeight = nextHeight;
          target.scrollIntoView({ behavior: "auto", block: "start" });
        });
        resizeObserver.observe(content);
      }

      window.addEventListener("wheel", cleanup, { passive: true });
      window.addEventListener("touchstart", cleanup, { passive: true });
      window.addEventListener("pointerdown", cleanup, { passive: true });
      window.addEventListener("keydown", handleKeyDown);
    };

    frame = window.requestAnimationFrame(scrollToTarget);

    return cleanup;
  }, [pathname, hash, key]);

  return null;
}

export default ScrollToTop;
