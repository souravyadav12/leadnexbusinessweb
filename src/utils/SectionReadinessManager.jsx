import { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const SECTION_STATES = {
  UNLOADED: 'UNLOADED',
  PRELOADING: 'PRELOADING',
  READY: 'READY',
  ACTIVE: 'ACTIVE',
};

const SectionReadinessContext = createContext({
  readinessMap: {},
  setSectionStatus: () => { },
  prefetchSection: () => { },
});

export function SectionReadinessProvider({ children }) {
  const [readinessMap, setReadinessMap] = useState({});

  const setSectionStatus = useCallback((id, status) => {
    setReadinessMap((prev) => {
      if (prev[id] === status) return prev;
      return { ...prev, [id]: status };
    });
  }, []);

  const prefetchSection = useCallback((id) => {
    setReadinessMap((prev) => {
      if (prev[id] === SECTION_STATES.READY || prev[id] === SECTION_STATES.ACTIVE) return prev;
      return { ...prev, [id]: SECTION_STATES.PRELOADING };
    });
  }, []);

  return (
    <SectionReadinessContext.Provider value={{ readinessMap, setSectionStatus, prefetchSection }}>
      {children}
    </SectionReadinessContext.Provider>
  );
}

export function useSectionReadiness(sectionId) {
  const context = useContext(SectionReadinessContext);
  return {
    status: context.readinessMap[sectionId] || SECTION_STATES.UNLOADED,
    setSectionStatus: (status) => context.setSectionStatus(sectionId, status),
    prefetchSection: context.prefetchSection,
  };
}

export function SectionObserver({ id, children, prefetchDistance = '600px', className = '' }) {
  const { status, setSectionStatus } = useSectionReadiness(id);
  const [elementRef, setElementRef] = useState(null);

  useEffect(() => {
    if (!elementRef) return;

    // Fast active observer (in viewport)
    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionStatus(SECTION_STATES.ACTIVE);
          } else if (status === SECTION_STATES.ACTIVE) {
            setSectionStatus(SECTION_STATES.READY);
          }
        });
      },
      { rootMargin: '0px' }
    );

    // Near viewport observer (preload distance)
    const nearObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSectionStatus(SECTION_STATES.READY);
          }
        });
      },
      { rootMargin: prefetchDistance }
    );

    activeObserver.observe(elementRef);
    nearObserver.observe(elementRef);

    return () => {
      activeObserver.disconnect();
      nearObserver.disconnect();
    };
  }, [elementRef, id, setSectionStatus, status, prefetchDistance]);

  const isVisible = status === SECTION_STATES.ACTIVE || status === SECTION_STATES.READY || status === SECTION_STATES.PRELOADING;

  return (
    <section ref={setElementRef} id={id} className={className}>
      {isVisible ? children : <div className="min-h-[400px] w-full" aria-hidden="true" />}
    </section>
  );
}
