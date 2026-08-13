import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-[#E4E7EC] bg-[#FAFAFA] sticky top-0 z-50">
      <nav className="max-w-[1120px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-[#101319]" style={{ fontFamily: 'var(--font-space-grotesk)' }}>
          <span className="text-[#3559E0]">&lt;/&gt;</span> DevTools Hub
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            href="/#all-tools" 
            className="text-sm text-[#667085] hover:text-[#101319] transition-colors"
          >
            All Tools
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-sm text-[#667085] hover:text-[#101319] transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms-of-service" 
            className="text-sm text-[#667085] hover:text-[#101319] transition-colors"
          >
            Terms
          </Link>
        </div>
      </nav>
    </header>
  )
}