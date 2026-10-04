import { Link } from "react-router-dom";
import aboutImage from "../assets/images/tata.webp";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/useLanguage";
import "./About.css";

function About() {
  const { isEnglish } = useLanguage();

  return (
    <main className="about-page">
      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <ScrollReveal>
            <p className="about-eyebrow">{isEnglish ? "About Us" : "O nás"}</p>

            <h1>
              {isEnglish ? (
                <>
                  A Story of Experience
                  <br />
                  and a Passion for Cooking
                </>
              ) : (
                <>
                  Příběh, zkušenost
                  <br />a chuť vařit
                </>
              )}
            </h1>

            <p className="about-intro">
              {isEnglish
                ? "Discover the story of Naan O Namak, bringing years of culinary experience to the peaceful surroundings of Prague-Benice."
                : "Poznejte příběh restaurace Naan O Namak, která přináší dlouholeté zkušenosti s kuchyní do klidného prostředí pražských Benic."}
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
                <p className="about-section-label">
                  {isEnglish ? "Our Story & Experience" : "Příběh a zkušenost"}
                </p>

                <h2>
                  {isEnglish ? (
                    <>
                      Thirty Years of Experience
                      <br />
                      in the Czech Republic
                    </>
                  ) : (
                    <>
                      Třicet let zkušeností
                      <br />v České republice
                    </>
                  )}
                </h2>

                <p>
                  {isEnglish
                    ? "Mr. Muhammad has been living in the Czech Republic for 30 years. He gained extensive culinary experience in central Prague between 2001 and 2012, and later worked as a head chef at an embassy for eight years."
                    : "Pan Muhammad žije v České republice již 30 let. Své bohaté kulinářské zkušenosti sbíral v letech 2001–2012 v centru Prahy a následně působil 8 let jako šéfkuchař na ambasádě."}
                </p>

                <p>
                  {isEnglish
                    ? "After years of working in central Prague, he chose Benice. He was drawn to its peaceful surroundings and welcoming neighbourhood atmosphere—a place where he can share his cuisine with local residents and visitors to Prague."
                    : "Po letech práce v centru Prahy si vybral právě Benice. Oslovil ho zdejší klid a příjemná sousedská atmosféra – prostředí, kde může svou kuchyni nabídnout lidem z okolí i návštěvníkům Prahy."}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="about-story-image">
                <div className="about-image-placeholder">
                  <img
                    src={aboutImage}
                    alt={isEnglish ? "Naan O Namak restaurant" : "Naan O Namak"}
                    loading="lazy"
                    decoding="async"
                  />
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
              <p className="about-section-label">
                {isEnglish ? "Our Cuisine" : "Naše kuchyně"}
              </p>

              <h2>
                {isEnglish ? (
                  <>
                    What You Can
                    <br />
                    Enjoy Here
                  </>
                ) : (
                  <>
                    Co u nás
                    <br />
                    můžete ochutnat
                  </>
                )}
              </h2>
            </div>
          </ScrollReveal>

          <div className="about-features">
            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">01</span>
                <h3>
                  {isEnglish
                    ? "Persian and Central Asian Cuisine"
                    : "Perská a středoasijská kuchyně"}
                </h3>
                <p>
                  {isEnglish
                    ? "Fresh, colourful, and mildly spiced dishes inspired by the traditional cuisines of Central Asia and Persia."
                    : "Čerstvá, pestrá a lehce kořeněná jídla inspirovaná tradiční kuchyní Střední Asie a Persie."}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">02</span>
                <h3>{isEnglish ? "Czech Classics" : "Česká klasika"}</h3>
                <p>
                  {isEnglish
                    ? "Alongside our traditional specialties, we also serve popular Czech dishes, so everyone can find something they love."
                    : "Vedle tradičních specialit nabídneme také oblíbená česká jídla, aby si u nás každý našel to své."}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">03</span>
                <h3>
                  {isEnglish ? "Grilled Specialties" : "Speciality z grilu"}
                </h3>
                <p>
                  {isEnglish
                    ? "Many of our menu items, including grilled meats, are prepared right on the grill under the owner's supervision."
                    : "Velká část menu a opékaných mas se připravuje přímo na grilu, pod vedením samotného majitele."}
                </p>
              </article>
            </ScrollReveal>

            <ScrollReveal>
              <article className="about-feature">
                <span className="about-feature-number">04</span>
                <h3>
                  {isEnglish ? "Traditional Favourites" : "Tradiční dobroty"}
                </h3>
                <p>
                  {isEnglish
                    ? "We recommend trying Kabuli palau, stuffed dumplings known as mantu, or juicy meat grilled on a skewer."
                    : "Doporučujeme ochutnat například Kabuli palau, plněné taštičky mantu nebo šťavnaté maso připravované na jehle."}
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
                {isEnglish ? (
                  <>
                    A Place for Good Food,
                    <br />
                    Family and Friends
                  </>
                ) : (
                  <>
                    Místo pro dobré jídlo,
                    <br />
                    rodinu i přátele
                  </>
                )}
              </h2>

              <p>
                {isEnglish
                  ? "We want to create a place you'll love coming back to—for a delicious lunch, a relaxed dinner with family, or a get-together with friends."
                  : "Chceme vytvořit místo, kam se budete rádi vracet. Na dobrý oběd, klidnou večeři s rodinou nebo posezení s přáteli."}
              </p>

              <div className="about-atmosphere-actions">
                <Link to="/jidelni-listek" className="about-button">
                  {isEnglish ? "View Menu" : "Jídelní lístek"}
                </Link>

                <Link
                  to="/rezervace"
                  className="about-button about-button-dark"
                >
                  {isEnglish ? "Book a Table" : "Rezervovat stůl"}
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
