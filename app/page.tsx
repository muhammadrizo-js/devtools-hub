import { tools } from '@/lib/tools'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DevTools Hub - Free Browser-Based Developer Tools',
  description: 'Free, fast, privacy-focused developer tools. JSON converters, regex tester, UUID generator, and more. No signup required.',
  alternates: {
    canonical: 'https://devtools-hub.vercel.app',
  },
  openGraph: {
    title: 'DevTools Hub - Free Browser-Based Developer Tools',
    description: 'Free, fast, privacy-focused developer tools. No signup. No tracking. Your data never leaves your device.',
    type: 'website',
    url: 'https://devtools-hub.vercel.app',
    siteName: 'DevTools Hub',
  },
  twitter: {
    card: 'summary',
    title: 'DevTools Hub - Free Browser-Based Developer Tools',
    description: 'Free, fast, privacy-focused developer tools. No signup. No tracking.',
  },
}

export default function HomePage() {
  const categories = ['converters', 'generators', 'validators', 'testers', 'decoders']
  
  return (
    <div className="max-w-[1120px] mx-auto px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DevTools Hub',
            description: 'Free, fast, privacy-focused developer tools. No signup required.',
            url: 'https://devtools-hub.vercel.app',
          })
        }}
      />

      <section className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#101319]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          Free Developer Tools
        </h1>
        <p className="text-lg text-[#667085] max-w-2xl mx-auto leading-relaxed">
          Fast, private, browser-based utilities for developers. 
          No signup. No tracking. Your data never leaves your device.
        </p>
      </section>

      <section id="all-tools" className="py-8">
        {categories.map(category => (
          <div key={category} className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-[#101319] capitalize" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              {category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools
                .filter(tool => tool.category === category)
                .map(tool => (
                  <Link 
                    key={tool.slug} 
                    href={`/${tool.slug}`}
                    className="block bg-[#FFFFFF] border border-[#E4E7EC] rounded-md p-6 hover:border-[#3559E0] transition-colors group"
                  >
                    <div className="text-2xl mb-3">{tool.icon}</div>
                    <h3 className="text-lg font-semibold text-[#101319] mb-2 group-hover:text-[#3559E0] transition-colors" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
                      {tool.title}
                    </h3>
                    <p className="text-sm text-[#667085] leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}