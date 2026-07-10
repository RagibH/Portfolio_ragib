"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { brandLogoSrc } from "@/lib/site";
import { scrollToTop } from "@/lib/scrollToTop";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Research", href: "/research" },
  { label: "Projects", href: "/projects" },
  { label: "Experience", href: "/experience" },
  { label: "Contact", href: "/contact" },
];

const subpageRoutes = new Set([
  "/research",
  "/projects",
  "/experience",
  "/contact",
]);

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isSubpage = subpageRoutes.has(pathname);
  const navVariant = scrolled ? "dark" : isSubpage ? "hero" : "home";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 32);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/") return;

    event.preventDefault();
    setMenuOpen(false);
    scrollToTop();
  };

  return (
    <header
      data-intro="nav"
      data-nav-variant={navVariant}
      data-nav-open={menuOpen ? "true" : "false"}
      className="site-navbar fixed top-0 right-0 left-0 z-50 w-full opacity-0"
    >
      <nav className="site-container site-navbar__bar">
        <Link
          href="/"
          onClick={handleHomeClick}
          className="site-navbar__brand"
          aria-label="Md. Ragib Hasan, Home"
        >
          <span className="site-navbar__brand-logo">
            <Image
              src={brandLogoSrc}
              alt=""
              width={64}
              height={64}
              className="site-navbar__brand-image"
              priority
              unoptimized
            />
          </span>
        </Link>
        <ul className="site-navbar__links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={link.href === "/" ? handleHomeClick : undefined}
                className={cn(
                  "site-navbar__link",
                  pathname === link.href && "site-navbar__link--active"
                )}
              >
                {link.label}
                <span className="site-navbar__link-line" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="site-navbar__menu-btn"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navbar-menu"
        >
          <span className="site-navbar__menu-icon" aria-hidden="true">
            <span className="site-navbar__menu-line" />
            <span className="site-navbar__menu-line" />
            <span className="site-navbar__menu-line" />
          </span>
        </button>
      </nav>

      <button
        type="button"
        className="site-navbar__backdrop"
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <div id="site-navbar-menu" className="site-navbar__drawer">
        <ul className="site-navbar__drawer-list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={(event) => {
                  if (link.href === "/") {
                    handleHomeClick(event);
                    return;
                  }
                  setMenuOpen(false);
                }}
                className={cn(
                  "site-navbar__drawer-link",
                  pathname === link.href && "site-navbar__drawer-link--active"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
