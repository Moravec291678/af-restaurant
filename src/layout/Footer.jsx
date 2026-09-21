import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useEffect, useState } from "react";

import { sanityClient } from "../lib/sanityClient";
import { restaurantSettingsQuery } from "../lib/queries";
import logo from "../assets/icons/logo.webp";
import "./Footer.css";
import instagramIcon from "../assets/icons/instagram.png";
import facebookIcon from "../assets/icons/facebook.png";
import { useLanguage } from "../context/useLanguage";

function Footer() {
  const { isEnglish } = useLanguage();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(restaurantSettingsQuery)
      .then((data) => {
        if (cancelled) {
          return;
        }

        setSettings(data);
      })
      .catch((error) => {
        console.error("Sanity restaurant settings error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        {/* =====================================================
            MAIN FOOTER
        ===================================================== */}

        <div className="footer__main">
          {/* BRAND */}
          <div className="footer__brand">
            <HashLink
              smooth
              to="/#hero"
              className="footer__logo"
              aria-label={
                isEnglish ? "Naan O Namak – home" : "Naan O Namak – domů"
              }
            >
              <img
                src={logo}
                alt="Naan O Namak"
                width="720"
                height="240"
                loading="lazy"
                decoding="async"
              />
            </HashLink>

            <p className="footer__description">
              {isEnglish
                ? "A Persian and Central Asian restaurant in Prague-Benice. Traditional recipes, fresh ingredients, and an atmosphere you'll want to return to."
                : "Perská a středoasijská restaurace v Praze-Benicích. Tradiční receptury, čerstvé suroviny a atmosféra, ke které se budete rádi vracet."}
            </p>

            <div className="footer__creator">
              <span className="footer__creator-label">Created by</span>
              <span className="footer__creator-name">David Moravec</span>

              <a
                href="https://www.instagram.com/david_moravec7/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__creator-instagram"
                aria-label="Instagram Davida Moravce"
              >
                <img src={instagramIcon} alt="" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* RYCHLÉ ODKAZY */}
          <nav
            className="footer__navigation"
            aria-label={isEnglish ? "Quick links" : "Rychlé odkazy"}
          >
            <h2 className="footer__heading">
              {isEnglish ? "Quick Links" : "Rychlé odkazy"}
            </h2>

            <ul className="footer__links">
              <li>
                <HashLink smooth to="/#speciality">
                  {isEnglish ? "Specialties" : "Speciality"}
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#poledni-menu">
                  {isEnglish ? "Lunch Menu" : "Polední menu"}
                </HashLink>
              </li>
              <li>
                <Link to="/jidelni-listek">
                  {isEnglish ? "Menu" : "Jídelní lístek"}
                </Link>
              </li>
              <li>
                <Link to="/galerie">{isEnglish ? "Gallery" : "Galerie"}</Link>
              </li>
              <li>
                <Link to="/akce">{isEnglish ? "Events" : "Akce"}</Link>
              </li>
              <li>
                <Link to="/o-nas">{isEnglish ? "About Us" : "O nás"}</Link>
              </li>
              <li>
                <HashLink smooth to="/#kontakt">
                  {isEnglish ? "Contact" : "Kontakt"}
                </HashLink>
              </li>
            </ul>
          </nav>

          {/* KONTAKT */}
          <div className="footer__contact">
            <h2 className="footer__heading">
              {isEnglish ? "Contact" : "Kontakt"}
            </h2>

            <address className="footer__address">
              <span>
                {settings?.address?.line1 || ""}
                {settings?.address?.line2 && `, ${settings.address.line2}`}
              </span>

              <a href={`tel:${settings?.phone || ""}`}>
                {settings?.phone || ""}
              </a>
              <a
                href="https://www.facebook.com/p/NAAN-O-NAMAK-61593164313650/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__facebook"
                aria-label="Facebook Naan O Namak"
              >
                <span className="footer__facebook-icon">
                  <img src={facebookIcon} alt="" aria-hidden="true" />
                </span>
                <span>NAAN O NAMAK</span>
              </a>
              <a href={`mailto:${settings?.email || ""}`}>
                {settings?.email || ""}
              </a>
            </address>
          </div>

          {/* OTEVÍRACÍ DOBA */}
          <div className="footer__hours">
            <h2 className="footer__heading">
              {isEnglish ? "Opening Hours" : "Otevírací doba"}
            </h2>

            <div className="footer__hours-list">
              {settings?.openingHours?.map((hours) => (
                <div key={hours.day}>
                  <span>{hours.day}</span>
                  <time dateTime={`${hours.open}-${hours.close}`}>
                    {hours.open} – {hours.close}
                  </time>
                </div>
              ))}
            </div>

            <Link to="/rezervace" className="footer__reservation">
              {isEnglish ? "Book a Table" : "Rezervovat stůl"}
            </Link>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Naan O Namak –{" "}
            {isEnglish
              ? "Persian Restaurant in Benice. All rights reserved."
              : "Perská restaurace v Benicích. Všechna práva vyhrazena."}
          </p>

          <div className="footer__legal">
            <Link to="/ochrana-osobnich-udaju">
              {isEnglish ? "Privacy Policy" : "Ochrana osobních údajů"}
            </Link>
            <span aria-hidden="true">•</span>
            <Link to="/obchodni-podminky">
              {isEnglish ? "Terms and Conditions" : "Obchodní podmínky"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
