export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Jenny Vera Spa",
    "image": "https://www.jennyveraspa.com/placeholder.png",
    "@id": "https://www.jennyveraspa.com",
    "url": "https://www.jennyveraspa.com",
    "telephone": "+593900000000",
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
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
