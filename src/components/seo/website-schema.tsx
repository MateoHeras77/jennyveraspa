export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.jennyveraspa.com/#website",
    "url": "https://www.jennyveraspa.com",
    "name": "Jenny Vera Spa",
    "inLanguage": ["es-EC", "en"],
    "publisher": { "@id": "https://www.jennyveraspa.com" },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
