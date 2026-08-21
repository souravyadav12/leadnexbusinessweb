import { useEffect, useState, useRef } from 'react';

export function useScrollSpy(ids, { rootMargin = '-40% 0px -50% 0px' } = {}) {
  const [activeId, setActiveId] = useState(ids[0]);
  const rafRef = useRef(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (rafRef.current) return;
        rafRef.current = requestAnimationFrame(() => {
          rafRef.current = null;
          const visible = entries.filter((e) => e.isIntersecting);
          if (visible.length > 0) {
            const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
            setActiveId(top.target.id);
          }
        });
      },
      { rootMargin, threshold: [0.1, 0.5, 0.9] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ids.join(','), rootMargin]);

  return activeId;
}
