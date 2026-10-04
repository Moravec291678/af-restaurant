import { useCallback, useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import { galleryImagesQuery } from "../lib/queries";
import { getSanityImageUrl } from "../lib/sanityImage";
import { useLanguage } from "../context/useLanguage";

import gallery03 from "../assets/images/tata.webp";
import gallery05 from "../assets/images/gallery05.webp";
import gallery06 from "../assets/images/gallery06.webp";
import gallery08 from "../assets/images/gallery08.webp";
import gallery10 from "../assets/images/gallery10.webp";

import "./GalleryPage.css";

const galleryItems = [
  {
    id: 3,
    image: gallery03,
    alt: "Perské jídlo v restauraci Naan o Namak",
    altEn: "Persian food at Naan o Namak restaurant",
  },
  {
    id: 5,
    image: gallery05,
    alt: "Interiér restaurace Naan o Namak",
    altEn: "Interior of Naan o Namak restaurant",
  },
  {
    id: 6,
    image: gallery06,
    alt: "Perské speciality v restauraci Naan o Namak",
    altEn: "Persian specialties at Naan o Namak restaurant",
  },
  {
    id: 8,
    image: gallery08,
    alt: "Prostředí restaurace Naan o Namak",
    altEn: "The atmosphere at Naan o Namak restaurant",
  },
  {
    id: 10,
    image: gallery10,
    alt: "Atmosféra restaurace Naan o Namak",
    altEn: "The atmosphere at Naan o Namak restaurant",
  },
];

function Gallery() {
  const { isEnglish } = useLanguage();

  const [activeIndex, setActiveIndex] = useState(null);
  const [sanityItems, setSanityItems] = useState(null);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(galleryImagesQuery)
      .then((items) => {
        if (cancelled || !Array.isArray(items)) return;
        setSanityItems(items);
      })
      .catch((error) => {
        console.error("Sanity gallery page error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const sanityGalleryItems =
    sanityItems
      ?.map((item) => ({
        id: item._id,
        image: getSanityImageUrl(item.image),
        alt:
          (isEnglish && item.altEn) ||
          item.alt ||
          (isEnglish
            ? "Photo of Naan o Namak restaurant"
            : "Fotografie restaurace Naan o Namak"),
      }))
      .filter((item) => item.image) ?? [];

  const fallbackItems = galleryItems.map((item) => ({
    ...item,
    alt: (isEnglish && item.altEn) || item.alt,
  }));

  const displayItems =
    sanityGalleryItems.length > 0 ? sanityGalleryItems : fallbackItems;

  const isLightboxOpen = activeIndex !== null;

  const showPrevious = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || displayItems.length === 0) return null;

      return current === 0 ? displayItems.length - 1 : current - 1;
    });
  }, [displayItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || displayItems.length === 0) return null;

      return current === displayItems.length - 1 ? 0 : current + 1;
    });
  }, [displayItems.length]);

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
  }, []);

  const handleTouchStart = (event) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStart === null) return;

    const touchEnd = event.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    setTouchStart(null);
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
  }, [isLightboxOpen, closeLightbox, showPrevious, showNext]);

  const text = isEnglish
    ? {
        title: "Gallery",
        description:
          "A place where traditional Oriental cuisine, hospitality, and the atmosphere of our table come together.",
        footer: "We look forward to welcoming you.",
        enlarge: "Enlarge photo",
        preview: "Gallery photo preview",
        close: "Close photo",
        previous: "Previous photo",
        next: "Next photo",
      }
    : {
        title: "Galerie",
        description:
          "Místo, kde se potkává tradiční orientální kuchyně, pohostinnost a atmosféra našeho stolu.",
        footer: "Těšíme se na vaši návštěvu.",
        enlarge: "Zvětšit fotografii",
        preview: "Náhled fotografie galerie",
        close: "Zavřít fotografii",
        previous: "Předchozí fotografie",
        next: "Další fotografie",
      };

  return (
    <main className="gallery-page">
      <div className="container">
        <div className="gallery-page__inner">
          <header className="gallery-page__header">
            <div className="gallery-page__decorative-line" aria-hidden="true" />

            <span className="gallery-page__eyebrow">NAAN O NAMAK</span>

            <h1 className="gallery-page__title">{text.title}</h1>

            <p className="gallery-page__description">{text.description}</p>

            <div className="gallery-page__decorative-line" aria-hidden="true" />
          </header>

          <div className="gallery-page__grid">
            {displayItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className="gallery-page__item"
                onClick={() => setActiveIndex(index)}
                aria-label={`${text.enlarge}: ${item.alt}`}
              >
                <span className="gallery-page__image">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="gallery-page__overlay" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>

          <div className="gallery-page__footer">
            <span className="gallery-page__footer-line" aria-hidden="true" />

            <p>{text.footer}</p>

            <span className="gallery-page__footer-line" aria-hidden="true" />
          </div>
        </div>
      </div>

      {isLightboxOpen && (
        <div
          className="gallery-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={text.preview}
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            type="button"
            className="gallery-page__lightbox-close"
            onClick={(event) => {
              event.stopPropagation();
              closeLightbox();
            }}
            aria-label={text.close}
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
            aria-label={text.previous}
          >
            ‹
          </button>

          <div
            className="gallery-page__lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={displayItems[activeIndex].image}
              alt={displayItems[activeIndex].alt}
              className="gallery-page__lightbox-image"
            />

            <span className="gallery-page__lightbox-counter">
              {activeIndex + 1} / {displayItems.length}
            </span>
          </div>

          <button
            type="button"
            className="gallery-page__lightbox-arrow gallery-page__lightbox-arrow--next"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            aria-label={text.next}
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}

export default Gallery;
