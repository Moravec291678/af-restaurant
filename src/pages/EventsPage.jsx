import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanityClient";
import { eventsQuery } from "../lib/queries";
import { getSanityImageUrl } from "../lib/sanityImage";
import { useLanguage } from "../context/useLanguage";
import "./EventsPage.css";

function EventsPage() {
  const { isEnglish } = useLanguage();
  const [events, setEvents] = useState(null);

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(eventsQuery)
      .then((data) => {
        if (cancelled || !Array.isArray(data)) {
          return;
        }

        const mappedEvents = data.map((event) => ({
          ...event,
          id: event._id,
          image: getSanityImageUrl(event.image),
        }));

        setEvents(mappedEvents);
      })
      .catch((error) => {
        console.error("Sanity events error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const hasEvents = events && events.length > 0;

  return (
    <main className="events-page">
      <div className="container">
        <div className="events-page__inner">
          <header className="events-page__header">
            <div className="events-page__decorative-line" aria-hidden="true" />

            <span className="events-page__eyebrow">NAAN O NAMAK</span>

            <h1 className="events-page__title">
              {isEnglish ? "Events" : "Akce"}
            </h1>

            <p className="events-page__description">
              {isEnglish
                ? "Discover our upcoming events, special evenings, and other occasions where great food meets a welcoming atmosphere."
                : "Objevte naše připravované akce, speciální večery a další příležitosti, při kterých se potkává dobré jídlo a příjemná atmosféra."}
            </p>

            <div className="events-page__decorative-line" aria-hidden="true" />
          </header>

          {hasEvents ? (
            <section
              className="events-page__list"
              aria-label={isEnglish ? "Upcoming events" : "Připravované akce"}
            >
              {events.map((event) => (
                <article className="events-page__event" key={event.id}>
                  {event.image && (
                    <div className="events-page__event-image">
                      <img
                        src={event.image}
                        alt={(isEnglish && event.titleEn) || event.title || ""}
                      />
                    </div>
                  )}

                  <div className="events-page__event-content">
                    <span className="events-page__event-date">
                      {new Date(event.date).toLocaleDateString(
                        isEnglish ? "en-GB" : "cs-CZ",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>

                    <h2 className="events-page__event-title">
                      {(isEnglish && event.titleEn) || event.title}
                    </h2>

                    <p className="events-page__event-description">
                      {(isEnglish && event.descriptionEn) || event.description}
                    </p>

                    <div className="events-page__event-meta">
                      <span>
                        {new Date(event.date).toLocaleTimeString(
                          isEnglish ? "en-GB" : "cs-CZ",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </span>

                      <span>
                        {(isEnglish && event.locationEn) || event.location}
                      </span>
                    </div>

                    <Link
                      to={`/akce/${event.slug}`}
                      className="events-page__event-button"
                    >
                      {isEnglish ? "VIEW DETAILS" : "ZOBRAZIT DETAIL"}
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="events-page__empty">
              <span className="events-page__empty-label">
                {isEnglish ? "CURRENTLY" : "AKTUÁLNĚ"}
              </span>

              <h2 className="events-page__empty-title">
                {isEnglish
                  ? "We don't have any events scheduled at the moment."
                  : "Momentálně nemáme naplánovanou žádnou akci."}
              </h2>

              <p className="events-page__empty-description">
                {isEnglish
                  ? "Planning a celebration, corporate party, wedding, or another event? We can prepare catering featuring traditional Persian and Czech cuisine and help make your gathering special."
                  : "Plánujete oslavu, firemní večírek, svatbu nebo jinou událost? Připravíme pro vás catering s tradiční perskou i českou kuchyní a postaráme se o to, aby vaše setkání bylo výjimečné."}
              </p>

              <Link
                to="/rezervace"
                className="events-page__catering-button"
              >
                {isEnglish ? "ENQUIRE ABOUT CATERING" : "POPTAT CATERING"}
              </Link>
            </section>
          )}

          <footer className="events-page__footer">
            <span className="events-page__footer-line" aria-hidden="true" />

            <p>
              {isEnglish
                ? "We look forward to welcoming you."
                : "Těšíme se na vaši návštěvu."}
            </p>

            <span className="events-page__footer-line" aria-hidden="true" />
          </footer>
        </div>
      </div>
    </main>
  );
}

export default EventsPage;
