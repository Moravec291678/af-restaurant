import "./Reviews.css";
import { useEffect, useState } from "react";

import { sanityClient } from "../../../lib/sanityClient";
import { reviewsQuery } from "../../../lib/queries";

function Reviews() {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(reviewsQuery)
      .then((data) => {
        if (cancelled || !Array.isArray(data)) {
          return;
        }

        setReviews(data);
      })
      .catch((error) => {
        console.error("Sanity reviews error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <div className="reviews__inner">
        <div className="reviews__heading">
          <span className="reviews__eyebrow">Hodnocení hostů</span>

          <h2 id="reviews-title">Co říkají naši hosté</h2>

          <p>
            Vaše zkušenost je pro nás důležitá. Podívejte se, jak Naan O Namak
            hodnotí naši hosté na Googlu.
          </p>
        </div>

        <div className="reviews__list">
          {reviews?.map((review) => (
            <article className="reviews__item" key={review._id}>
              <div
                className="reviews__stars"
                aria-label={`${review.rating} z 5 hvězdiček`}
              >
                {"★".repeat(review.rating)}
              </div>

              <blockquote>{review.text}</blockquote>

              <span className="reviews__author">{review.author}</span>
            </article>
          ))}
        </div>

        <a
          className="reviews__button"
          href="https://www.google.com/search?sca_esv=d828f12b9a7e1c3b&hl=cs&authuser=2&sxsrf=APpeQntUpRI2fZkox_8NiqTyy0vE-MooAQ:1788729405476&q=Naan+o+namak&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-__HHGlApLwNP7hBPRwS1Iyq6DdBnDQ3JzDCMs3kyFxBfe4oaX93RZojIttt4gVddB8qcq2Y%3D&uds=AJ5uw1_7EAqmJ7zsMe1k38DnpC_vxzjmvhETpKd3UReB-1z5rqCSy-zkecr1tqRCqr6bGKu-wgEB93tua7NlGuqg28YMC45jpi_qDzfbv7jlPWMvNG0BKco&sa=X&ved=2ahUKEwia3b-m8NqWAxViFBAIHf62FuAQ3PALegQIFRAE&biw=1920&bih=945&dpr=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Zobrazit další recenze
        </a>
      </div>
    </section>
  );
}

export default Reviews;
