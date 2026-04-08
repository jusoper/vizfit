import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern Fitness Palette
        'off-white': '#e3e3e3',
        'orange-primary': '#e95623',
        'navy-dark': '#0d1846',
        'blue-secondary': '#406eb7',
        
        // Text & Backgrounds
        'text-primary': '#0d1846',
        'text-secondary': '#406eb7',
        'bg-light': '#e3e3e3',
        
        // Neutral colors
        'neutral-white': '#FFFFFF',
        
        // Legacy support
        'primary-blue': '#406eb7',
        'primary-blue-light': '#e3e3e3',
        'primary-blue-dark': '#0d1846',
        'accent-orange': '#e95623',
        'accent-orange-light': '#f5e6d3',
        'accent-orange-dark': '#d64512',
        'dark-blue': '#0d1846',
        primary: '#0d1846',
        secondary: '#e95623',
      },
    },
  },
  plugins: [],
}
export default config
