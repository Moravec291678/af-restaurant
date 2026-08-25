import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import heroImage from "../../../assets/images/hero.webp";
import "./Hero.css";

function Hero() {
  return (
    <>
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__background">
          <img
            src={heroImage}
            alt="Autentická afghánská restaurace Kabura"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />

          <div className="hero__overlay" aria-hidden="true"></div>
        </div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              ❖ AUTENTICKÁ ORIENTÁLNÍ GASTRONOMIE ❖
            </div>

            <h1 id="hero-title" className="hero__title">
              Chuťová cesta do srdce Asie
            </h1>

            <p className="hero__description">
              Poznejte harmonii jemných bylinek, šťavnatého masa a aromatického
              koření. Orientální kuchyně čeká, až ji objevíte.
            </p>

            <div className="hero__buttons">
              <Link
                to="/jidelni-listek"
                className="hero__button hero__button--primary"
              >
                Prohlédnout menu
              </Link>

              <HashLink
                smooth
                to="/#kontakt"
                className="hero__button hero__button--secondary"
              >
                Kde nás najdete
              </HashLink>
            </div>

            <span
              id="denni-menu"
              className="hero__anchor"
              aria-hidden="true"
            ></span>
            <span className="hero__anchor" aria-hidden="true"></span>
          </div>
        </div>
        <div className="hero__footer">
          <div className="container hero__footer-container">
            <div className="hero__info">
              <address className="hero__footer-item hero__footer-address">
                <span className="hero__footer-icon" aria-hidden="true">
                  📍
                </span>

                <span className="hero__footer-label">Adresa:</span>

                <a
                  href="https://www.google.com/maps/place/Kv%C4%9Btnov%C3%A9ho+povst%C3%A1n%C3%AD+21%2F21,+103+00+Praha-Benice/@50.0137868,14.6020157,17z/data=!4m6!3m5!1s0x470b8c2e77c9630f:0x7f36b02fd66e5768!8m2!3d50.0137834!4d14.6045906!16s%2Fg%2F11cpqg2kww?entry=ttu&g_ep=EgoyMDI2MDgyMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Otevřít adresu restaurace Kabura na Google Maps"
                >
                  Vodičkova 12, Praha 1
                </a>
              </address>

              <div className="hero__footer-item">
                <span className="hero__footer-icon" aria-hidden="true">
                  🕒
                </span>

                <span className="hero__footer-label">Dnes otevřeno:</span>

                <time dateTime="11:30">11:30 – 23:00</time>
              </div>

              <div className="hero__footer-item">
                <span className="hero__footer-icon" aria-hidden="true">
                  📞
                </span>

                <span className="hero__footer-label">
                  Rezervace &amp; Dotazy:
                </span>

                <a
                  href="tel:+420123456789"
                  aria-label="Zavolat do restaurace Kabura"
                >
                  +420 123 456 789
                </a>
              </div>
            </div>

            <div className="hero__mobile-actions">
              <a href="tel:+420123456789">📞 Zavolat</a>

              <a
                href="https://maps.google.com/?q=Vodičkova+12,+Praha+1"
                target="_blank"
                rel="noopener noreferrer"
              >
                📍 Navigovat
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
