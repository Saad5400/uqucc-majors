import React, { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';

function useTocAutoScroll() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let rafId: number | null = null;
    let lastActiveHref: string | null = null;

    const findToc = (): HTMLElement | null =>
      document.querySelector('.table-of-contents') as HTMLElement | null;

    const findActiveLink = (toc: HTMLElement): HTMLAnchorElement | null =>
      toc.querySelector('.table-of-contents__link--active') as HTMLAnchorElement | null;

    const scrollActiveIntoView = () => {
      const toc = findToc();
      if (!toc) return;
      const active = findActiveLink(toc);
      if (!active) return;

      const href = active.getAttribute('href') || active.textContent || '';
      if (href === lastActiveHref) return;
      lastActiveHref = href;

      const tocRect = toc.getBoundingClientRect();
      const linkRect = active.getBoundingClientRect();
      const margin = 24;

      const above = linkRect.top < tocRect.top + margin;
      const below = linkRect.bottom > tocRect.bottom - margin;

      if (above || below) {
        const target =
          active.offsetTop - toc.clientHeight / 2 + active.clientHeight / 2;
        toc.scrollTo({ top: target, behavior: 'smooth' });
      }
    };

    const schedule = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(scrollActiveIntoView);
    };

    const tryAttach = (): MutationObserver | null => {
      const toc = findToc();
      if (!toc) return null;

      const observer = new MutationObserver(schedule);
      observer.observe(toc, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      });

      schedule();
      return observer;
    };

    let observer = tryAttach();

    let attempts = 0;
    const interval = window.setInterval(() => {
      if (observer) {
        window.clearInterval(interval);
        return;
      }
      observer = tryAttach();
      attempts += 1;
      if (attempts > 20) window.clearInterval(interval);
    }, 200);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.clearInterval(interval);
      observer?.disconnect();
    };
  }, [pathname]);
}

export default function Root({ children }: { children: React.ReactNode }) {
  useTocAutoScroll();
  return <>{children}</>;
}
