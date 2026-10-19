"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, type Audience } from "@/lib/analytics";

const REVEAL_SELECTOR = "[data-reveal], [data-stagger]";

/**
 * Global progressive-enhancement effects:
 * - reveal-on-scroll (IntersectionObserver)
 * - gentle parallax ([data-parallax="<px range>"])
 * - scroll progress for process timelines ([data-progress])
 * - delegated analytics for elements with [data-track]
 *
 * Motion is disabled entirely for users who prefer reduced motion.
 */
export function SiteEffects() {
  const pathname = usePathname();

  // Analytics click delegation (independent of motion preference).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const event = el.dataset.track as Parameters<typeof track>[0];
      const audience = (el.dataset.trackAudience as Audience) || "client";
      track(event, audience, { href: el.getAttribute("href") });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.dataset.motionReady = "true";

    if (reduce || !("IntersectionObserver" in window)) {
      root.classList.remove("js-motion");
      return;
    }
    root.classList.add("js-motion");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const observeAll = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-visible")) io.observe(el);
      });
    };
    observeAll();

    const mo = new MutationObserver(() => observeAll());
    mo.observe(document.body, { childList: true, subtree: true });

    // Parallax + progress, batched per animation frame.
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const range = Number(el.dataset.parallax) || 40;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > vh + 200) return;
        const centre = rect.top + rect.height / 2;
        const t = (centre - vh / 2) / (vh / 2 + rect.height / 2);
        el.style.setProperty("--parallax", `${(-t * range).toFixed(1)}px`);
      });
      document.querySelectorAll<HTMLElement>("[data-progress]").forEach((el) => {
        const rect = el.getBoundingClientRect();
        const start = vh * 0.8;
        const distance = Math.max(rect.height, vh * 0.45);
        const p = Math.min(1, Math.max(0, (start - rect.top) / distance));
        el.style.setProperty("--progress", p.toFixed(3));
        const steps = el.querySelectorAll<HTMLElement>("[data-step]");
        steps.forEach((step, i) => step.classList.toggle("is-active", p >= i / steps.length + 0.02));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
