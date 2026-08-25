import { Link } from "react-router-dom";

import "./Contact.css";

function Contact() {
  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__inner">
          {/* =========================================
              CONTACT INFO
          ========================================= */}

          <div className="contact__info">
            <div className="contact__heading" >
              <span className="contact__line" aria-hidden="true" />

              <h2 id="contact-title">Kde nás najdete</h2>
            </div>

            <div className="contact__details">
              {/* ADDRESS */}

              <div className="contact__item">
                <span className="contact__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
                    <circle cx="12" cy="9" r="2.2" />
                  </svg>
                </span>

                <div>
                  <span className="contact__label">Adresa</span>

                  <address>
                    Vodičkova 12, Praha 1
                    <br />
                    110 00 Česká republika
                  </address>
                </div>
              </div>

              {/* PHONE */}

              <div className="contact__item">
                <span className="contact__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M6.7 3.5 9 3l2 4-2 1.8a14.8 14.8 0 0 0 6.2 6.2L17 13l4 2-.5 2.3c-.2 1-1.1 1.7-2.1 1.7C11 19 5 13 5 5.6c0-1 .7-1.9 1.7-2.1Z" />
                  </svg>
                </span>

                <div>
                  <span className="contact__label">Telefon</span>

                  <a href="tel:+420123456789">+420 123 456 789</a>
                </div>
              </div>

              {/* EMAIL */}

              <div className="contact__item">
                <span className="contact__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                </span>

                <div>
                  <span className="contact__label">E-mail</span>

                  <a href="mailto:info@naan-o-namak.cz">info@naan-o-namak.cz</a>
                </div>
              </div>

              {/* OPENING HOURS */}

              <div className="contact__item">
                <span className="contact__icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <circle cx="12" cy="12" r="8.5" />
                    <path d="M12 7v5l3.5 2" />
                  </svg>
                </span>

                <div>
                  <span className="contact__label">Otevírací doba</span>

                  <span className="contact__value">Po – Ne: 11:30 – 23:00</span>
                </div>
              </div>
            </div>

            {/* =========================================
                ACTIONS
            ========================================= */}

            <div className="contact__actions">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Vodi%C4%8Dkova+12%2C+Praha+1"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__button contact__button--primary"
              >
                Navigovat
              </a>

              <Link
                to="/rezervace"
                className="contact__button contact__button--secondary"
              >
                Rezervovat stůl
              </Link>
            </div>
          </div>

          {/* =========================================
              MAP
          ========================================= */}

          <div className="contact__map">
            <iframe
              title="Mapa restaurace Naan o Namak"
              src="https://www.google.com/maps?q=Vodi%C4%8Dkova+12%2C+Praha+1&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
