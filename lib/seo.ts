import type { Tool } from './tools'

export function generateJsonLd(tool: Tool, slug: string) {
  const baseUrl = 'https://devtools-hub-app.netlify.app'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.title,
    description: tool.shortDescription,
    url: `${baseUrl}/${slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.longDescription,
  }
}

export function generateFaqJsonLd(tool: Tool) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function generateCanonicalUrl(slug: string) {
  const baseUrl = 'https://devtools-hub-app.netlify.app'
  return `${baseUrl}/${slug}`
}