import { useState } from "react";
import emailjs from "@emailjs/browser";

import "./Reservation.css";

function Reservation() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSending(true);
    setStatus("");

    try {
      await emailjs.sendForm(
        "service_webibio",
        "template_ibcgkrs",
        event.currentTarget,
        {
          publicKey: "sfeXmXN7z7_Etpogz",
        },
      );

      event.currentTarget.reset();

      setStatus(
        "Děkujeme. Vaše žádost o rezervaci byla odeslána. Ozveme se vám s potvrzením.",
      );
    } catch (error) {
      console.error("Reservation error:", error);

      setStatus("Rezervaci se nepodařilo odeslat. Zkuste to prosím znovu.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="reservation-page">
      <section className="reservation-hero">
        <div className="container">
          <p className="reservation-eyebrow">Rezervace</p>

          <h1>Rezervujte si svůj stůl</h1>

          <p className="reservation-intro">
            Těšíme se na vaši návštěvu. Vyplňte údaje níže a pošlete nám
            požadavek na rezervaci.
          </p>
        </div>
      </section>

      <section className="reservation-section">
        <div className="container">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="reservation-field">
              <label htmlFor="reservation-date">Datum</label>

              <input id="reservation-date" name="date" type="date" required />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-time">Čas</label>

              <input id="reservation-time" name="time" type="time" required />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-guests">Počet osob</label>

              <select
                id="reservation-guests"
                name="guests"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Vyberte počet osob
                </option>

                <option value="1">1 osoba</option>
                <option value="2">2 osoby</option>
                <option value="3">3 osoby</option>
                <option value="4">4 osoby</option>
                <option value="5">5 osob</option>
                <option value="6">6 osob</option>
                <option value="7">7 osob</option>
                <option value="8">8 osob</option>
                <option value="9">9 osob</option>
                <option value="10">10 osob</option>
                <option value="11+">11 a více osob</option>
              </select>
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-name">Jméno</label>

              <input
                id="reservation-name"
                name="name"
                type="text"
                placeholder="Vaše jméno"
                autoComplete="name"
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-phone">Telefon</label>

              <input
                id="reservation-phone"
                name="phone"
                type="tel"
                placeholder="+420"
                autoComplete="tel"
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-email">
                E-mail <span>(volitelné)</span>
              </label>

              <input
                id="reservation-email"
                name="email"
                type="email"
                placeholder="vas@email.cz"
                autoComplete="email"
              />
            </div>

            <div className="reservation-field reservation-field-full">
              <label htmlFor="reservation-note">
                Poznámka <span>(volitelné)</span>
              </label>

              <textarea
                id="reservation-note"
                name="note"
                rows="5"
                placeholder="Například dětská židle, oslava narozenin apod."
              />
            </div>

            <div className="reservation-submit">
              <button type="submit" disabled={isSending}>
                {isSending ? "Odesílám…" : "Odeslat rezervaci"}
              </button>
            </div>

            {status && (
              <p
                className={`reservation-status ${
                  status.includes("nepodařilo") ? "is-error" : "is-success"
                }`}
                role="status"
              >
                {status}
              </p>
            )}
          </form>

          <p className="reservation-note">
            Odesláním formuláře zašlete požadavek na rezervaci. Rezervace bude
            platná až po jejím potvrzení restaurací.
          </p>
        </div>
      </section>
    </main>
  );
}

export default Reservation;
