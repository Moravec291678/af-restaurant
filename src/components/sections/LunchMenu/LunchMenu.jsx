import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { sanityClient } from "../../../lib/sanityClient";
import { lunchMenuQuery } from "../../../lib/queries";
import { getSanityImageUrl } from "../../../lib/sanityImage";

import "./LunchMenu.css";

function LunchMenu() {
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
          {/* =========================================
              HEADER
              ========================================= */}
          <header className="lunch-menu__header">
            <p className="lunch-menu__eyebrow">
              {lunchMenu?.eyebrow || "❖ MENU PRO VŠEDNÍ DEN ❖"}
            </p>

            <h2 id="lunch-menu-title" className="lunch-menu__title">
              {lunchMenu?.title || "Polední menu"}
            </h2>

            <p className="lunch-menu__subtitle">
              {lunchMenu?.description ||
                "Každý všední den pro vás připravujeme výběr oblíbených českých jídel."}
            </p>
          </header>

          {/* =========================================
              CONTENT
              ========================================= */}
          <div className="lunch-menu__content">
            {/* MENU ITEMS */}
            <div className="lunch-menu__list">
              {items.map((item, index) => (
                <article
                  className="lunch-menu__item"
                  key={`${item.title}-${index}`}
                >
                  <div className="lunch-menu__item-content">
                    <h3 className="lunch-menu__item-name">{item.title}</h3>

                    <p className="lunch-menu__item-description">
                      {item.description}
                    </p>
                  </div>

                  <span className="lunch-menu__item-price">
                    {item.price} Kč
                  </span>
                </article>
              ))}
            </div>

            {/* IMAGE */}
            <div className="lunch-menu__image">
              {lunchImageUrl && (
                <img
                  src={lunchImageUrl}
                  alt={
                    lunchMenu?.imageAlt ||
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

          {/* =========================================
              ACTION
              ========================================= */}
          <div className="lunch-menu__action">
            <Link to="/jidelni-listek" className="lunch-menu__button">
              Prohlédnout jídelní lístek
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LunchMenu;
