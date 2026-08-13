import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - DevTools Hub',
  description: 'Terms of Service for DevTools Hub. Free developer tools provided as-is with no warranty.',
}

export default function TermsOfServicePage() {
  return (
    <div className="max-w-[1120px] mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-[#101319] mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
        Terms of Service
      </h1>
      
      <p className="text-sm text-[#667085] mb-8">
        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
      </p>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            1. Acceptance of Terms
          </h2>
          <p className="text-[#667085] leading-relaxed">
            By accessing or using DevTools Hub (&quot;the Service&quot;), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            2. Description of Service
          </h2>
          <p className="text-[#667085] leading-relaxed">
            DevTools Hub provides free, browser-based developer utilities including format converters, generators, validators, and testers. All tools process data locally in your browser — no data is transmitted to our servers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            3. Acceptable Use
          </h2>
          <p className="text-[#667085] leading-relaxed mb-3">
            You agree not to:
          </p>
          <ul className="list-disc pl-6 text-[#667085] space-y-2">
            <li>Attempt to disrupt, overload, or attack the Service</li>
            <li>Scrape or bulk download content without permission</li>
            <li>Use the Service for any illegal or unauthorized purpose</li>
            <li>Attempt to reverse engineer or exploit the Service</li>
            <li>Resell or redistribute the Service without authorization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            4. Disclaimer of Warranties
          </h2>
          <p className="text-[#667085] leading-relaxed">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not guarantee that the Service will be error-free, uninterrupted, or secure.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            5. Limitation of Liability
          </h2>
          <p className="text-[#667085] leading-relaxed">
            To the maximum extent permitted by law, DevTools Hub shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or data, arising from your use of the Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            6. Intellectual Property
          </h2>
          <p className="text-[#667085] leading-relaxed">
            The Service and its original content, features, and functionality are owned by DevTools Hub and are protected by applicable intellectual property laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            7. Changes to the Service
          </h2>
          <p className="text-[#667085] leading-relaxed">
            We reserve the right to modify, suspend, or discontinue any part of the Service at any time without notice.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            8. Changes to These Terms
          </h2>
          <p className="text-[#667085] leading-relaxed">
            We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            9. Governing Law
          </h2>
          <p className="text-[#667085] leading-relaxed">
            These Terms shall be governed by the laws of the Republic of Uzbekistan, without regard to conflict of law principles.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[#101319] mb-3" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
            10. Contact
          </h2>
          <p className="text-[#667085] leading-relaxed">
            If you have questions about these Terms, contact us at: <span className="text-[#101319] font-mono">your-email@gmail.com</span>
          </p>
        </section>
      </div>
    </div>
  )
}