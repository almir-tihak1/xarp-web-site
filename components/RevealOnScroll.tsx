"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Fades in every `.reveal` element when it scrolls into view.
// The `js` class on <html> (set by an inline script in the layout) is what hides them initially,
// so without JavaScript all content stays visible.
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
