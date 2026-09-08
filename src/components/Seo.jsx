import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import logo from "../assets/icons/logo.webp";

import { sanityClient } from "../lib/sanityClient";
import { restaurantSettingsQuery } from "../lib/queries";

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

const dayMap = {
  Po: "Monday",
  Út: "Tuesday",
  St: "Wednesday",
  Čt: "Thursday",
  Pá: "Friday",
  So: "Saturday",
  Ne: "Sunday",
};

function getOpeningHoursSpecification(openingHours = []) {
  return openingHours.flatMap((hours) => {
    if (!hours?.day || !hours?.open || !hours?.close) {
      return [];
    }

    const day = hours.day.trim();

    if (day.includes("–") || day.includes("-") || day.includes("—")) {
      const normalizedDay = day
        .replaceAll("—", "–")
        .replaceAll("-", "–")
        .split("–")
        .map((value) => value.trim());

      if (normalizedDay.length !== 2) {
        return [];
      }

      const [from, to] = normalizedDay;

      const orderedDays = ["Po", "Út", "St", "Čt", "Pá", "So", "Ne"];
      const fromIndex = orderedDays.indexOf(from);
      const toIndex = orderedDays.indexOf(to);

      if (fromIndex === -1 || toIndex === -1 || fromIndex > toIndex) {
        return [];
      }

      return [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: orderedDays
            .slice(fromIndex, toIndex + 1)
            .map((item) => dayMap[item]),
          opens: hours.open,
          closes: hours.close,
        },
      ];
    }

    const schemaDay = dayMap[day];

    if (!schemaDay) {
      return [];
    }

    return [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [schemaDay],
        opens: hours.open,
        closes: hours.close,
      },
    ];
  });
}

function normalizeTelephone(phone) {
  if (!phone) {
    return undefined;
  }

  const trimmedPhone = phone.trim();

  if (trimmedPhone.startsWith("+")) {
    return trimmedPhone.replace(/\s+/g, "");
  }

  const digits = trimmedPhone.replace(/\D/g, "");

  if (digits.length === 9) {
    return `+420${digits}`;
  }

  return trimmedPhone;
}

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
  const [settings, setSettings] = useState(null);

  const metadata = pageMetadata[pathname] ?? {
    title: "Stránka nebyla nalezena – Naan O Namak",
    description: "Požadovaná stránka nebyla nalezena.",
  };

  const canonicalUrl = `${siteUrl}${pathname === "/" ? "/" : pathname}`;

  useEffect(() => {
    let cancelled = false;

    sanityClient
      .fetch(restaurantSettingsQuery)
      .then((data) => {
        if (cancelled) {
          return;
        }

        setSettings(data);
      })
      .catch((error) => {
        console.error("Sanity restaurant settings error:", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.title = metadata.title;

    setMeta('meta[name="description"]', "name", "description");
    document.head.querySelector('meta[name="description"]').content =
      metadata.description;

    setMeta('meta[property="og:title"]', "property", "og:title");
    document.head.querySelector('meta[property="og:title"]').content =
      metadata.title;

    setMeta('meta[property="og:description"]', "property", "og:description");
    document.head.querySelector('meta[property="og:description"]').content =
      metadata.description;

    setMeta('meta[property="og:url"]', "property", "og:url");
    document.head.querySelector('meta[property="og:url"]').content =
      canonicalUrl;

    setMeta('meta[property="og:type"]', "property", "og:type");
    document.head.querySelector('meta[property="og:type"]').content = "website";

    setMeta('meta[property="og:image"]', "property", "og:image");
    document.head.querySelector('meta[property="og:image"]').content =
      brandImageUrl;

    setMeta('meta[name="twitter:card"]', "name", "twitter:card");
    document.head.querySelector('meta[name="twitter:card"]').content =
      "summary";

    setMeta('meta[name="twitter:image"]', "name", "twitter:image");
    document.head.querySelector('meta[name="twitter:image"]').content =
      brandImageUrl;

    let canonical = document.head.querySelector('link[rel="canonical"]');

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = canonicalUrl;
  }, [canonicalUrl, metadata]);

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",

    name: settings?.name || undefined,

    url: `${siteUrl}/`,

    image: brandImageUrl,
    logo: brandImageUrl,

    telephone: normalizeTelephone(settings?.phone),

    email: settings?.email || undefined,

    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address?.line1 || undefined,
      addressLocality: settings?.address?.line2 || undefined,
      addressCountry: "CZ",
    },

    geo: {
      "@type": "GeoCoordinates",
      latitude: 50.0137834,
      longitude: 14.6045906,
    },

    servesCuisine: ["Perská kuchyně", "Středoasijská kuchyně"],

    hasMenu: `${siteUrl}/jidelni-listek`,

    openingHoursSpecification: getOpeningHoursSpecification(
      settings?.openingHours,
    ),
  };

  return (
    <script type="application/ld+json">
      {JSON.stringify(restaurantSchema)}
    </script>
  );
}

export default Seo;
