import Link from 'next/link'
import { tools } from '@/lib/tools'

export default function Footer() {
  return (
    <footer className="border-t border-[#E4E7EC] bg-[#FAFAFA] mt-auto">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-[#101319] font-semibold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              DevTools Hub
            </h3>
            <p className="text-sm text-[#667085] leading-relaxed">
              Free, privacy-focused developer tools. 
              All processing happens in your browser.
            </p>
          </div>
          
          <div>
            <h3 className="text-[#101319] font-semibold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-[#667085] hover:text-[#101319] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-[#667085] hover:text-[#101319] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#101319] font-semibold mb-4" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
              Tools
            </h3>
            <ul className="space-y-2">
              {tools.slice(0, 6).map(tool => (
                <li key={tool.slug}>
                  <Link href={`/${tool.slug}`} className="text-sm text-[#667085] hover:text-[#101319] transition-colors">
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-[#E4E7EC] mt-8 pt-8 text-center">
          <p className="text-xs text-[#667085]">
            © {new Date().getFullYear()} DevTools Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}