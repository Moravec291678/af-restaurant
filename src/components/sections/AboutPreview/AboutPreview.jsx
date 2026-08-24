import { Link } from "react-router-dom";
import aboutImage from "../../../assets/images/about.webp";

import "./AboutPreview.css";

function AboutPreview() {
  return (
    <section className="about-preview" id="o-nas">
      <div className="container">
        <div className="about-preview__inner">
          <div className="about-preview__content">
            <div className="about-preview__eyebrow">
              <span aria-hidden="true">—</span>
              <span>O NÁS</span>
              <span aria-hidden="true">—</span>
            </div>

            <h2 className="about-preview__title">
              Dvě suroviny
              <br />
              Jedna tradice
            </h2>

            <p className="about-preview__description">
              Naan o Namak - "chleb a sůl" <br />
              je tradiční afghánská fráze, kterou hostitel vítá hosta u svého
              stolu. Není to jen jídlo, je to slib pohostinnosti.
            </p>

            <Link to="/o-nas" className="about-preview__button">
              Více o nás
            </Link>
          </div>

          <figure className="about-preview__image">
            <img
              src={aboutImage}
              alt="Interiér restaurace Kabura"
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
