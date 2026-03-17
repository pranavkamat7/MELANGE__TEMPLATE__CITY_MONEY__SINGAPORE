import { useEffect } from 'react';

export function SEOSchema() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Mélange Digital",
      "url": "https://melangedigital.com",
      "logo": "https://melangedigital.com/logo.png",
      "description": "Digital marketing agency in Singapore specializing in SEO, Google Ads, and conversion optimization for Singapore businesses.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Singapore",
        "addressRegion": "Singapore",
        "addressCountry": "SG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "25.2048",
        "longitude": "55.2708"
      },
      "areaServed": [
        {
          "@type": "City",
          "name": "Singapore"
        },
        {
          "@type": "Country",
          "name": "Singapore"
        }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/melange-digital",
        "https://www.instagram.com/melangedigital"
      ]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Digital Marketing Agency",
      "provider": {
        "@type": "Organization",
        "name": "Mélange Digital"
      },
      "areaServed": {
        "@type": "City",
        "name": "Singapore",
        "containedIn": {
          "@type": "Country",
          "name": "Singapore"
        }
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Digital Marketing Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "SEO Services Singapore",
              "description": "Sustainable rankings, technical optimisation, and high-intent organic traffic for long-term authority."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Google Ads Management Singapore",
              "description": "Performance campaigns structured to deliver qualified leads and measurable commercial return."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Conversion Optimization",
              "description": "Landing pages, funnels, and tracking frameworks designed to transform traffic into pipeline value."
            }
          }
        ]
      }
    };

    // FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much does SEO cost in Singapore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Pricing varies based on competition, scope, and growth objectives, with proposals aligned to realistic timelines and measurable outcomes."
          }
        },
        {
          "@type": "Question",
          "name": "How fast can results appear?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Paid acquisition can generate leads quickly, while SEO builds momentum over several months depending on competitiveness."
          }
        },
        {
          "@type": "Question",
          "name": "Do you manage Google Ads?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Campaigns are structured for qualified lead generation, cost efficiency, and measurable return."
          }
        },
        {
          "@type": "Question",
          "name": "Why hire a Singapore-focused partner instead of an offshore team?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Local execution ensures cultural understanding, regulatory awareness, and strategies aligned with real Singaporean buyer behaviour."
          }
        },
        {
          "@type": "Question",
          "name": "Do you provide reporting?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Every engagement includes transparent tracking and clear performance reporting."
          }
        }
      ]
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Mélange Digital - Digital Marketing Agency Singapore",
      "image": "https://melangedigital.com/logo.png",
      "description": "Leading digital marketing agency in Singapore specializing in SEO, Google Ads, and conversion optimization. Generate qualified leads and scale your business in the Singapore market.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Singapore",
        "addressRegion": "Singapore",
        "addressCountry": "SG"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "1.290270",
        "longitude": "103.851959"
      },
      "url": "https://melangedigital.com/singapore",
      "priceRange": "$$",
      "openingHours": "Mo-Fr 09:00-18:00"
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://melangedigital.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Singapore",
          "item": "https://melangedigital.com/singapore"
        }
      ]
    };

    // Inject all schemas
    const schemas = [
      organizationSchema,
      serviceSchema,
      faqSchema,
      localBusinessSchema,
      breadcrumbSchema
    ];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schema);
      script.id = `schema-${index}`;
      document.head.appendChild(script);
    });

    // Cleanup function
    return () => {
      schemas.forEach((_, index) => {
        const script = document.getElementById(`schema-${index}`);
        if (script) {
          document.head.removeChild(script);
        }
      });
    };
  }, []);

  return null;
}
