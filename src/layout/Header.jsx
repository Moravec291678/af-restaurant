import { useLanguage } from "../context/useLanguage";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/icons/logo.webp";
import czechFlag from "../assets/icons/cz.png";
import englishFlag from "../assets/icons/en.png";

import "./Header.css";

const primaryNavigation = (isEnglish) => [
  {
    label: isEnglish ? "Specialties" : "Speciality",
    type: "hash",
    to: "/#speciality",
  },
  {
    label: isEnglish ? "Lunch Menu" : "Polední menu",
    type: "hash",
    to: "/#poledni-menu",
  },
  {
    label: isEnglish ? "Menu" : "Jídelní lístek",
    type: "route",
    to: "/jidelni-listek",
  },
  { label: isEnglish ? "Gallery" : "Galerie", type: "route", to: "/galerie" },
  { label: isEnglish ? "Events" : "Akce", type: "route", to: "/akce" },
  { label: isEnglish ? "About Us" : "O nás", type: "route", to: "/o-nas" },
  { label: isEnglish ? "Contact" : "Kontakt", type: "hash", to: "/#kontakt" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === "en";
  const { pathname, hash } = useLocation();
  const previousBodyOverflow = useRef("");

  const toggleMenu = () => setIsMenuOpen((previousValue) => !previousValue);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextIsScrolled = window.scrollY > 80;

      setIsScrolled((currentValue) =>
        currentValue === nextIsScrolled ? currentValue : nextIsScrolled,
      );
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const { style } = document.body;

    if (isMenuOpen) {
      previousBodyOverflow.current = style.overflow;
      style.overflow = "hidden";
    } else {
      style.overflow = previousBodyOverflow.current;
    }

    return () => {
      style.overflow = previousBodyOverflow.current;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    closeMenu();
  }, [pathname, hash]);

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuOpen]);

  const renderNavigationLink = (
    { label, to, type },
    includeDesktopClass = true,
  ) => {
    if (type === "hash") {
      return (
        <HashLink
          smooth
          to={to}
          className={includeDesktopClass ? "header__link" : undefined}
          onClick={closeMenu}
        >
          {label}
        </HashLink>
      );
    }

    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          includeDesktopClass && isActive
            ? "header__link header__link--active"
            : includeDesktopClass
              ? "header__link"
              : undefined
        }
        onClick={() => {
          closeMenu();
          window.scrollTo(0, 0);
        }}
      >
        {label}
      </NavLink>
    );
  };
  const navigation = primaryNavigation(isEnglish);
  return (
    <>
      <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
        <div className="container header__container">
          <HashLink
            smooth
            to="/#hero"
            className="header__logo"
            aria-label="Naan O Namak – domovská stránka"
            onClick={closeMenu}
          >
            <div className="header__logo-content">
              <img
                className="header__logo-image"
                src={logo}
                alt="Naan O Namak"
                width="720"
                height="240"
                fetchPriority="high"
                decoding="sync"
              />
            </div>
          </HashLink>

          <nav className="header__nav" aria-label="Hlavní navigace">
            <ul className="header__list">
              {navigation.map((item) => (
                <li key={item.to} className="header__item">
                  {renderNavigationLink(item)}
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__actions">
            <NavLink to="/rezervace" className="header__button">
              {isEnglish ? "Book a Table" : "Rezervovat stůl"}
            </NavLink>

            <button
              type="button"
              className={`language-switch ${
                isEnglish
                  ? "language-switch--english"
                  : "language-switch--czech"
              }`}
              onClick={toggleLanguage}
              aria-label={isEnglish ? "Switch to Czech" : "Switch to English"}
              title={isEnglish ? "Switch to Czech" : "Switch to English"}
            >
              <span
                className={`language-switch__coin ${
                  isEnglish ? "language-switch__coin--english" : ""
                }`}
                c
                aria-hidden="true"
              >
                <span className="language-switch__face language-switch__face--front">
                  <img src={isEnglish ? czechFlag : englishFlag} alt="" />
                </span>

                <span className="language-switch__face language-switch__face--back">
                  <img src={czechFlag} alt="" />
                </span>
              </span>
            </button>
          </div>

          <button
            type="button"
            className={`header__hamburger ${
              isMenuOpen ? "header__hamburger--active" : ""
            }`}
            aria-label={isMenuOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </header>
      <aside
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Mobilní navigace">
          <ul className="mobile-menu__list">
            {navigation.map((item) => (
              <li key={`mobile-${item.to}`}>
                {renderNavigationLink(item, false)}
              </li>
            ))}
          </ul>

          <NavLink
            to="/rezervace"
            className="mobile-menu__button"
            onClick={closeMenu}
          >
            {isEnglish ? "Book a Table" : "Rezervovat stůl"}
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Header;
