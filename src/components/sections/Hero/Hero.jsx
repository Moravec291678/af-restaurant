import { useState } from "react";

import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import "./Hero.css";

import heroVideo1 from "../../../assets/videos/hero-1.mp4";
import heroVideo2 from "../../../assets/videos/hero-2.mp4";
import heroVideo3 from "../../../assets/videos/hero-3.mp4";
import heroVideo4 from "../../../assets/videos/hero-4.mp4";
import heroVideo5 from "../../../assets/videos/hero-5.mp4";
import heroVideo6 from "../../../assets/videos/hero-6.mp4";
import heroVideo7 from "../../../assets/videos/hero-7.mp4";
import heroVideo8 from "../../../assets/videos/hero-8.mp4";
import heroVideo9 from "../../../assets/videos/hero-9.mp4";
import heroVideo10 from "../../../assets/videos/hero-10.mp4";

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

const openingHours = [
  { day: "Po", open: "11:00", close: "22:00" },
  { day: "Út", open: "11:00", close: "22:00" },
  { day: "St", open: "11:00", close: "22:00" },
  { day: "Čt", open: "11:00", close: "22:00" },
  { day: "Pá", open: "11:00", close: "22:00" },
  { day: "So", open: "11:30", close: "22:00" },
  { day: "Ne", open: "11:30", close: "22:00" },
];

const todayIndex = new Date().getDay();
const openingDayIndex = todayIndex === 0 ? 6 : todayIndex - 1;
const todayHours = openingHours[openingDayIndex];

function Hero() {
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
                  href="https://maps.app.goo.gl/DY48kqa17Xgm1AEb7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Otevřít adresu restaurace Kabura na Google Maps"
                >
                  Květnového povstání 21/21
                </a>
              </address>

              <div className="hero__footer-item">
                <span className="hero__footer-icon" aria-hidden="true">
                  🕒
                </span>

                <span className="hero__footer-label">
                  {todayHours.open && todayHours.close
                    ? `${todayHours.day}:`
                    : "Dnes:"}
                </span>

                <time dateTime={todayHours.open || undefined}>
                  {todayHours.open && todayHours.close
                    ? `${todayHours.open} – ${todayHours.close}`
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
                  href="tel:+420721700777"
                  aria-label="Zavolat do restaurace Kabura"
                >
                  +420 721 700 777
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hero__mobile-actions">
        <a href="tel:+420721700777">📞 Zavolat</a>

        <a
          href="https://maps.app.goo.gl/DY48kqa17Xgm1AEb7"
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
