import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
      <div className="container header__container">
        {/* Logo */}

        <Link
          to="/"
          className="header__logo"
          aria-label="Kabura – Domovská stránka"
          onClick={closeMenu}
        >
          <span className="header__logo-mark">◆</span>

          <div className="header__logo-content">
            <span className="header__logo-title">KABURA</span>

            <span className="header__logo-subtitle">Afghan Restaurant</span>
          </div>
        </Link>

        {/* Desktop navigace */}

        <nav className="header__nav" aria-label="Hlavní navigace">
          <ul className="header__list">
            <li className="header__item">
              <HashLink smooth to="/#speciality" className="header__link">
                Speciality
              </HashLink>
            </li>

            <li className="header__item">
              <HashLink smooth to="/#denni-menu" className="header__link">
                Denní menu
              </HashLink>
            </li>

            <li className="header__item">
              <NavLink
                to="/jidelni-listek"
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--active"
                    : "header__link"
                }
              >
                Jídelní lístek
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink
                to="/galerie"
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--active"
                    : "header__link"
                }
              >
                Galerie
              </NavLink>
            </li>

            <li className="header__item">
              <NavLink
                to="/o-nas"
                className={({ isActive }) =>
                  isActive
                    ? "header__link header__link--active"
                    : "header__link"
                }
              >
                O nás
              </NavLink>
            </li>

            <li className="header__item">
              <HashLink smooth to="/#kontakt" className="header__link">
                Kontakt
              </HashLink>
            </li>
          </ul>
        </nav>

        {/* Desktop CTA */}

        <NavLink to="/rezervace" className="header__button">
          Rezervovat stůl
        </NavLink>

        {/* Hamburger */}

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
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile menu */}

      <aside
        id="mobile-menu"
        className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}
      >
        <nav aria-label="Mobilní navigace">
          <ul className="mobile-menu__list">
            <li>
              <HashLink smooth to="/#speciality" onClick={closeMenu}>
                Speciality
              </HashLink>
            </li>

            <li>
              <HashLink smooth to="/#denni-menu" onClick={closeMenu}>
                Denní menu
              </HashLink>
            </li>

            <li>
              <NavLink to="/jidelni-listek" onClick={closeMenu}>
                Jídelní lístek
              </NavLink>
            </li>

            <li>
              <NavLink to="/galerie" onClick={closeMenu}>
                Galerie
              </NavLink>
            </li>

            <li>
              <NavLink to="/o-nas" onClick={closeMenu}>
                O nás
              </NavLink>
            </li>

            <li>
              <HashLink smooth to="/#kontakt" onClick={closeMenu}>
                Kontakt
              </HashLink>
            </li>
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
    </header>
  );
}

export default Header;
