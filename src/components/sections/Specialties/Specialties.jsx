import { useEffect, useState } from "react";

import "./Specialties.css";

import { sanityClient } from "../../../lib/sanityClient";
import { menuItemsQuery } from "../../../lib/queries";
import { getSanityImageUrl } from "../../../lib/sanityImage";
import { useLanguage } from "../../../context/useLanguage";

function Specialties() {
  const { isEnglish } = useLanguage();
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(menuItemsQuery)
      .then((data) => {
        if (cancelled || !Array.isArray(data)) {
          return;
        }

        setSpecialties(data.filter((item) => item.showAsSpecialty).slice(0, 3));
      })
      .catch((error) => {
        console.error("Sanity specialties error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="specialties" id="speciality">
      <div className="container">
        <div className="specialties__header">
          <h2 className="specialties__title">
            <span aria-hidden="true">—</span>
            {isEnglish ? "Our Specialties" : "Naše speciality"}
            <span aria-hidden="true">—</span>
          </h2>
        </div>

        <div className="specialties__grid">
          {specialties.map((specialty) => {
            const imageUrl = getSanityImageUrl(specialty.image);

            return (
              <article className="specialties__card" key={specialty._id}>
                <div className="specialties__image">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={(isEnglish && specialty.imageAltEn) || (isEnglish && specialty.nameEn) || specialty.imageAlt || specialty.name}
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>

                <div className="specialties__content">
                  <h3 className="specialties__name">
                    {isEnglish && specialty.nameEn
                      ? specialty.nameEn
                      : specialty.name}
                  </h3>

                  <p className="specialties__description">
                    {isEnglish && specialty.descriptionEn
                      ? specialty.descriptionEn
                      : specialty.description}
                  </p>

                  <span className="specialties__price">
                    {specialty.price != null
                      ? `${specialty.price} ${isEnglish ? "CZK" : "Kč"}`
                      : (() => {
                          const variantPrices = specialty.variants
                            ?.map((variant) => variant.price)
                            .filter((price) => price != null);

                          return variantPrices?.length
                            ? `${isEnglish ? "from" : "od"} ${Math.min(...variantPrices)} ${isEnglish ? "CZK" : "Kč"}`
                            : "";
                        })()}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <div className="specialties__action">
          <a href="/jidelni-listek" className="specialties__button">
            {isEnglish ? "Discover More Specialties" : "Více o specialitách"}
          </a>
        </div>
      </div>
    </section>
  );
}

export default Specialties;
