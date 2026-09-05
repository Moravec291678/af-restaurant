import { Link } from "react-router-dom";

import "./EventDetailPage.css";

function EventDetailPage() {
  return (
    <main className="event-detail-page">
      <div className="container">
        <div className="event-detail-page__inner">
          <Link to="/akce" className="event-detail-page__back">
            ← ZPĚT NA AKCE
          </Link>

          <article className="event-detail">
            <div className="event-detail__image">
              <img src={event01} alt="Perský večer" />
            </div>

            <div className="event-detail__content">
              <span className="event-detail__eyebrow">NAAN O NAMAK</span>

              <h1 className="event-detail__title">Perský večer</h1>

              <div className="event-detail__decorative-line" />

              <div className="event-detail__info">
                <div className="event-detail__info-item">
                  <span>DATUM</span>
                  <strong>12. října 2026</strong>
                </div>

                <div className="event-detail__info-item">
                  <span>ČAS</span>
                  <strong>18:00</strong>
                </div>

                <div className="event-detail__info-item">
                  <span>MÍSTO</span>
                  <strong>Naan O Namak</strong>
                </div>
              </div>

              <div className="event-detail__text">
                <h2>O akci</h2>

                <p>
                  Přijďte si užít večer plný tradiční perské kuchyně,
                  autentických chutí a příjemné atmosféry.
                </p>

                <p>
                  Čeká vás výběr tradičních pokrmů připravených s důrazem na
                  kvalitní suroviny a tradiční způsob přípravy.
                </p>
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
