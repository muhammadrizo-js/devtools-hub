export interface Tool {
  slug: string
  title: string
  shortDescription: string
  longDescription: string
  icon: string
  category: 'converters' | 'generators' | 'validators' | 'testers' | 'decoders'
  seoKeywords: string[]
  faqs: { question: string; answer: string }[]
  relatedTools: string[]
  color: string
}

export const tools: Tool[] = [
  {
    slug: 'json-to-yaml',
    title: 'JSON to YAML Converter',
    shortDescription: 'Convert JSON to YAML instantly, free and online',
    longDescription: 'Convert JSON data to YAML format instantly. This tool runs entirely in your browser - your data never leaves your device. Perfect for developers working with configuration files, Docker Compose, Kubernetes manifests, or any YAML-based system.',
    icon: '🔄',
    category: 'converters',
    seoKeywords: ['json to yaml', 'convert json yaml', 'json yaml converter', 'json to yaml online'],
    faqs: [
      {
        question: 'Is my JSON data secure?',
        answer: 'Yes. All conversion happens in your browser using JavaScript. Your data never leaves your device and is never sent to any server.'
      },
      {
        question: 'Can I convert large JSON files?',
        answer: 'Yes, but browser performance may vary. For files over 10MB, we recommend using a local development tool.'
      },
      {
        question: 'Is this tool free to use?',
        answer: 'Yes, completely free. No signup required, no usage limits.'
      }
    ],
    relatedTools: ['json-to-csv', 'yaml-to-xml', 'base64-encode'],
    color: '#F5A623'
  },
  {
    slug: 'json-to-csv',
    title: 'JSON to CSV Converter',
    shortDescription: 'Convert JSON to CSV format instantly',
    longDescription: 'Convert JSON arrays to CSV format. Perfect for exporting data for Excel, Google Sheets, or any spreadsheet application. All processing happens in your browser.',
    icon: '📊',
    category: 'converters',
    seoKeywords: ['json to csv', 'convert json csv', 'json csv converter', 'json to excel'],
    faqs: [
      {
        question: 'Does this support nested JSON?',
        answer: 'This tool works best with flat JSON arrays. Nested objects will be flattened with dot notation.'
      },
      {
        question: 'Can I open the CSV in Excel?',
        answer: 'Yes, the generated CSV is compatible with Excel, Google Sheets, and other spreadsheet software.'
      }
    ],
    relatedTools: ['json-to-yaml', 'yaml-to-xml', 'base64-encode'],
    color: '#F5A623'
  },
  {
    slug: 'uuid-generator',
    title: 'UUID Generator',
    shortDescription: 'Generate UUID v4 identifiers instantly',
    longDescription: 'Generate random UUID v4 identifiers for your applications. Supports bulk generation for testing and development. All generation happens locally in your browser.',
    icon: '🔑',
    category: 'generators',
    seoKeywords: ['uuid generator', 'generate uuid', 'uuid v4 generator', 'random uuid'],
    faqs: [
      {
        question: 'What is a UUID?',
        answer: 'A UUID (Universally Unique Identifier) is a 128-bit number used to identify information in computer systems. Version 4 UUIDs are randomly generated.'
      },
      {
        question: 'Are these UUIDs truly unique?',
        answer: 'UUID v4 uses random generation. The probability of collision is extremely low (2^122 possible combinations).'
      }
    ],
    relatedTools: ['timestamp-converter', 'base64-encode', 'jwt-decoder'],
    color: '#34D399'
  },
  {
    slug: 'timestamp-converter',
    title: 'Unix Timestamp Converter',
    shortDescription: 'Convert Unix timestamps to readable dates',
    longDescription: 'Convert Unix timestamps to human-readable dates and vice versa. Supports timezone-aware conversions. Essential for debugging APIs and database timestamps.',
    icon: '⏰',
    category: 'converters',
    seoKeywords: ['unix timestamp converter', 'epoch converter', 'timestamp to date', 'date to timestamp'],
    faqs: [
      {
        question: 'What is a Unix timestamp?',
        answer: 'A Unix timestamp is the number of seconds since January 1, 1970 (UTC). It is widely used in programming and databases.'
      },
      {
        question: 'Does this handle timezones?',
        answer: 'Yes, you can convert timestamps to any timezone. The tool defaults to your local timezone.'
      }
    ],
    relatedTools: ['uuid-generator', 'base64-encode', 'jwt-decoder'],
    color: '#38BDF8'
  },
  {
    slug: 'base64-encode',
    title: 'Base64 Encode/Decode',
    shortDescription: 'Encode or decode Base64 strings instantly',
    longDescription: 'Encode text to Base64 or decode Base64 strings back to text. Useful for working with APIs, data URIs, and basic obfuscation. All processing happens in your browser.',
    icon: '🔐',
    category: 'converters',
    seoKeywords: ['base64 encoder', 'base64 decoder', 'base64 encode decode', 'base64 online'],
    faqs: [
      {
        question: 'Is Base64 encryption?',
        answer: 'No, Base64 is encoding, not encryption. It can be easily decoded. Do not use it for sensitive data.'
      },
      {
        question: 'Does this support Unicode?',
        answer: 'Yes, the tool handles Unicode characters correctly using UTF-8 encoding.'
      }
    ],
    relatedTools: ['jwt-decoder', 'timestamp-converter', 'uuid-generator'],
    color: '#A78BFA'
  },
  {
    slug: 'jwt-decoder',
    title: 'JWT Decoder',
    shortDescription: 'Decode JWT tokens and inspect claims',
    longDescription: 'Decode JWT (JSON Web Token) headers and payloads. Inspect claims, expiration times, and signatures. All decoding happens locally - your tokens never leave your browser.',
    icon: '🎫',
    category: 'decoders',
    seoKeywords: ['jwt decoder', 'decode jwt', 'jwt token decoder', 'jwt viewer'],
    faqs: [
      {
        question: 'Is it safe to paste JWT tokens?',
        answer: 'Yes, decoding happens entirely in your browser. Your tokens are never sent to any server. However, do not share tokens publicly as they may contain sensitive information.'
      },
      {
        question: 'What are JWT tokens?',
        answer: 'JWT (JSON Web Token) is a compact, URL-safe means of representing claims between parties. Commonly used for authentication in web applications.'
      }
    ],
    relatedTools: ['base64-encode', 'timestamp-converter', 'json-to-yaml'],
    color: '#FBBF24'
  },
  {
    slug: 'regex-tester',
    title: 'Regex Tester',
    shortDescription: 'Test regular expressions with live highlighting',
    longDescription: 'Test regular expressions against sample text with live match highlighting. Supports all JavaScript regex features. Perfect for debugging patterns before using them in code.',
    icon: '🔍',
    category: 'testers',
    seoKeywords: ['regex tester', 'regex test online', 'regular expression tester', 'regex matcher'],
    faqs: [
      {
        question: 'What regex flavor does this use?',
        answer: 'This uses JavaScript regular expressions. Most common patterns work across languages, but some advanced features may differ.'
      },
      {
        question: 'Are my regex patterns saved?',
        answer: 'No, everything is processed in your browser. Nothing is saved or transmitted.'
      }
    ],
    relatedTools: ['cron-builder', 'base64-encode', 'env-formatter'],
    color: '#F472B6'
  },
  {
    slug: 'cron-builder',
    title: 'Cron Expression Builder',
    shortDescription: 'Build cron expressions visually',
    longDescription: 'Create cron expressions with a visual builder. See human-readable descriptions of your schedule. Supports standard cron syntax with 5 or 6 fields.',
    icon: '📅',
    category: 'generators',
    seoKeywords: ['cron expression builder', 'cron generator', 'crontab generator', 'cron schedule'],
    faqs: [
      {
        question: 'What is a cron expression?',
        answer: 'A cron expression is a string that defines a schedule for automated tasks. It consists of fields for minute, hour, day, month, and day of week.'
      },
      {
        question: 'Does this support 6-field cron?',
        answer: 'Yes, it supports both standard 5-field and extended 6-field (with seconds) cron expressions.'
      }
    ],
    relatedTools: ['timestamp-converter', 'regex-tester', 'uuid-generator'],
    color: '#38BDF8'
  },
  {
    slug: 'env-formatter',
    title: '.env File Formatter',
    shortDescription: 'Format and validate .env files',
    longDescription: 'Format and validate .env files. Check for syntax errors, duplicate keys, and common mistakes. Essential for managing environment variables in your projects.',
    icon: '🔧',
    category: 'validators',
    seoKeywords: ['env file formatter', 'env validator', 'format env file', 'environment variables'],
    faqs: [
      {
        question: 'What is a .env file?',
        answer: 'A .env file stores environment variables for your application. It contains key-value pairs used for configuration.'
      },
      {
        question: 'Does this check for security issues?',
        answer: 'Yes, it flags common issues like missing values, duplicate keys, and potential secret exposure.'
      }
    ],
    relatedTools: ['json-to-yaml', 'yaml-to-xml', 'regex-tester'],
    color: '#4ADE80'
  },
  {
    slug: 'yaml-to-xml',
    title: 'YAML to XML Converter',
    shortDescription: 'Convert YAML to XML format',
    longDescription: 'Convert YAML data to XML format. Useful for working with APIs that require XML, configuration migration, or data transformation. All conversion happens in your browser.',
    icon: '📄',
    category: 'converters',
    seoKeywords: ['yaml to xml', 'convert yaml xml', 'yaml xml converter', 'yaml to xml online'],
    faqs: [
      {
        question: 'Does this preserve comments?',
        answer: 'No, comments in YAML are not preserved during conversion to XML, as XML comments use a different syntax.'
      },
      {
        question: 'Can I convert back from XML to YAML?',
        answer: 'Yes, we have a companion tool for that. Check the related tools below.'
      }
    ],
    relatedTools: ['json-to-yaml', 'env-formatter', 'json-to-csv'],
    color: '#FF6B6B'
  },
  {
    slug: 'exif-stripper',
    title: 'EXIF Metadata Stripper',
    shortDescription: 'Remove hidden metadata from photos instantly',
    longDescription: 'Remove hidden EXIF metadata from your photos. See GPS coordinates, camera model, timestamp, and other embedded data before stripping it. Perfect for privacy before sharing photos online. All processing happens in your browser.',
    icon: '📸',
    category: 'validators',
    seoKeywords: ['exif stripper', 'remove metadata from photo', 'exif remover', 'photo metadata remover', 'strip gps from photo'],
    faqs: [
      {
        question: 'Is my image uploaded to any server?',
        answer: 'No. All processing happens in your browser using the File API and Canvas API. Your image never leaves your device.'
      },
      {
        question: 'What metadata is removed?',
        answer: 'All embedded metadata including GPS location, camera model, timestamp, software info, and other EXIF data. The visual quality of the image is preserved.'
      },
      {
        question: 'Does this work with phone photos?',
        answer: 'Yes. Most phone photos contain GPS coordinates and device info. This tool removes all of it before you share online.'
      }
    ],
    relatedTools: ['base64-encode', 'env-formatter', 'regex-tester'],
    color: '#F472B6'
  }
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug)
}

export function getRelatedTools(slugs: string[]): Tool[] {
  return slugs.map(slug => getToolBySlug(slug)).filter(Boolean) as Tool[]
}