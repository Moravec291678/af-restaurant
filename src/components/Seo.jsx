import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/icons/logo.webp";

const siteUrl = "https://naanonamak.cz";
const brandImageUrl = new URL(logo, siteUrl).href;

const pageMetadata = {
  "/": {
    title: "Naan O Namak – Restaurace v Benicích | Perská kuchyně",
    description:
      "Naan O Namak je restaurace v Praze-Benicích s autentickou perskou a středoasijskou kuchyní. Prohlédněte si jídelní lístek a rezervujte si stůl.",
  },
  "/jidelni-listek": {
    title: "Jídelní lístek – Naan O Namak | Restaurace Benice",
    description:
      "Prohlédněte si jídelní lístek Naan O Namak v Praze-Benicích: perské speciality, mantu, Qabuli Palow a jídla z grilu.",
  },
  "/galerie": {
    title: "Galerie – Naan O Namak | Restaurace Benice",
    description:
      "Nahlédněte do galerie restaurace Naan O Namak v Praze-Benicích a poznejte atmosféru naší perské kuchyně.",
  },
  "/akce": {
    title: "Akce a catering – Naan O Namak | Benice",
    description:
      "Aktuální akce a možnosti cateringu restaurace Naan O Namak v Praze-Benicích.",
  },
  "/o-nas": {
    title: "O Naan O Namak | Perská restaurace v Benicích",
    description:
      "Poznejte Naan O Namak, restauraci v Praze-Benicích s perskou a středoasijskou kuchyní, tradičními recepturami a specialitami z grilu.",
  },
  "/rezervace": {
    title: "Rezervace stolu – Naan O Namak | Benice",
    description:
      "Rezervujte si stůl v restauraci Naan O Namak v Praze-Benicích a vychutnejte si perskou a středoasijskou kuchyni.",
  },
};

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Naan O Namak",
  url: `${siteUrl}/`,
  image: brandImageUrl,
  logo: brandImageUrl,
  telephone: "+420721700777",
  email: "info@naanonamak.cz",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Květnového povstání 21/21",
    addressLocality: "Praha-Benice",
    addressCountry: "CZ",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 50.0137834,
    longitude: 14.6045906,
  },
  servesCuisine: ["Perská kuchyně", "Středoasijská kuchyně"],
  hasMenu: `${siteUrl}/jidelni-listek`,
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "11:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "11:30",
      closes: "22:00",
    },
  ],
};

function setMeta(selector, attribute, value) {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }
  element.setAttribute(attribute, value);
}

function Seo() {
  const { pathname } = useLocation();
  const metadata = pageMetadata[pathname] ?? {
    title: "Stránka nebyla nalezena – Naan O Namak",
    description: "Požadovaná stránka nebyla nalezena.",
  };
  const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;

  useEffect(() => {
    document.title = metadata.title;
    setMeta('meta[name="description"]', "name", "description");
    document.head.querySelector('meta[name="description"]').content = metadata.description;
    setMeta('meta[property="og:title"]', "property", "og:title");
    document.head.querySelector('meta[property="og:title"]').content = metadata.title;
    setMeta('meta[property="og:description"]', "property", "og:description");
    document.head.querySelector('meta[property="og:description"]').content = metadata.description;
    setMeta('meta[property="og:url"]', "property", "og:url");
    document.head.querySelector('meta[property="og:url"]').content = canonicalUrl;
    setMeta('meta[property="og:type"]', "property", "og:type");
    document.head.querySelector('meta[property="og:type"]').content = "website";
    setMeta('meta[property="og:image"]', "property", "og:image");
    document.head.querySelector('meta[property="og:image"]').content = brandImageUrl;
    setMeta('meta[name="twitter:card"]', "name", "twitter:card");
    document.head.querySelector('meta[name="twitter:card"]').content = "summary";
    setMeta('meta[name="twitter:image"]', "name", "twitter:image");
    document.head.querySelector('meta[name="twitter:image"]').content = brandImageUrl;

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;
  }, [canonicalUrl, metadata]);

  return (
    <script type="application/ld+json">{JSON.stringify(restaurantSchema)}</script>
  );
}

export default Seo;
