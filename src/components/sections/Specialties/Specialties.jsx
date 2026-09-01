import "./Specialties.css";

import qabuliPalow from "../../../assets/images/menu/qabuliPalow.png";
import mantu from "../../../assets/images/menu/mantu.png";
import pro2Osoby from "../../../assets/images/menu/pro2Osoby.png";

function Specialties() {
  const specialties = [
    {
      id: "qabuli-palow",
      name: "Qabuli Palow",
      description:
        "Dušená rýže Basmati s rozinkami a mrkví dle výběru masa, se směsí zeleniny v rajčatové omáčce.",
      price: "299 Kč",
      image: qabuliPalow,
      imageAlt: "Qabuli Palow",
    },
    {
      id: "mantu",
      name: "Mantu",
      description:
        "Plněné taštičky s mletým hovězím masem a cibulí vařené v páře, navrchu hrách v rajčatové omáčce, čerstvé bylinky a jogurt s česnekem.",
      price: "199 Kč",
      image: mantu,
      imageAlt: "Mantu",
    },
    {
      id: "mix-grill-2",
      name: "Mix Grill pro 2 osoby",
      description:
        "Kuřecí, jehněčí a hovězí špízy, jehněčí kotlety, placky, salát, čatní, grilovaná zelenina, turshi a hranolky.",
      price: "599 Kč",
      image: pro2Osoby,
      imageAlt: "Mix Grill pro 2 osoby",
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
                <img
                  src={specialty.image}
                  alt={specialty.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
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
          <a href="/jidelni-listek" className="specialties__button">
            Více o specialitách
          </a>
        </div>
      </div>
    </section>
  );
}

export default Specialties;
