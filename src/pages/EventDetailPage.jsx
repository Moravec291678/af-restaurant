import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "../lib/sanityClient";
import { eventBySlugQuery } from "../lib/queries";
import { getSanityImageUrl } from "../lib/sanityImage";
import { useLanguage } from "../context/useLanguage";
import "./EventDetailPage.css";

function EventDetailPage() {
  const { slug } = useParams();
  const { isEnglish } = useLanguage();

  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(eventBySlugQuery, { slug })
      .then((data) => {
        if (cancelled) {
          return;
        }

        setEvent(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Sanity event detail error:", error);
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (isLoading) {
    return null;
  }

  if (!event) {
    return (
      <main className="event-detail-page">
        <div className="container">
          <div className="event-detail-page__inner">
            <Link to="/akce" className="event-detail-page__back">
              ← {isEnglish ? "BACK TO EVENTS" : "ZPĚT NA AKCE"}
            </Link>

            <section className="event-detail-page__empty">
              <h1>{isEnglish ? "Event not found" : "Akce nebyla nalezena"}</h1>
              <p>
                {isEnglish
                  ? "This event is no longer available or does not exist."
                  : "Tato akce již není dostupná nebo neexistuje."}
              </p>
            </section>
          </div>
        </div>
      </main>
    );
  }

  const title = (isEnglish && event.titleEn) || event.title;
  const location = (isEnglish && event.locationEn) || event.location;
  const description = (isEnglish && event.descriptionEn) || event.description;
  const content = (isEnglish && event.contentEn) || event.content;

  return (
    <main className="event-detail-page">
      <div className="container">
        <div className="event-detail-page__inner">
          <Link to="/akce" className="event-detail-page__back">
            ← {isEnglish ? "BACK TO EVENTS" : "ZPĚT NA AKCE"}
          </Link>

          <article className="event-detail">
            {event.image && (
              <div className="event-detail__image">
                <img src={getSanityImageUrl(event.image)} alt={title || ""} />
              </div>
            )}

            <div className="event-detail__content">
              <span className="event-detail__eyebrow">NAAN O NAMAK</span>

              <h1 className="event-detail-page__title">{title}</h1>

              <div className="event-detail__decorative-line" />

              <div className="event-detail__info">
                <div className="event-detail__info-item">
                  <span>{isEnglish ? "DATE" : "DATUM"}</span>
                  <strong>
                    {event.date &&
                      new Date(event.date).toLocaleDateString(
                        isEnglish ? "en-GB" : "cs-CZ",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                  </strong>
                </div>

                <div className="event-detail__info-item">
                  <span>{isEnglish ? "TIME" : "ČAS"}</span>
                  <strong>
                    {event.date &&
                      new Date(event.date).toLocaleTimeString(
                        isEnglish ? "en-GB" : "cs-CZ",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )}
                  </strong>
                </div>

                <div className="event-detail__info-item">
                  <span>{isEnglish ? "LOCATION" : "MÍSTO"}</span>
                  <strong>{location}</strong>
                </div>
              </div>

              <div className="event-detail__text">
                <h2>{isEnglish ? "About the Event" : "O akci"}</h2>

                {description && <p>{description}</p>}

                {content && <PortableText value={content} />}
              </div>

              <div className="event-detail__cta">
                <h2>
                  {isEnglish
                    ? "Interested in attending?"
                    : "Máte zájem o účast?"}
                </h2>

                <p>
                  {isEnglish
                    ? "Reserve your place or contact us with any questions about this event."
                    : "Rezervujte si své místo nebo nás kontaktujte s dotazem k této akci."}
                </p>

                <Link to="/rezervace" className="event-detail__button">
                  {isEnglish ? "RESERVE YOUR PLACE" : "REZERVOVAT MÍSTO"}
                </Link>
              </div>
            </div>
          </article>

          <div className="event-detail-page__footer">
            <span />
            <p>
              {isEnglish
                ? "We look forward to welcoming you."
                : "Těšíme se na vaši návštěvu."}
            </p>
            <span />
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventDetailPage;
