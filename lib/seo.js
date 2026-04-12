/**
 * SEO Configuration & Helper Functions
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://phonghoaphat.com';
const SITE_NAME = 'Phong Hòa Phát';
const SITE_DESCRIPTION = 'Phong Hòa Phát cung cấp vật tư khai thác mủ cao su: chén hứng mủ, máng chắn mưa, phụ kiện chuẩn chất lượng.';
const SITE_KEYWORDS = 'vật tư cao su, chén hứng mủ, máng chắn mưa, phụ kiện cao su, khai thác mủ, tiêu chuẩn ISO';

export const defaultSEO = {
  title: `${SITE_NAME} — Vật tư ngành cao su`,
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  url: SITE_URL,
  siteName: SITE_NAME,
  locale: 'vi_VN',
  image: `${SITE_URL}/og-image.jpg`,
  type: 'website',
};

/**
 * Generate Open Graph Meta Tags
 */
export const generateOGTags = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = 'website',
} = {}) => {
  return {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': type,
    'og:site_name': SITE_NAME,
    'og:locale': 'vi_VN',
    'twitter:card': 'summary_large_image',
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': image,
  };
};

/**
 * Generate Structured Data Schema (JSON-LD)
 */
export const generateStructuredData = (type, data = {}) => {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseSchema,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+84-908-093-598',
          contactType: 'Sales',
        },
        sameAs: [
          'https://www.facebook.com/phonghoaphat',
          'https://www.youtube.com/@phonghoaphat',
        ],
        ...data,
      };

    case 'LocalBusiness':
      return {
        ...baseSchema,
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        image: `${SITE_URL}/logo.png`,
        url: SITE_URL,
        telephone: '+84-908-093-598',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'VN',
        },
        ...data,
      };

    case 'Product':
      return {
        ...baseSchema,
        name: data.name || 'Sản phẩm',
        description: data.description || SITE_DESCRIPTION,
        image: data.image || `${SITE_URL}/og-image.jpg`,
        url: data.url || SITE_URL,
        brand: {
          '@type': 'Brand',
          name: SITE_NAME,
        },
        offers: {
          '@type': 'Offer',
          url: data.url || SITE_URL,
          priceCurrency: 'VND',
          price: data.price || '0',
          availability: 'https://schema.org/InStock',
        },
        ...data,
      };

    case 'BreadcrumbList':
      return {
        ...baseSchema,
        itemListElement: data.items?.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `${SITE_URL}${item.url}`,
        })) || [],
        ...data,
      };

    case 'FAQPage':
      return {
        ...baseSchema,
        mainEntity: data.faqs?.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })) || [],
        ...data,
      };

    default:
      return baseSchema;
  }
};

/**
 * Generate canonical URL
 */
export const getCanonicalUrl = (path = '/') => {
  return `${SITE_URL}${path === '/' ? '' : path}`.replace(/\/$/, '') || SITE_URL;
};

/**
 * Format date for schema
 */
export const formatDateISO = (date) => {
  if (!date) return new Date().toISOString();
  return new Date(date).toISOString();
};

export default {
  defaultSEO,
  generateOGTags,
  generateStructuredData,
  getCanonicalUrl,
  formatDateISO,
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
};