import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import event01 from "../assets/images/event01.jpg";

import "./EventsPage.css";

const events = [
  {
    id: 1,
    slug: "afghansky-vecer",
    date: "12. října 2026",
    time: "18:00",
    title: "Afghánský večer",
    description: "Večer plný tradiční afghánské kuchyně a příjemné atmosféry.",
    image: event01,
    location: "Naan O Namak",
    price: "Cena bude upřesněna",
    details: "Přijďte si užít večer plný tradičních afghánských chutí.",
  },
];

function EventsPage() {
  const hasEvents = events.length > 0;

  return (
    <main className="events-page">
      <div className="container">
        <div className="events-page__inner">
          <header className="events-page__header">
            <div className="events-page__decorative-line" aria-hidden="true" />

            <span className="events-page__eyebrow">NAAN O NAMAK</span>

            <h1 className="events-page__title">Akce</h1>

            <p className="events-page__description">
              Objevte naše připravované akce, speciální večery a další
              příležitosti, při kterých se potkává dobré jídlo a příjemná
              atmosféra.
            </p>

            <div className="events-page__decorative-line" aria-hidden="true" />
          </header>

          {hasEvents ? (
            <section
              className="events-page__list"
              aria-label="Připravované akce"
            >
              {events.map((event) => (
                <article className="events-page__event" key={event.id}>
                  {event.image && (
                    <div className="events-page__event-image">
                      <img src={event.image} alt={event.title} />
                    </div>
                  )}

                  <div className="events-page__event-content">
                    <span className="events-page__event-date">
                      {event.date}
                    </span>

                    <h2 className="events-page__event-title">{event.title}</h2>

                    <p className="events-page__event-description">
                      {event.description}
                    </p>

                    <div className="events-page__event-meta">
                      <span>{event.time}</span>
                      <span>{event.location}</span>
                    </div>

                    <Link
                      to={`/akce/${event.slug}`}
                      className="events-page__event-button"
                    >
                      ZOBRAZIT DETAIL
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          ) : (
            <section className="events-page__empty">
              <span className="events-page__empty-label">AKTUÁLNĚ</span>

              <h2 className="events-page__empty-title">
                Momentálně nemáme naplánovanou žádnou akci.
              </h2>

              <p className="events-page__empty-description">
                Plánujete oslavu, firemní večírek, svatbu nebo jinou událost?
                Připravíme pro vás catering s tradiční afghánskou kuchyní a
                postaráme se o to, aby vaše setkání bylo výjimečné.
              </p>

              <HashLink
                smooth
                to="/#kontakt"
                className="events-page__catering-button"
              >
                POPTAT CATERING
              </HashLink>
            </section>
          )}

          <footer className="events-page__footer">
            <span className="events-page__footer-line" aria-hidden="true" />

            <p>Těšíme se na vaši návštěvu.</p>

            <span className="events-page__footer-line" aria-hidden="true" />
          </footer>
        </div>
      </div>
    </main>
  );
}

export default EventsPage;
