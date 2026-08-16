#  DevTools Hub

Free browser-based developer tools. No signup. No tracking. Your data never leaves your device.

**Live:** [https://devtools-hub-app.netlify.app](https://devtools-hub-app.netlify.app)

---

## Features

- 11+ working developer tools
- 100% client-side processing (no backend, no data storage)
- Google Analytics integration with cookie consent banner
- SEO-optimized (sitemap, robots.txt, JSON-LD structured data)
- Fully responsive design (mobile + desktop)
- Legal pages (Privacy Policy + Terms of Service)
- Custom favicon

---

## Tools Included

| Tool | Description |
|------|-------------|
| JSON to YAML Converter | Convert JSON to YAML format |
| JSON to CSV Converter | Convert JSON arrays to CSV |
| Base64 Encode/Decode | Encode or decode Base64 strings |
| UUID Generator | Generate UUID v4 identifiers |
| Unix Timestamp Converter | Convert timestamps to readable dates |
| JWT Decoder | Decode JWT tokens and inspect claims |
| Regex Tester | Test regex patterns with highlighting |
| Cron Expression Builder | Build cron expressions visually |
| .env File Formatter | Format and validate .env files |
| YAML to XML Converter | Convert YAML to XML format |
| EXIF Metadata Stripper | Remove hidden metadata from photos |

---

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Deployed on Netlify

---

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Run `npm run dev`
4. Visit `http://localhost:3000`

---

## Deploy to Netlify

1. Push to GitHub
2. Import repo in Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Click Deploy

---

## Google Analytics Setup

The site uses Google Analytics with a cookie consent banner.

To change the GA ID:

1. Open `components/CookieConsent.tsx`
2. Replace `G-2Z2H1QHS05` with your own Measurement ID

---

## Google Search Console

The site is verified with Google Search Console.

To change verification:

1. Open `app/layout.tsx`
2. Replace the `google` verification code with your own

---

## Project Structure
devtools-hub/
├── app/
│ ├── [tool-slug]/ # Dynamic tool pages
│ ├── privacy-policy/ # Privacy Policy
│ ├── terms-of-service/ # Terms of Service
│ ├── layout.tsx # Root layout
│ ├── page.tsx # Homepage
│ ├── sitemap.ts # SEO sitemap
│ └── robots.ts # Robots.txt
├── components/
│ ├── tools/ # Individual tool components
│ ├── Header.tsx
│ ├── Footer.tsx
│ └── CookieConsent.tsx # GDPR cookie banner
├── lib/
│ ├── tools.ts # Tool registry
│ └── seo.ts # SEO utilities
└── public/ # Static assets

text

---

## License

Private. Contact for purchase/licensing.