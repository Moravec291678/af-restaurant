import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import logo from "../assets/icons/logo.png";
import "./Footer.css";

function Footer() {
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
              aria-label="Naan O Namak – domů"
            >
              <img src={logo} alt="Naan O Namak" />
            </HashLink>

            <p className="footer__description">
              Perská a středoasijská restaurace v Praze-Benicích. Tradiční
              receptury, čerstvé suroviny a atmosféra, ke které se budete rádi vracet.
            </p>
          </div>

          {/* RYCHLÉ ODKAZY */}
          <nav className="footer__navigation" aria-label="Rychlé odkazy">
            <h2 className="footer__heading">Rychlé odkazy</h2>

            <ul className="footer__links">
              <li>
                <HashLink smooth to="/#speciality">
                  Speciality
                </HashLink>
              </li>
              <li>
                <HashLink smooth to="/#poledni-menu">
                  Polední menu
                </HashLink>
              </li>
              <li>
                <Link to="/jidelni-listek">Jídelní lístek</Link>
              </li>
              <li>
                <Link to="/galerie">Galerie</Link>
              </li>
              <li>
                <Link to="/akce">Akce</Link>
              </li>
              <li>
                <Link to="/o-nas">O nás</Link>
              </li>
              <li>
                <HashLink smooth to="/#kontakt">
                  Kontakt
                </HashLink>
              </li>
            </ul>
          </nav>

          {/* KONTAKT */}
          <div className="footer__contact">
            <h2 className="footer__heading">Kontakt</h2>

            <address className="footer__address">
              <span>Květnového povstání 21/21, Praha-Benice</span>

              <a href="tel:+420721700777">+420 721 700 777</a>

              <a href="mailto:info@naanonamak.cz">info@naanonamak.cz</a>
            </address>
          </div>

          {/* OTEVÍRACÍ DOBA */}
          <div className="footer__hours">
            <h2 className="footer__heading">Otevírací doba</h2>

            <div className="footer__hours-list">
              <div>
                <span>Po – Pá</span>

                <time dateTime="11:00-22:00">11:00 – 22:00</time>
              </div>
              <div>
                <span>So – Ne</span>

                <time dateTime="11:30-23:00">11:30 – 22:00</time>
              </div>
            </div>

            <Link to="/rezervace" className="footer__reservation">
              Rezervovat stůl
            </Link>
          </div>
        </div>

        {/* =====================================================
            BOTTOM FOOTER
        ===================================================== */}

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {currentYear} Naan O Namak – Perská restaurace v Benicích.
            Všechna práva vyhrazena.
          </p>

          <div className="footer__legal">
            <Link to="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>

            <span aria-hidden="true">•</span>

            <Link to="/obchodni-podminky">Obchodní podmínky</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
