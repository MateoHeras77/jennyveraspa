import {
  CONTACT_PHONE_E164,
  GOOGLE_REVIEW_URL,
  SOCIAL_FACEBOOK_URL,
  SOCIAL_INSTAGRAM_URL,
  SOCIAL_TIKTOK_URL,
} from "@/lib/constants";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Jenny Vera Spa",
    "image": "https://www.jennyveraspa.com/image2.webp",
    "@id": "https://www.jennyveraspa.com",
    "url": "https://www.jennyveraspa.com",
    "telephone": CONTACT_PHONE_E164,
    "priceRange": "$$",
    "currenciesAccepted": "USD",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Manuel de J. Calle y Paucarbamba, Edificio Plaza Médica 4to piso",
      "addressLocality": "Cuenca",
      "addressRegion": "Azuay",
      "addressCountry": "EC"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -2.9001,
      "longitude": -79.0059
    },
    "areaServed": {
      "@type": "City",
      "name": "Cuenca",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Azuay, Ecuador"
      }
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "13:00"
      }
    ],
    "sameAs": [
      SOCIAL_INSTAGRAM_URL,
      SOCIAL_FACEBOOK_URL,
      SOCIAL_TIKTOK_URL,
      GOOGLE_REVIEW_URL
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
