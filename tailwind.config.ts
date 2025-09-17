import type { Config } from 'tailwindcss'

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        bronze: '#6a451f',
        gold: '#c7ab78',
        cream: '#F5F5DC',
        charcoal: '#2F2F2F',
        blackish: '#0A0A0A'
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace']
      },
      boxShadow: {
        gold: '0 8px 16px rgba(199, 171, 120, 0.15)'
      }
    }
  },
  plugins: []
} satisfies Config
