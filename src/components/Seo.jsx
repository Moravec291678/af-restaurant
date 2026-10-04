import { useEffect, useMemo, useState } from "react";

import { useLocation } from "react-router-dom";

import logo from "../assets/icons/logo.webp";

import { sanityClient } from "../lib/sanityClient";
import { eventBySlugQuery, restaurantSettingsQuery } from "../lib/queries";
import { useLanguage } from "../context/useLanguage";

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

const pageMetadataEn = {
  "/": { title: "Naan O Namak | Persian Restaurant in Benice, Prague", description: "Discover authentic Persian and Central Asian cuisine at Naan O Namak in Prague-Benice. Explore our menu and book a table." },
  "/jidelni-listek": { title: "Menu | Naan O Namak Restaurant, Benice", description: "Explore our menu in Prague-Benice, from mantu and Qabuli Palow to grilled specialties." },
  "/galerie": { title: "Gallery | Naan O Namak Restaurant, Benice", description: "Explore the Naan O Namak gallery and discover our restaurant and Persian cuisine in Prague-Benice." },
  "/akce": { title: "Events and Catering | Naan O Namak, Benice", description: "Upcoming events and catering at Naan O Namak restaurant in Prague-Benice." },
  "/o-nas": { title: "About Us | Naan O Namak Persian Restaurant", description: "Meet Naan O Namak, serving Persian and Central Asian cuisine, traditional recipes and grilled specialties in Prague-Benice." },
  "/rezervace": { title: "Book a Table | Naan O Namak, Benice", description: "Book a table at Naan O Namak in Prague-Benice and enjoy Persian and Central Asian cuisine." },
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
  const { isEnglish } = useLanguage();
  const [settings, setSettings] = useState(null);
  const [event, setEvent] = useState(null);

  const eventSlug = pathname.startsWith("/akce/")
    ? pathname.replace("/akce/", "")
    : "";

  const metadata = useMemo(
    () =>
      event
        ? {
            title: `${(isEnglish && event.titleEn) || event.title} – Naan O Namak | Benice`,
            description:
              (isEnglish && event.descriptionEn) || event.description ||
              (isEnglish
                ? `Join us for ${event.titleEn || event.title} at Naan O Namak in Prague-Benice.`
                : `Přijďte na akci ${event.title} v restauraci Naan O Namak v Praze-Benicích.`),
          }
        : ((isEnglish ? pageMetadataEn[pathname] : pageMetadata[pathname]) ?? {
            title: isEnglish ? "Page not found | Naan O Namak" : "Stránka nebyla nalezena – Naan O Namak",
            description: isEnglish ? "The requested page could not be found." : "Požadovaná stránka nebyla nalezena.",
          }),
    [event, pathname, isEnglish],
  );

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
    if (!eventSlug) {
      setEvent(null);
      return;
    }

    let cancelled = false;

    sanityClient
      .fetch(eventBySlugQuery, { slug: eventSlug })
      .then((data) => {
        if (!cancelled) {
          setEvent(data);
        }
      })
      .catch((error) => {
        console.error("Sanity event SEO error:", error);
        if (!cancelled) {
          setEvent(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [eventSlug]);

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
  }, [canonicalUrl, metadata, isEnglish]);

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
