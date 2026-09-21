import { Link } from "react-router-dom";
import { useLanguage } from "../../../context/useLanguage";

import aboutImage from "../../../assets/images/about.webp";
import "./AboutPreview.css";

function AboutPreview() {
  const { isEnglish } = useLanguage();

  return (
    <section className="about-preview" id="o-nas">
      <div className="container">
        <div className="about-preview__inner">
          <div className="about-preview__content">
            <div className="about-preview__eyebrow">
              <span aria-hidden="true">—</span>
              <span>{isEnglish ? "ABOUT US" : "O NÁS"}</span>
              <span aria-hidden="true">—</span>
            </div>

            <h2 className="about-preview__title">
              {isEnglish ? (
                <>
                  Two Ingredients
                  <br />
                  One Tradition
                </>
              ) : (
                <>
                  Dvě suroviny
                  <br />
                  Jedna tradice
                </>
              )}
            </h2>

            <p className="about-preview__description">
              {isEnglish ? (
                <>
                  Naan O Namak — “bread and salt”
                  <br />
                  is a traditional Persian phrase with which a host welcomes
                  guests to their table. It is more than food; it is a promise
                  of hospitality.
                </>
              ) : (
                <>
                  Naan O Namak – „chléb a sůl“ <br />
                  je tradiční perská fráze, kterou hostitel vítá hosta u svého
                  stolu. Není to jen jídlo, je to slib pohostinnosti.
                </>
              )}
            </p>

            <Link to="/o-nas" className="about-preview__button">
              {isEnglish ? "More About Us" : "Více o nás"}
            </Link>
          </div>

          <figure className="about-preview__image">
            <img
              src={aboutImage}
              alt={
                isEnglish
                  ? "Interior of Naan O Namak restaurant in Prague-Benice"
                  : "Interiér restaurace Naan O Namak v Praze-Benicích"
              }
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

export default AboutPreview;
