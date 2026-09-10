"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") {
      return pathname === "/";
    }

    return pathname === path || pathname.startsWith(`${path}/`);
  };

  return (
    <>
      <header className="navbar-header">
        <nav className="navbar">
          <Link href="/" className="navbar-logo">
            <img src="/logo2.png" className="navbar-logo-icon" />
            <div className="navbar-logo-text">
              <span className="navbar-logo-title">EDHF</span>
              <span className="navbar-logo-subtitle">Nigeria</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar-links">
            <li>
              <Link
                href="/"
                className={`navbar-link ${
                  isActive("/") ? "navbar-link--active" : ""
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className={`navbar-link ${
                  isActive("/about") ? "navbar-link--active" : ""
                }`}
              >
                About us
              </Link>
            </li>

            <li>
              <Link
                href="/contact"
                className={`navbar-link ${
                  isActive("/contact") ? "navbar-link--active" : ""
                }`}
              >
                Contact us
              </Link>
            </li>

            <li>
              <Link
                href="/blog"
                className={`navbar-link ${
                  isActive("/blog") ? "navbar-link--active" : ""
                }`}
              >
                Blog
              </Link>
            </li>
          </ul>

          {/* Desktop Donate Button */}
          <Link href="/donate" className="navbar-donate-btn">
            Donate
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="navbar-menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <ul className="navbar-mobile-links">
              <li>
                <Link
                  href="/"
                  className={`navbar-mobile-link ${
                    isActive("/") ? "navbar-mobile-link--active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`navbar-mobile-link ${
                    isActive("/about") ? "navbar-mobile-link--active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={`navbar-mobile-link ${
                    isActive("/contact") ? "navbar-mobile-link--active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact us
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className={`navbar-mobile-link ${
                    isActive("/blog") ? "navbar-mobile-link--active" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  href="/donate"
                  className="navbar-mobile-donate-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
}