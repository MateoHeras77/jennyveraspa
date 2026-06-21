import { CONTACT_PHONE_E164 } from "@/lib/constants";

type ServiceFaqItem = {
  question: string;
  answer: string;
};

type ServiceSchemaProps = {
  name: string;
  description: string;
  image: string;
  url: string;
  category: string;
};

const PROVIDER = {
  "@type": "HealthAndBeautyBusiness",
  name: "Jenny Vera Spa",
  "@id": "https://www.jennyveraspa.com",
  telephone: CONTACT_PHONE_E164,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Manuel de J. Calle y Paucarbamba, Edificio Plaza Médica 4to piso",
    addressLocality: "Cuenca",
    addressRegion: "Azuay",
    addressCountry: "EC",
  },
};

const AREA_SERVED = {
  "@type": "City",
  name: "Cuenca",
  containedInPlace: {
    "@type": "AdministrativeArea",
    name: "Azuay, Ecuador",
  },
};

export function ServiceSchema({ name, description, image, url, category }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: category,
    name,
    description,
    image: [image],
    url,
    provider: PROVIDER,
    areaServed: AREA_SERVED,
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: CONTACT_PHONE_E164,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

type FaqSchemaProps = {
  items: ServiceFaqItem[];
};

export function FaqSchema({ items }: FaqSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
