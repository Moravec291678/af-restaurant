import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
      return;
    }

    const targetId = hash.slice(1);
    let attempts = 0;

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);

      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      attempts += 1;

      if (attempts < 60) {
        requestAnimationFrame(scrollToTarget);
      }
    };

    requestAnimationFrame(scrollToTarget);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
