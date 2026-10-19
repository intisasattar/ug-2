"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { consultationHref, consultationIsExternal, mainNav } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { Arrow } from "./Arrow";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close the menu whenever the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);
        setHidden(y > 480 && y > lastY.current + 4);
        if (y < lastY.current - 4 || y <= 480) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = useCallback((returnFocus = true) => {
    setMenuOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Escape to close, focus trap, scroll lock.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const focusables = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusables?.[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !focusables || focusables.length === 0) return;
      const items = [toggleRef.current, ...Array.from(focusables)].filter(Boolean) as HTMLElement[];
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const solid = scrolled || menuOpen;

  const ctaProps = consultationIsExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <header
      className={`${styles.header} ${solid ? styles.solid : styles.transparent} ${hidden && !menuOpen ? styles.hidden : ""}`}
      data-solid={solid ? "true" : "false"}
    >
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="UG Global home">
          <Wordmark tone={solid ? "dark" : "light"} />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${styles.navLink} ${isActive(item.href) ? styles.active : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  {...(item.href === "/careers" ? { "data-track": "careers_cta_click", "data-track-audience": "candidate" } : {})}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={consultationHref}
          className={styles.cta}
          data-track="client_consultation_cta_click"
          data-track-audience="client"
          {...ctaProps}
        >
          <span className={styles.ctaLong}>Book a Sales Consultation</span>
          <span className={styles.ctaShort}>Book a Consultation</span>
          <Arrow className={styles.ctaArrow} />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
          <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${menuOpen ? styles.panelOpen : ""}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile" className="container">
          <ul className={styles.mobileList}>
            {mainNav.map((item, i) => (
              <li key={item.href} style={{ ["--i" as string]: i }}>
                <Link
                  href={item.href}
                  className={`${styles.mobileLink} ${isActive(item.href) ? styles.mobileActive : ""}`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onClick={() => closeMenu(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={consultationHref}
            className={styles.mobileCta}
            onClick={() => closeMenu(false)}
            data-track="client_consultation_cta_click"
            data-track-audience="client"
            {...ctaProps}
          >
            Book a Sales Consultation <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
