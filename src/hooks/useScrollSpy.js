import { useEffect, useState, useRef } from 'react';

/**
 * High-performance Scroll-spy hook that tracks which section is currently active.
 * Uses IntersectionObserver to completely avoid layout thrashing / reflows on scroll,
 * and only calculates bounding rects inside the observer callback when a transition occurs.
 *
 * @param {string[]} ids - Section element IDs to observe
 * @param {number} offset - Pixels from top to treat as the threshold (navbar height)
 */
export function useScrollSpy(ids, offset = 96) {
  const [activeId, setActiveId] = useState(null);
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const observedElements = new Map();

    const observerOptions = {
      root: null, // viewport
      // Trigger when element crosses the navbar height zone down to 75% of viewport
      rootMargin: `-${offset}px 0px -75% 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        observedElements.set(entry.target.id, entry.isIntersecting);
      });

      // Get all currently intersecting elements
      const intersectingIds = idsRef.current.filter((id) => observedElements.get(id));

      if (intersectingIds.length === 0) return;

      // Find the one closest to the top of the viewport (closest to the offset)
      let closestId = intersectingIds[0];
      let minDistance = Infinity;

      intersectingIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        // Distance of the element's top to the navbar threshold
        const distance = Math.abs(rect.top - offset);
        if (distance < minDistance) {
          minDistance = distance;
          closestId = id;
        }
      });

      setActiveId(closestId);
    }, observerOptions);

    // Start observing existing elements
    idsRef.current.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [ids.join(','), offset]);

  return activeId;
}
