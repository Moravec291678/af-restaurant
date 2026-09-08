import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { sanityClient } from "../../../lib/sanityClient";
import { restaurantSettingsQuery } from "../../../lib/queries";

import "./Contact.css";

function Contact() {
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
  return (
    <section className="contact" id="kontakt" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact__inner">
          {/* =========================================
              CONTACT INFO
          ========================================= */}

          <div className="contact__info">
            <div className="contact__heading">
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
                    {settings?.address?.line1 || ""}
                    {settings?.address?.line2 && `, ${settings.address.line2}`}
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

                  <a href={`tel:${settings?.phone || ""}`}>
                    {settings?.phone || ""}
                  </a>
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

                  <a href={`mailto:${settings?.email || ""}`}>
                    {settings?.email || ""}
                  </a>
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

                <div className="contact__value contact__opening-hours">
                  {settings?.openingHours?.map((hours) => (
                    <span key={hours.day}>
                      {hours.day}: {hours.open} – {hours.close}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* =========================================
                ACTIONS
            ========================================= */}

            <div className="contact__actions">
              <a
                href={settings?.mapUrl || ""}
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
              title="Mapa restaurace Naan O Namak v Praze-Benicích"
              src={settings?.mapEmbedUrl || ""}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              href="https://maps.app.goo.gl/vbrWUgVyCbaiBvWy6"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__map-link"
              aria-label="Otevřít restauraci v Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
