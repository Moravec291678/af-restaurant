import { Link } from "react-router-dom";

import heroImage from "../../../assets/images/hero.webp";

import "./LunchMenu.css";

const lunchMenuItems = [
  {
    id: 1,
    name: "Smažený řízek - Kuřecí prsa 200g",
    description: "Podavané s bramborovým salátem nebo hranolkami",
    price: "199 Kč",
  },
  {
    id: 2,
    name: "Hovězí guláš 200g",
    description:
      "Hovězí guláš podavaný s houskovým knedlíkem a čerstvou červenou cibulkou",
    price: "199 Kč",
  },
  {
    id: 3,
    name: "Kuřecí prsa 200g",
    description: "grilované kuřecí prsa podávané se smetanovou omáčkou",
    price: "249 Kč",
  },
  {
    id: 4,
    name: "Smažený sýr 200g",
    description: "Obalovný eidam s hranolky a tatarskou omáčkou ",
    price: "219 Kč",
  },
];

function LunchMenu() {
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
            <p className="lunch-menu__eyebrow">❖ MENU PRO VŠEDNÍ DEN ❖</p>

            <h2 id="lunch-menu-title" className="lunch-menu__title">
              Polední menu
            </h2>

            <p className="lunch-menu__subtitle">
              Každý všední den pro vás připravujeme výběr oblíbených českých
              jídel.
            </p>
          </header>

          {/* =========================================
              CONTENT
          ========================================= */}

          <div className="lunch-menu__content">
            {/* MENU ITEMS */}

            <div className="lunch-menu__list">
              {lunchMenuItems.map((item) => (
                <article className="lunch-menu__item" key={item.id}>
                  <div className="lunch-menu__item-content">
                    <h3 className="lunch-menu__item-name">{item.name}</h3>

                    <p className="lunch-menu__item-description">
                      {item.description}
                    </p>
                  </div>

                  <span className="lunch-menu__item-price">{item.price}</span>
                </article>
              ))}
            </div>

            {/* IMAGE */}

            <div className="lunch-menu__image">
              <img
                src={heroImage}
                alt="Afghánské polední menu restaurace Kabura"
                loading="lazy"
                decoding="async"
              />

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
