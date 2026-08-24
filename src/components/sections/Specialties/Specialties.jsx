import "./Specialties.css";
import plov from "../../../assets/images/plov.webp";
import fish from "../../../assets/images/fish.webp";
import baklava from "../../../assets/images/baklava.jpg";
function Specialties() {
  const specialties = [
    {
      id: "kabuli-pulao",
      name: "Kabuli Pulao",
      description:
        "Tradiční afghánská rýže basmati s jemným masem, mrkví, rozinkami a voňavým kořením.",
      price: "239 Kč",
      image: plov,
      imageAlt: "Kabuli Pulao",
    },
    {
      id: "mantu",
      name: "Mantú",
      description:
        "Domácí taštičky plněné mletým masem, podávané s česnekovým jogurtem a mátou.",
      price: "209 Kč",
      image: fish,
      imageAlt: "Mantú",
    },
    {
      id: "chapli-kebab",
      name: "Chapli Kebab",
      description:
        "Tradiční afghánský kebab z mletého hovězího masa s bylinkami a výrazným kořením.",
      price: "229 Kč",
      image: baklava,
      imageAlt: "Chapli Kebab",
    },
  ];

  return (
    <section className="specialties" id="speciality">
      <div className="container">
        <div className="specialties__header">
          <h2 className="specialties__title">
            <span aria-hidden="true">—</span>
            Naše speciality
            <span aria-hidden="true">—</span>
          </h2>
        </div>

        <div className="specialties__grid">
          {specialties.map((specialty) => (
            <article className="specialties__card" key={specialty.id}>
              <div className="specialties__image">
                {specialty.image && (
                  <img
                    src={specialty.image}
                    alt={specialty.imageAlt}
                    loading="lazy"
                    decoding="async"
                  />
                )}
              </div>

              <div className="specialties__content">
                <h3 className="specialties__name">{specialty.name}</h3>

                <p className="specialties__description">
                  {specialty.description}
                </p>

                <span className="specialties__price">{specialty.price}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="specialties__action">
          <a href="/speciality" className="specialties__button">
            Více o specialitách
          </a>
        </div>
      </div>
    </section>
  );
}

export default Specialties;
