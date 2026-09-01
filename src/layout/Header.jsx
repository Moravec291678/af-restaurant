import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/icons/logo.png";

import "./Header.css";

const primaryNavigation = [
  { label: "Speciality", type: "hash", to: "/#speciality" },
  { label: "Ppolední menu", type: "hash", to: "/#poledni-menu" },
  { label: "Jídelní lístek", type: "route", to: "/jidelni-listek" },
  { label: "Galerie", type: "route", to: "/galerie" },
  { label: "O nás", type: "route", to: "/o-nas" },
  { label: "Kontakt", type: "hash", to: "/#kontakt" },
];

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {label}
      </NavLink>
    );
  };

  return (
    <>
      <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
        <div className="container header__container">
          <HashLink
            smooth
            to="/#hero"
            className="header__logo"
            aria-label="Kabura – domovská stránka"
            onClick={closeMenu}
          >
            <div className="header__logo-content">
              <img
                className="header__logo-image"
                src={logo}
                alt="Naan O Namak"
              />
            </div>
          </HashLink>

          <nav className="header__nav" aria-label="Hlavní navigace">
            <ul className="header__list">
              {primaryNavigation.map((item) => (
                <li key={item.to} className="header__item">
                  {renderNavigationLink(item)}
                </li>
              ))}
            </ul>
          </nav>

          <NavLink to="/rezervace" className="header__button">
            Rezervovat stůl
          </NavLink>

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
            {primaryNavigation.map((item) => (
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
            Rezervovat stůl
          </NavLink>
        </nav>
      </aside>
    </>
  );
}

export default Header;
