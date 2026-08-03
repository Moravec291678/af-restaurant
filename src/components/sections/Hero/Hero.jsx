import { HashLink } from "react-router-hash-link";
import heroImage from "../../../assets/images/hero.webp";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__background">
        <img
          src={heroImage}
          alt="Autentická afghánská restaurace Kabura"
          loading="eager"
          fetchPriority="high"
        />

        <div className="hero__overlay"></div>
      </div>

      <div className="container">
        <div className="hero__content">
          <div className="hero__badge">
            ❖ AUTENTICKÁ AFGHÁNSKÁ GASTRONOMIE ❖
          </div>

          <h1 className="hero__title">
            Chuť Hedvábné
            <br />
            Stezky v Srdci
            <br />
            Prahy
          </h1>

          <p className="hero__description">
            Vstupte do světa hřejivých světel, vůně čerstvě mletého kardamomu,
            šafránu a šťavnatého masa grilovaného na otevřeném dřevěném uhlí.
          </p>

          <div className="hero__buttons">
            <HashLink
              smooth
              to="/#jidelni-listek"
              className="hero__button hero__button--primary"
            >
              Prohlédnout menu
            </HashLink>

            <HashLink
              smooth
              to="/#kontakt"
              className="hero__button hero__button--secondary"
            >
              Kde nás najdete
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
