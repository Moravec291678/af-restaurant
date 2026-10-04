import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useLanguage } from "../context/useLanguage";

import "./Reservation.css";

function Reservation() {
  const { isEnglish } = useLanguage();
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    setIsSending(true);
    setStatus("");

    try {
      await emailjs.sendForm("service_wibebio", "template_ibcqkrs", form, {
        publicKey: "sfeXmXN7z7_Etpogz",
      });

      form.reset();

      setStatus(isEnglish
        ? "Thank you. Your reservation request has been sent. We will contact you to confirm."
        : "Děkujeme. Vaše žádost o rezervaci byla odeslána. Ozveme se vám s potvrzením.");
    } catch (error) {
      console.error("Reservation error:", error);

      setStatus(isEnglish
        ? "We couldn't send your reservation request. Please try again."
        : "Rezervaci se nepodařilo odeslat. Zkuste to prosím znovu.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="reservation-page">
      <section className="reservation-hero">
        <div className="container">
          <p className="reservation-eyebrow">{isEnglish ? "Reservations" : "Rezervace"}</p>

          <h1>{isEnglish ? "Book your table" : "Rezervujte si svůj stůl"}</h1>

          <p className="reservation-intro">
            {isEnglish
              ? "We look forward to welcoming you. Fill in the details below to request a reservation."
              : "Těšíme se na vaši návštěvu. Vyplňte údaje níže a pošlete nám požadavek na rezervaci."}
          </p>
        </div>
      </section>

      <section className="reservation-section">
        <div className="container">
          <form className="reservation-form" onSubmit={handleSubmit}>
            <div className="reservation-field">
              <label htmlFor="reservation-date">{isEnglish ? "Date" : "Datum"}</label>

              <input id="reservation-date" name="date" type="date" required />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-time">{isEnglish ? "Time" : "Čas"}</label>

              <input id="reservation-time" name="time" type="time" required />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-guests">{isEnglish ? "Guests" : "Počet osob"}</label>

              <select
                id="reservation-guests"
                name="guests"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  {isEnglish ? "Select the number of guests" : "Vyberte počet osob"}
                </option>

                {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => (
                  <option key={count} value={String(count)}>
                    {count} {isEnglish ? (count === 1 ? "guest" : "guests") : count === 1 ? "osoba" : count < 5 ? "osoby" : "osob"}
                  </option>
                ))}
                <option value="11+">{isEnglish ? "11 or more guests" : "11 a více osob"}</option>
              </select>
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-name">{isEnglish ? "Name" : "Jméno"}</label>

              <input
                id="reservation-name"
                name="name"
                type="text"
                placeholder={isEnglish ? "Your name" : "Vaše jméno"}
                autoComplete="name"
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="reservation-phone">{isEnglish ? "Phone" : "Telefon"}</label>

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
                {isEnglish ? "Email" : "E-mail"} <span>({isEnglish ? "optional" : "volitelné"})</span>
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
                {isEnglish ? "Note" : "Poznámka"} <span>({isEnglish ? "optional" : "volitelné"})</span>
              </label>

              <textarea
                id="reservation-note"
                name="note"
                rows="5"
                placeholder={isEnglish ? "For example, a high chair or birthday celebration" : "Například dětská židle, oslava narozenin apod."}
              />
            </div>

            <div className="reservation-submit">
              <button type="submit" disabled={isSending}>
                {isSending ? (isEnglish ? "Sending…" : "Odesílám…") : (isEnglish ? "Send reservation request" : "Odeslat rezervaci")}
              </button>
            </div>

            {status && (
              <p
                className={`reservation-status ${
                  status.includes(isEnglish ? "couldn't" : "nepodařilo") ? "is-error" : "is-success"
                }`}
                role="status"
              >
                {status}
              </p>
            )}
          </form>

          <p className="reservation-note">
            {isEnglish
              ? "Submitting this form sends a reservation request. Your reservation is confirmed only after the restaurant contacts you."
              : "Odesláním formuláře zašlete požadavek na rezervaci. Rezervace bude platná až po jejím potvrzení restaurací."}
          </p>
        </div>
      </section>
    </main>
  );
}

export default Reservation;
