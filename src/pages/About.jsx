import { Link } from "react-router-dom";
import aboutImage from "../assets/images/tata.jpg";

import ScrollReveal from "../components/ScrollReveal";

import "./About.css";

function About() {
  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <ScrollReveal>
            <p className="about-eyebrow">O nás</p>

            <h1>
              Příběh, zkušenost
              <br />a chuť vařit
            </h1>

            <p className="about-intro">
              Poznejte příběh restaurace Naan O Namak, která přináší dlouholeté
              zkušenosti s kuchyní do klidného prostředí pražských Benic.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <ScrollReveal>
              <div className="about-story-content">
                <p className="about-section-label">Příběh a zkušenost</p>

                <h2>
                  Třicet let zkušeností
                  <br />v České republice
                </h2>

                <p>
                  Pan Muhammad žije v České republice již 30 let. Své bohaté
                  kulinářské zkušenosti sbíral v letech 2001–2012 v centru Prahy
                  a následně působil 8 let jako šéfkuchař na ambasádě.
                </p>

                <p>
                  Po letech práce v centru Prahy si vybral právě Benice. Oslovil
                  ho zdejší klid a příjemná sousedská atmosféra – prostředí, kde
                  může svou kuchyni nabídnout lidem z okolí i návštěvníkům
                  Prahy.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="about-story-image">
                <div className="about-image-placeholder">
                  <img src={aboutImage} alt="Naan O Namak" />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CUISINE */}
      <section className="about-cuisine">
        <div className="container">
          <ScrollReveal>
            <div className="about-cuisine-heading">
              <p className="about-section-label">Naše kuchyně</p>

              <h2>
                Co u nás
                <br />
                můžete ochutnat
              </h2>
            </div>
          </ScrollReveal>

          <div className="about-features">
            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">01</span>

                <h3>Perská a středoasijská kuchyně</h3>

                <p>
                  Čerstvá, pestrá a lehce kořeněná jídla inspirovaná tradiční
                  kuchyní Střední Asie a Persie.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">02</span>

                <h3>Česká klasika</h3>

                <p>
                  Vedle tradičních specialit nabídneme také oblíbená česká
                  jídla, aby si u nás každý našel to své.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">03</span>

                <h3>Speciality z grilu</h3>

                <p>
                  Velká část menu a opékaných mas se připravuje přímo na grilu,
                  pod vedením samotného majitele.
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">04</span>

                <h3>Tradiční dobroty</h3>

                <p>
                  Doporučujeme ochutnat například Kabuli palau, plněné taštičky
                  mantu nebo šťavnaté maso připravované na jehle.
                </p>
              </article>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ATMOSPHERE */}
      <section className="about-atmosphere">
        <div className="container">
          <ScrollReveal>
            <div className="about-atmosphere-content">
              <p className="about-section-label">Naan O Namak</p>

              <h2>
                Místo pro dobré jídlo,
                <br />
                rodinu i přátele
              </h2>

              <p>
                Chceme vytvořit místo, kam se budete rádi vracet. Na dobrý oběd,
                klidnou večeři s rodinou nebo posezení s přáteli.
              </p>

              <div className="about-atmosphere-actions">
                <Link to="/jidelni-listek" className="about-button">
                  Jídelní lístek
                </Link>

                <Link
                  to="/rezervace"
                  className="about-button about-button-dark"
                >
                  Rezervovat stůl
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}

export default About;
