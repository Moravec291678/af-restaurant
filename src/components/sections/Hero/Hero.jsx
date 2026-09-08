import { useEffect, useState } from "react";

import { sanityClient } from "../../../lib/sanityClient";
import { restaurantSettingsQuery } from "../../../lib/queries";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Hero.css";

import heroVideo1 from "../../../assets/videos/optimized/hero-1.mp4";
import heroVideo2 from "../../../assets/videos/optimized/hero-2.mp4";
import heroVideo3 from "../../../assets/videos/optimized/hero-3.mp4";
import heroVideo4 from "../../../assets/videos/optimized/hero-4.mp4";
import heroVideo5 from "../../../assets/videos/optimized/hero-5.mp4";
import heroVideo6 from "../../../assets/videos/optimized/hero-6.mp4";
import heroVideo7 from "../../../assets/videos/optimized/hero-7.mp4";
import heroVideo8 from "../../../assets/videos/optimized/hero-8.mp4";
import heroVideo9 from "../../../assets/videos/optimized/hero-9.mp4";
import heroVideo10 from "../../../assets/videos/optimized/hero-10.mp4";

const heroVideos = [
  heroVideo1,
  heroVideo2,
  heroVideo3,
  heroVideo4,
  heroVideo5,
  heroVideo6,
  heroVideo7,
  heroVideo8,
  heroVideo9,
  heroVideo10,
];

function Hero() {
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
  const todayIndex = new Date().getDay();
  const openingHours = settings?.openingHours || [];

  const todayHours =
    openingHours.length === 2
      ? todayIndex === 0 || todayIndex === 6
        ? openingHours[1]
        : openingHours[0]
      : openingHours[todayIndex === 0 ? 6 : todayIndex - 1];
  const [currentVideo, setCurrentVideo] = useState(() => {
    const lastVideo = sessionStorage.getItem("lastHeroVideo");

    let nextVideo = Math.floor(Math.random() * heroVideos.length);

    if (heroVideos.length > 1 && lastVideo !== null) {
      do {
        nextVideo = Math.floor(Math.random() * heroVideos.length);
      } while (nextVideo === Number(lastVideo));
    }

    sessionStorage.setItem("lastHeroVideo", nextVideo);

    return nextVideo;
  });

  const handleVideoEnded = () => {
    setCurrentVideo((previousVideo) => {
      let nextVideo;

      do {
        nextVideo = Math.floor(Math.random() * heroVideos.length);
      } while (heroVideos.length > 1 && nextVideo === previousVideo);

      sessionStorage.setItem("lastHeroVideo", nextVideo);

      return nextVideo;
    });
  };

  return (
    <>
      <section className="hero" id="hero" aria-labelledby="hero-title">
        <div className="hero__background">
          <div className="hero__videos">
            <video
              key={heroVideos[currentVideo]}
              className="hero__video hero__video--current"
              autoPlay
              muted
              playsInline
              onLoadedMetadata={(event) => {
                event.currentTarget.playbackRate = 0.6;
              }}
              onCanPlay={(event) => {
                event.currentTarget.playbackRate = 0.6;
                event.currentTarget.play().catch(() => {});
              }}
              onEnded={handleVideoEnded}
            >
              <source src={heroVideos[currentVideo]} type="video/mp4" />
            </video>
          </div>

          <div className="hero__overlay" aria-hidden="true"></div>
        </div>

        <div className="container">
          <div className="hero__content">
            <div className="hero__badge">
              ❖ AUTENTICKÁ ORIENTÁLNÍ GASTRONOMIE ❖
            </div>

            <h1 id="hero-title" className="hero__title">
              Naan O Namak <br />
              restaurace v Benicích
            </h1>

            <p className="hero__description">
              Autentická perská a středoasijská kuchyně v Praze-Benicích.
              Přijďte na oběd nebo večeři a ochutnejte naše speciality z grilu.
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
                  href={settings?.mapUrl || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Otevřít adresu restaurace Naan O Namak na Google Maps"
                >
                  {settings?.address?.line1 || ""}
                </a>
              </address>

              <div className="hero__footer-item">
                <span className="hero__footer-icon" aria-hidden="true">
                  🕒
                </span>

                <span className="hero__footer-label">
                  {todayHours?.day && /[-–—]/.test(todayHours.day)
                    ? ""
                    : "Dnes:"}
                </span>

                <time
                  dateTime={
                    todayHours?.open && todayHours?.close
                      ? `${todayHours.open}-${todayHours.close}`
                      : undefined
                  }
                >
                  {todayHours?.open && todayHours?.close
                    ? `${todayHours.day}: ${todayHours.open} – ${todayHours.close}`
                    : "Otevírací doba bude doplněna"}
                </time>
              </div>

              <div className="hero__footer-item">
                <span className="hero__footer-icon" aria-hidden="true">
                  📞
                </span>

                <span className="hero__footer-label">
                  Rezervace &amp; Dotazy:
                </span>

                <a
                  href={`tel:${settings?.phone || ""}`}
                  aria-label="Zavolat do restaurace Naan O Namak"
                >
                  {settings?.phone || ""}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hero__mobile-actions">
        <a href={`tel:${settings?.phone || ""}`}>📞 Zavolat</a>

        <a
          href={settings?.mapUrl || ""}
          target="_blank"
          rel="noopener noreferrer"
        >
          📍 Navigovat
        </a>
      </div>
    </>
  );
}

export default Hero;
