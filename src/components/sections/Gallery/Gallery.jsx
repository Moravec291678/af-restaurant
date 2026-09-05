import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import gallery01 from "../../../assets/images/gallery06.webp";
import gallery02 from "../../../assets/images/tata.webp";
import gallery03 from "../../../assets/images/gallery05.webp";
import gallery04 from "../../../assets/images/gallery08.webp";

import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    image: gallery01,
    alt: "Perské jídlo v restauraci Naan o Namak",
  },
  {
    id: 2,
    image: gallery02,
    alt: "Perské jídlo v restauraci Naan o Namak",
  },
  {
    id: 3,
    image: gallery03,
    alt: "Perské jídlo v restauraci Naan o Namak",
  },
  {
    id: 4,
    image: gallery04,
    alt: "Perské jídlo v restauraci Naan o Namak",
  },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isLightboxOpen = activeIndex !== null;

  const showPrevious = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === 0 ? galleryItems.length - 1 : current - 1;
    });
  };

  const showNext = () => {
    setActiveIndex((current) => {
      if (current === null) return null;

      return current === galleryItems.length - 1 ? 0 : current + 1;
    });
  };

  const closeLightbox = () => {
    setActiveIndex(null);
  };

  /* =========================================
     KEYBOARD NAVIGATION
  ========================================= */

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        showNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  /* =========================================
     SWIPE
  ========================================= */

  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const difference = touchStart - touchEnd;
    const swipeThreshold = 50;

    if (difference > swipeThreshold) {
      showNext();
    }

    if (difference < -swipeThreshold) {
      showPrevious();
    }

    setTouchStart(null);
  };

  return (
    <section className="gallery" id="galerie" aria-labelledby="gallery-title">
      <div className="container">
        <div className="gallery__inner">
          {/* =========================================
              HEADER
          ========================================= */}

          <header className="gallery__header">
            <div className="gallery__decorative-line" aria-hidden="true" />

            <h2 id="gallery-title" className="gallery__title">
              Galerie
            </h2>

            <div className="gallery__decorative-line" aria-hidden="true" />
          </header>

          {/* =========================================
              GALLERY GRID
          ========================================= */}

          <div className="gallery__grid">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="gallery__item"
                onClick={() => setActiveIndex(index)}
                aria-label={`Zvětšit fotografii: ${item.alt}`}
              >
                <span className="gallery__image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="gallery__image-overlay" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          {/* =========================================
              ACTION
          ========================================= */}

          <div className="gallery__action">
            <Link to="/galerie" className="gallery__button">
              Prohlédnout galerii
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================
          LIGHTBOX
      ========================================= */}

      {isLightboxOpen &&
        createPortal(
          <div
            className="gallery__lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Náhled fotografie galerie"
            onClick={closeLightbox}
          >
            {/* CLOSE */}

            <button
              type="button"
              className="gallery__lightbox-close"
              onClick={closeLightbox}
              aria-label="Zavřít fotografii"
            >
              ×
            </button>

            {/* PREVIOUS */}

            <button
              type="button"
              className="gallery__lightbox-arrow gallery__lightbox-arrow--prev"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Předchozí fotografie"
            >
              ‹
            </button>

            {/* IMAGE */}

            <div
              className="gallery__lightbox-content"
              onClick={(event) => event.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={galleryItems[activeIndex].image}
                alt={galleryItems[activeIndex].alt}
                className="gallery__lightbox-image"
              />

              <span className="gallery__lightbox-counter">
                {activeIndex + 1} / {galleryItems.length}
              </span>
            </div>

            {/* NEXT */}

            <button
              type="button"
              className="gallery__lightbox-arrow gallery__lightbox-arrow--next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Další fotografie"
            >
              ›
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}

export default Gallery;
