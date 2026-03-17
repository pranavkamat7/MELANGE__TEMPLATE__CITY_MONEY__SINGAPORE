/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        melange: {
          'dark': '#0B0B12',
          'darker': '#0F172A',
          'purple': '#B44CFF',
          'blue': '#5A7CFF',
          'pink': '#E879F9',
          'muted': '#94A3B8',
          'dark-muted': '#3f3f46',
          'near-black': '#1a1a1a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      maxWidth: {
        'container': '1400px',
      },
      spacing: {
        'section-mobile': '8rem',
        'section-desktop': '12rem',
      },
      backgroundImage: {
        'gradient-melange': 'linear-gradient(to right, #B44CFF, #5A7CFF)',
        'gradient-melange-full': 'linear-gradient(to right, #E879F9, #B44CFF, #5A7CFF)',
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
