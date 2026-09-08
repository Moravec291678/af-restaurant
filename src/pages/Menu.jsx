import { useCallback, useEffect, useMemo, useState } from "react";
import "./Menu.css";
import { getMenuImage } from "../lib/menuImages";
import { sanityClient } from "../lib/sanityClient";
import { menuCategoriesQuery, menuItemsQuery } from "../lib/queries";
import { getSanityImageUrl } from "../lib/sanityImage";
/* =========================================================
   CATEGORIES
   ========================================================= */

const categories = [
  { id: "vse", label: "Vše" },
  { id: "predkrmy", label: "Předkrmy" },
  { id: "polevky-salaty", label: "Polévky & saláty" },
  { id: "orientalni-speciality", label: "Orientální speciality" },
  { id: "gril", label: "Z grilu" },
  { id: "mix-grill", label: "Mix Grill" },
  { id: "vegetarianska", label: "Vegetariánské" },
  { id: "ryby", label: "Ryby" },
  { id: "prilohy", label: "Přílohy" },
  { id: "dezerty", label: "Dezerty" },
  { id: "nealko", label: "Nealko" },
  { id: "domaci-napoje", label: "Domácí nápoje" },
  { id: "teple-napoje", label: "Teplé nápoje" },
  { id: "pivo", label: "Pivo" },
  { id: "vino", label: "Víno" },
  { id: "tvrdy-alkohol", label: "Destiláty" },
];

/* =========================================================
   ALLERGEN LEGEND
   ========================================================= */

const allergens = [
  { id: 1, label: "Obiloviny obsahující lepek" },
  { id: 2, label: "Korýši" },
  { id: 3, label: "Vejce" },
  { id: 4, label: "Ryby" },
  { id: 5, label: "Arašídy" },
  { id: 6, label: "Sójové boby" },
  { id: 7, label: "Mléko" },
  { id: 8, label: "Skořápkové plody" },
  { id: 9, label: "Celer" },
  { id: 10, label: "Hořčice" },
  { id: 11, label: "Sezamová semena" },
  { id: 12, label: "Oxid siřičitý a siřičitany" },
  { id: 13, label: "Vlčí bob" },
  { id: 14, label: "Měkkýši" },
];

/* =========================================================
   HELPERS
   ========================================================= */

function formatPrice(price) {
  return `${price.toLocaleString("cs-CZ")} Kč`;
}

/* =========================================================
   COMPONENT
   ========================================================= */

function Menu() {
  const [activeCategory, setActiveCategory] = useState("vse");
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllergens, setShowAllergens] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sanityItems, setSanityItems] = useState(null);
  const [sanityCategories, setSanityCategories] = useState(null);
  const displayCategories = sanityCategories
    ? [
        { id: "vse", label: "Vše" },
        ...sanityCategories.map((category) => ({
          id: category.slug,
          label: category.title,
        })),
      ]
    : categories;

  const displayItems = useMemo(() => sanityItems ?? [], [sanityItems]);
  const imageItems = useMemo(
    () => displayItems.filter((item) => item.image),
    [displayItems],
  );
  useEffect(() => {
    console.log("MENU USEEFFECT RUNS");
    let cancelled = false;

    sanityClient
      .fetch(menuItemsQuery)
      .then((items) => {
        if (cancelled || !Array.isArray(items) || items.length === 0) {
          return;
        }

        const mappedItems = items.map((item) => {
          const sanityImage = getSanityImageUrl(item.image);
          const localImage = getMenuImage(item._id.replace("menuItem-", ""));

          return {
            ...item,
            id: item._id.replace("menuItem-", ""),
            category: item.category?.slug ?? "",
            image: sanityImage || localImage,
            imageAlt: item.imageAlt || item.name,
          };
        });

        if (!cancelled) {
          setSanityItems(mappedItems);
        }
      })
      .catch((error) => {
        console.error("Sanity menu error:", error);
      });

    sanityClient
      .fetch(menuCategoriesQuery)
      .then((categories) => {
        if (cancelled || !Array.isArray(categories)) {
          return;
        }

        console.log("SANITY CATEGORIES:", categories);
        setSanityCategories(categories);
      })
      .catch((error) => {
        console.error("Sanity categories error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const openLightbox = (item) => {
    const index = imageItems.findIndex((imageItem) => imageItem.id === item.id);
    if (index !== -1) {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);

  const showPreviousImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex;
      return (currentIndex - 1 + imageItems.length) % imageItems.length;
    });
  }, [imageItems.length]);

  const showNextImage = useCallback(() => {
    setLightboxIndex((currentIndex) => {
      if (currentIndex === null || imageItems.length === 0) return currentIndex;
      return (currentIndex + 1) % imageItems.length;
    });
  }, [imageItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowLeft") showPreviousImage();
      if (event.key === "ArrowRight") showNextImage();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, showPreviousImage, showNextImage]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return displayItems.filter((item) => {
      const matchesCategory =
        activeCategory === "vse" || item.category === activeCategory;

      const matchesVegetarian = !vegetarianOnly || item.vegetarian;

      const matchesSearch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description?.toLowerCase().includes(normalizedSearch);

      return matchesCategory && matchesVegetarian && matchesSearch;
    });
  }, [activeCategory, vegetarianOnly, searchQuery, displayItems]);

  return (
    <main className="menu-page">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="menu-page__hero">
        <div className="container">
          <div className="menu-page__hero-content">
            <span className="menu-page__eyebrow">
              ❖ AUTENTICKÁ PERSKÁ KUCHYNĚ ❖
            </span>

            <h1 className="menu-page__title">
              Jídelní lístek <br /> Naan O Namak
            </h1>

            <p className="menu-page__intro">
              Objevte tradiční chutě perské a středoasijské kuchyně v restauraci
              Naan O Namak v Praze-Benicích – od mantu a Qabuli Palow po
              speciality z grilu.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================
          MENU
      ===================================================== */}

      <section className="menu-page__content" aria-labelledby="menu-page-title">
        <div className="container">
          {/* HEADER */}

          <header className="menu-page__header">
            <div>
              <span className="menu-page__section-label">STÁLÁ NABÍDKA</span>

              <h2 id="menu-page-title" className="menu-page__heading">
                Naše nabídka
              </h2>
            </div>

            <p className="menu-page__count">
              {filteredItems.length}{" "}
              {filteredItems.length === 1 ? "položka" : "položek"}
            </p>
          </header>

          {/* =================================================
              CATEGORY NAVIGATION
          ================================================= */}

          <nav className="menu-page__categories" aria-label="Kategorie jídel">
            {displayCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`menu-page__category ${
                  activeCategory === category.id
                    ? "menu-page__category--active"
                    : ""
                }`}
                aria-pressed={activeCategory === category.id}
                onClick={() => {
                  setActiveCategory(category.id);

                  window.scrollTo({
                    top: 180,
                    behavior: "smooth",
                  });
                }}
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* =================================================
              MENU GRID
          ================================================= */}

          {filteredItems.length > 0 ? (
            <div className="menu-page__grid">
              {filteredItems.map((item) => (
                <article
                  className={`menu-page__item ${
                    item.image ? "menu-page__item--has-image" : ""
                  }`}
                  key={item.id}
                >
                  {item.image && (
                    <button
                      type="button"
                      className="menu-page__item-image"
                      onClick={() => openLightbox(item)}
                      aria-label={`Zobrazit fotografii ${item.name}`}
                    >
                      <img
                        src={item.image}
                        alt={item.imageAlt || item.name}
                        loading="lazy"
                        decoding="async"
                      />
                      <span
                        className="menu-page__item-image-icon"
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 24 24">
                          <path d="M15 3h6v6M21 3l-8 8M5 5h5M5 5v5M5 19h5M5 19v-5M19 19h-5M19 19v-5" />
                        </svg>
                      </span>
                    </button>
                  )}

                  <div className="menu-page__item-top">
                    <div className="menu-page__item-heading">
                      <h3 className="menu-page__item-name">{item.name}</h3>

                      {item.vegetarian &&
                        ![
                          "vegetarianska",
                          "prilohy",
                          "dezerty",
                          "nealko",
                          "domaci-napoje",
                          "teple-napoje",
                          "pivo",
                          "vino",
                          "tvrdý-alkohol",
                        ].includes(item.category) && (
                          <span className="menu-page__badge">VEGE</span>
                        )}
                    </div>

                    {item.price && (
                      <span className="menu-page__price">
                        {formatPrice(item.price)}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="menu-page__description">{item.description}</p>
                  )}

                  {item.variants && (
                    <div className="menu-page__variants">
                      {item.variants.map((variant) => (
                        <div
                          className="menu-page__variant"
                          key={`${item.id}-${variant.label}`}
                        >
                          <span>{variant.label}</span>

                          <span>
                            {variant.portion && (
                              <>
                                <small>{variant.portion}</small>{" "}
                              </>
                            )}

                            <strong>{formatPrice(variant.price)}</strong>
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {item.portion && (
                    <div className="menu-page__meta">
                      <span>{item.portion}</span>

                      {item.allergens?.length > 0 && (
                        <span>Alergeny: {item.allergens.join(", ")}</span>
                      )}
                    </div>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <div className="menu-page__empty">
              <span className="menu-page__empty-mark">◆</span>

              <h3>Nic jsme nenašli</h3>

              <p>Zkuste změnit kategorii nebo hledaný výraz.</p>

              <button
                type="button"
                onClick={() => {
                  setActiveCategory("vse");
                  setVegetarianOnly(false);
                  setSearchQuery("");
                }}
              >
                Zobrazit celý lístek
              </button>
            </div>
          )}

          {/* =================================================
              ALLERGENS
          ================================================= */}

          <section className="menu-page__allergens">
            <button
              type="button"
              className="menu-page__allergens-toggle"
              aria-expanded={showAllergens}
              onClick={() => setShowAllergens((currentValue) => !currentValue)}
            >
              <span>Informace o alergenech</span>

              <span className="menu-page__allergens-arrow" aria-hidden="true">
                {showAllergens ? "−" : "+"}
              </span>
            </button>

            {showAllergens && (
              <div className="menu-page__allergens-content">
                <p className="menu-page__allergens-intro">
                  Číselné označení alergenů bude doplněno podle finálních
                  receptur jednotlivých pokrmů. Níže je připravená legenda pro
                  jejich následné zobrazení u jídel.
                </p>

                <div className="menu-page__allergens-grid">
                  {allergens.map((allergen) => (
                    <div className="menu-page__allergen" key={allergen.id}>
                      <span>{allergen.id}</span>

                      <p>{allergen.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* =================================================
              FOOTNOTE
          ================================================= */}

          <div className="menu-page__note">
            <span className="menu-page__note-mark" aria-hidden="true">
              ◆
            </span>

            <p>
              Informace o složení pokrmů a alergenech vám rádi upřesníme také
              přímo v restauraci.
            </p>
          </div>
        </div>
      </section>

      {lightboxIndex !== null && imageItems[lightboxIndex] && (
        <div
          className="menu-page__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Fotografie ${imageItems[lightboxIndex].name}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <button
            type="button"
            className="menu-page__lightbox-close"
            onClick={closeLightbox}
            aria-label="Zavřít fotografii"
          >
            ×
          </button>

          {imageItems.length > 1 && (
            <>
              <button
                type="button"
                className="menu-page__lightbox-nav menu-page__lightbox-nav--previous"
                onClick={showPreviousImage}
                aria-label="Předchozí fotografie"
              >
                ‹
              </button>

              <button
                type="button"
                className="menu-page__lightbox-nav menu-page__lightbox-nav--next"
                onClick={showNextImage}
                aria-label="Další fotografie"
              >
                ›
              </button>
            </>
          )}

          <figure className="menu-page__lightbox-content">
            <img
              src={imageItems[lightboxIndex].image}
              alt={
                imageItems[lightboxIndex].imageAlt ||
                imageItems[lightboxIndex].name
              }
            />
            <figcaption>{imageItems[lightboxIndex].name}</figcaption>
          </figure>
        </div>
      )}
    </main>
  );
}

export default Menu;
