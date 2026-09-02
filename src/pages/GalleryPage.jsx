import { useEffect, useState } from "react";

import gallery01 from "../assets/images/gallery01.jpg";
import gallery02 from "../assets/images/gallery02.jpg";
import gallery03 from "../assets/images/gallery03.jpg";
import gallery04 from "../assets/images/gallery04.avif";

import "./GalleryPage.css";

const galleryItems = [
  {
    id: 1,
    image: gallery01,
    alt: "Interiér restaurace Naan o Namak",
  },
  {
    id: 2,
    image: gallery02,
    alt: "Interiér afghánské restaurace Naan o Namak",
  },
  {
    id: 3,
    image: gallery03,
    alt: "Afghánské jídlo v restauraci Naan o Namak",
  },
  {
    id: 4,
    image: gallery04,
    alt: "Tradiční čaj a orientální interiér restaurace Naan o Namak",
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

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isLightboxOpen]);

  return (
    <main className="gallery-page">
      <div className="container">
        <div className="gallery-page__inner">
          <header className="gallery-page__header">
            <div className="gallery-page__decorative-line" aria-hidden="true" />

            <span className="gallery-page__eyebrow">NAAN O NAMAK</span>

            <h1 className="gallery-page__title">Galerie</h1>

            <p className="gallery-page__description">
              Místo, kde se potkává tradiční afghánská kuchyně, pohostinnost a
              atmosféra našeho stolu.
            </p>

            <div className="gallery-page__decorative-line" aria-hidden="true" />
          </header>

          <div className="gallery-page__grid">
            {galleryItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="gallery-page__item"
                onClick={() => setActiveIndex(index)}
                aria-label={`Zvětšit fotografii: ${item.alt}`}
              >
                <span className="gallery-page__image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />

                  <span
                    className="gallery-page__overlay"
                    aria-hidden="true"
                  ></span>
                </span>
              </button>
            ))}
          </div>

          <div className="gallery-page__footer">
            <span className="gallery-page__footer-line" aria-hidden="true" />

            <p>Těšíme se na vaši návštěvu.</p>

            <span className="gallery-page__footer-line" aria-hidden="true" />
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="gallery-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Náhled fotografie galerie"
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="gallery-page__lightbox-close"
            onClick={closeLightbox}
            aria-label="Zavřít fotografii"
          >
            ×
          </button>

          <button
            type="button"
            className="gallery-page__lightbox-arrow gallery-page__lightbox-arrow--prev"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            aria-label="Předchozí fotografie"
          >
            ‹
          </button>

          <div
            className="gallery-page__lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={galleryItems[activeIndex].image}
              alt={galleryItems[activeIndex].alt}
              className="gallery-page__lightbox-image"
            />

            <span className="gallery-page__lightbox-counter">
              {activeIndex + 1} / {galleryItems.length}
            </span>
          </div>

          <button
            type="button"
            className="gallery-page__lightbox-arrow gallery-page__lightbox-arrow--next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label="Další fotografie"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}

export default Gallery;
