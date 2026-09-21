import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../../context/useLanguage";
import { sanityClient } from "../../../lib/sanityClient";
import { lunchMenuQuery } from "../../../lib/queries";
import { getSanityImageUrl } from "../../../lib/sanityImage";

import "./LunchMenu.css";

function LunchMenu() {
  const { isEnglish } = useLanguage();

  const [lunchMenu, setLunchMenu] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(lunchMenuQuery)
      .then((data) => {
        if (cancelled) {
          return;
        }

        setLunchMenu(data);
      })
      .catch((error) => {
        console.error("Sanity lunch menu error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const items = lunchMenu?.items ?? [];
  const lunchImageUrl = getSanityImageUrl(lunchMenu?.image);

  return (
    <section
      className="lunch-menu"
      id="poledni-menu"
      aria-labelledby="lunch-menu-title"
    >
      <div className="container">
        <div className="lunch-menu__inner">
          <header className="lunch-menu__header">
            <p className="lunch-menu__eyebrow">
              {isEnglish
                ? "❖ WEEKDAY LUNCH MENU ❖"
                : lunchMenu?.eyebrow || "❖ MENU PRO VŠEDNÍ DEN ❖"}
            </p>

            <h2 id="lunch-menu-title" className="lunch-menu__title">
              {isEnglish ? "Lunch Menu" : lunchMenu?.title || "Polední menu"}
            </h2>

            <p className="lunch-menu__subtitle">
              {isEnglish
                ? "Every weekday, we prepare a selection of popular Czech dishes for you."
                : lunchMenu?.description ||
                  "Každý všední den pro vás připravujeme výběr oblíbených českých jídel."}
            </p>
          </header>

          <div className="lunch-menu__content">
            <div className="lunch-menu__list">
              {items.map((item, index) => (
                <article
                  className="lunch-menu__item"
                  key={`${item.title}-${index}`}
                >
                  <div className="lunch-menu__item-content">
                    <h3 className="lunch-menu__item-name">
                      {isEnglish && item.titleEn ? item.titleEn : item.title}
                    </h3>

                    <p className="lunch-menu__item-description">
                      {isEnglish && item.descriptionEn
                        ? item.descriptionEn
                        : item.description}
                    </p>
                  </div>

                  <span className="lunch-menu__item-price">
                    {item.price} Kč
                  </span>
                </article>
              ))}
            </div>

            <div className="lunch-menu__image">
              {lunchImageUrl && (
                <img
                  src={lunchImageUrl}
                  alt={
                    isEnglish
                      ? lunchMenu?.imageAltEn ||
                        "A dish from the Naan O Namak restaurant in Prague-Benice"
                      : lunchMenu?.imageAlt ||
                        "Jídlo z nabídky restaurace Naan O Namak v Praze-Benicích"
                  }
                  loading="lazy"
                  decoding="async"
                />
              )}

              <div
                className="lunch-menu__image-overlay"
                aria-hidden="true"
              ></div>
            </div>
          </div>

          <div className="lunch-menu__action">
            <Link to="/jidelni-listek" className="lunch-menu__button">
              {isEnglish ? "View Full Menu" : "Prohlédnout jídelní lístek"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LunchMenu;
