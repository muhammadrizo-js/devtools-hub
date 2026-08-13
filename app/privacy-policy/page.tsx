import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - DevTools Hub',
  description: 'Privacy Policy for DevTools Hub. We do not collect, store, or transmit your data. All processing happens in your browser.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#101319] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        Privacy Policy
      </h1>
      
      <p className="text-sm text-[#667085] mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            1. Overview
          </h2>
          <p className="text-[#667085] leading-relaxed">
            DevTools Hub (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our website. Our core principle is simple: <strong className="text-[#101319]">we do not collect, store, or transmit your data.</strong>
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            2. Data Processing Location
          </h2>
          <p className="text-[#667085] leading-relaxed">
            All tool operations (conversions, formatting, generation, decoding) happen entirely in your browser using client-side JavaScript. <strong className="text-[#101319]">Your input data never leaves your device.</strong> We never see, store, or transmit the content you enter into any tool.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            3. What We Collect
          </h2>
          <p className="text-[#667085] leading-relaxed mb-3">
            We collect the minimum amount of data necessary to operate:
          </p>
          <ul className="list-disc pl-6 text-[#667085] space-y-2">
            <li>
              <strong className="text-[#101319]">Analytics:</strong> We use privacy-friendly analytics (Plausible) that uses no cookies and collects no personal data. We only see aggregate numbers like total page views.
            </li>
            <li>
              <strong className="text-[#101319]">Local Storage:</strong> Your browser may store small preferences locally. This data never leaves your device and can be cleared anytime by clearing browser data.
            </li>
            <li>
              <strong className="text-[#101319]">Server Logs:</strong> Our hosting provider (Netlify) may automatically log basic technical data (IP address, user agent, request time) for security and performance monitoring. This is standard practice for all websites.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            4. Cookies
          </h2>
          <p className="text-[#667085] leading-relaxed">
            We do not use tracking cookies. Our analytics provider is cookie-less and GDPR-compliant by design. This means we do not require a cookie consent banner.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            5. Third-Party Services
          </h2>
          <p className="text-[#667085] leading-relaxed mb-3">
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 text-[#667085] space-y-2">
            <li>
              <strong className="text-[#101319]">Netlify</strong> (hosting) — <a href="https://www.netlify.com/privacy/" className="text-[#3559E0] hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </li>
            <li>
              <strong className="text-[#101319]">Plausible</strong> (analytics) — <a href="https://plausible.io/privacy" className="text-[#3559E0] hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            6. Data Sharing
          </h2>
          <p className="text-[#667085] leading-relaxed">
            We do not sell, rent, or share your personal data with any third parties. We do not collect personal data in the first place.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            7. Your Rights (GDPR & CCPA)
          </h2>
          <p className="text-[#667085] leading-relaxed">
            Since we collect no personal data, there is typically nothing to access, delete, or export. If you believe we have any of your data or have questions about your privacy rights, please contact us and we will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            8. Children&apos;s Privacy
          </h2>
          <p className="text-[#667085] leading-relaxed">
            Our services are not directed to children under 13. We do not knowingly collect data from children.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            9. Changes to This Policy
          </h2>
          <p className="text-[#667085] leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            10. Contact
          </h2>
          <p className="text-[#667085] leading-relaxed">
            If you have questions about this Privacy Policy, contact us at: <span className="text-[#101319] font-mono">muhammadrizoumar5@outlook.com</span>
          </p>
        </section>
      </div>
    </div>
  )
}