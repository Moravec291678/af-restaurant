import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { PortableText } from "@portabletext/react";

import { sanityClient } from "../lib/sanityClient";
import { eventBySlugQuery } from "../lib/queries";
import { getSanityImageUrl } from "../lib/sanityImage";

import "./EventDetailPage.css";

function EventDetailPage() {
  const { slug } = useParams();
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
              ← ZPĚT NA AKCE
            </Link>

            <section className="event-detail-page__empty">
              <h1>Akce nebyla nalezena</h1>
              <p>Tato akce již není dostupná nebo neexistuje.</p>
            </section>
          </div>
        </div>
      </main>
    );
  }
  return (
    <main className="event-detail-page">
      <div className="container">
        <div className="event-detail-page__inner">
          <Link to="/akce" className="event-detail-page__back">
            ← ZPĚT NA AKCE
          </Link>

          <article className="event-detail">
            {event?.image && (
              <div className="event-detail__image">
                <img src={getSanityImageUrl(event.image)} alt={event.title} />
              </div>
            )}

            <div className="event-detail__content">
              <span className="event-detail__eyebrow">NAAN O NAMAK</span>

              <h1 className="event-detail-page__title">{event?.title}</h1>

              <div className="event-detail__decorative-line" />

              <div className="event-detail__info">
                <div className="event-detail__info-item">
                  <span>DATUM</span>
                  <strong>
                    {event?.date &&
                      new Date(event.date).toLocaleDateString("cs-CZ", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                  </strong>
                </div>

                <div className="event-detail__info-item">
                  <span>ČAS</span>
                  <strong>
                    {event?.date &&
                      new Date(event.date).toLocaleTimeString("cs-CZ", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </strong>
                </div>

                <div className="event-detail__info-item">
                  <span>MÍSTO</span>
                  <strong>{event?.location}</strong>
                </div>
              </div>

              <div className="event-detail__text">
                <h2>O akci</h2>

                {event?.description && <p>{event.description}</p>}

                {event?.content && <PortableText value={event.content} />}
              </div>

              <div className="event-detail__cta">
                <h2>Máte zájem o účast?</h2>

                <p>
                  Rezervujte si své místo nebo nás kontaktujte s dotazem k této
                  akci.
                </p>

                <Link to="/rezervace" className="event-detail__button">
                  REZERVOVAT MÍSTO
                </Link>
              </div>
            </div>
          </article>

          <div className="event-detail-page__footer">
            <span />
            <p>Těšíme se na vaši návštěvu.</p>
            <span />
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventDetailPage;
