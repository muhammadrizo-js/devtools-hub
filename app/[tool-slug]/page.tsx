import { tools, getToolBySlug, getRelatedTools } from '@/lib/tools'
import { generateJsonLd, generateFaqJsonLd, generateCanonicalUrl } from '@/lib/seo'
import type { Metadata } from 'next'
import Link from 'next/link'
import JsonToYamlConverter from '@/components/tools/JsonToYamlConverter'
import Base64Encode from '@/components/tools/Base64Encode'
import UuidGenerator from '@/components/tools/UuidGenerator'
import TimestampConverter from '@/components/tools/TimestampConverter'
import JwtDecoder from '@/components/tools/JwtDecoder'
import JsonToCsvConverter from '@/components/tools/JsonToCsvConverter'
import YamlToXmlConverter from '@/components/tools/YamlToXmlConverter'
import EnvFormatter from '@/components/tools/EnvFormatter'
import RegexTester from '@/components/tools/RegexTester'
import CronBuilder from '@/components/tools/CronBuilder'
import ExifStripper from '@/components/tools/ExifStripper'

export function generateStaticParams() {
  return tools.map(tool => ({
    'tool-slug': tool.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ 'tool-slug': string }> }): Promise<Metadata> {
  const { 'tool-slug': slug } = await params
  const tool = getToolBySlug(slug)
  
  if (!tool) {
    return {
      title: 'Tool Not Found',
    }
  }

  const canonicalUrl = generateCanonicalUrl(slug)
  
  return {
    title: `${tool.title} - Free Online Developer Tool`,
    description: tool.shortDescription,
    keywords: tool.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${tool.title} - Free Online Developer Tool`,
      description: tool.shortDescription,
      type: 'website',
      url: canonicalUrl,
      siteName: 'DevTools Hub',
    },
    twitter: {
      card: 'summary',
      title: `${tool.title} - Free Online Developer Tool`,
      description: tool.shortDescription,
    },
  }
}

export default async function ToolPage({ params }: { params: Promise<{ 'tool-slug': string }> }) {
  const { 'tool-slug': slug } = await params
  const tool = getToolBySlug(slug)
  
  if (!tool) {
    return (
      <div className="max-w-[1120px] mx-auto text-center py-20">
        <h1 className="text-4xl font-bold text-[#101319] mb-4">Tool Not Found</h1>
        <p className="text-[#667085] mb-8">The tool you are looking for does not exist.</p>
        <Link href="/" className="text-[#3559E0] hover:underline">
          ← Back to all tools
        </Link>
      </div>
    )
  }

  const relatedTools = getRelatedTools(tool.relatedTools)
  const jsonLd = generateJsonLd(tool, slug)
  const faqJsonLd = generateFaqJsonLd(tool)

  return (
    <div className="max-w-[1120px] mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-6 text-sm">
        <Link href="/" className="text-[#667085] hover:text-[#101319] transition-colors">
          Home
        </Link>
        <span className="text-[#667085] mx-2">/</span>
        <span className="text-[#101319]">{tool.title}</span>
      </div>

      <h1 className="text-4xl font-bold mb-2 text-[#101319]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        {tool.title}
      </h1>
      <p className="text-[#667085] mb-8">{tool.shortDescription}</p>

      <div className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-md p-6 mb-8">
        {slug === 'json-to-yaml' ? (
          <JsonToYamlConverter />
        ) : slug === 'base64-encode' ? (
          <Base64Encode />
        ) : slug === 'uuid-generator' ? (
          <UuidGenerator />
        ) : slug === 'timestamp-converter' ? (
          <TimestampConverter />
        ) : slug === 'jwt-decoder' ? (
          <JwtDecoder />
        ) : slug === 'json-to-csv' ? (
          <JsonToCsvConverter />
        ) : slug === 'yaml-to-xml' ? (
          <YamlToXmlConverter />
        ) : slug === 'env-formatter' ? (
          <EnvFormatter />
        ) : slug === 'regex-tester' ? (
          <RegexTester />
        ) : slug === 'cron-builder' ? (
          <CronBuilder />
        ) : slug === 'exif-stripper' ? (
          <ExifStripper />
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">{tool.icon}</div>
            <p className="text-[#667085]">Tool coming soon...</p>
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#101319] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          About this tool
        </h2>
        <p className="text-[#667085] leading-relaxed">{tool.longDescription}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#101319] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {tool.faqs.map((faq, index) => (
            <div key={index} className="bg-[#FFFFFF] border border-[#E4E7EC] rounded-md p-4">
              <h3 className="text-[#101319] font-medium mb-2">{faq.question}</h3>
              <p className="text-[#667085] text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#101319] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Related Tools
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {relatedTools.map(relatedTool => (
            <Link
              key={relatedTool.slug}
              href={`/${relatedTool.slug}`}
              className="block bg-[#FFFFFF] border border-[#E4E7EC] rounded-md p-4 hover:border-[#3559E0] transition-colors"
            >
              <div className="text-2xl mb-2">{relatedTool.icon}</div>
              <h3 className="text-[#101319] font-medium text-sm">{relatedTool.title}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}