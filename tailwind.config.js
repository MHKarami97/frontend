/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        vazir: ['Vazirmatn', 'sans-serif'],
      },
      colors: {
        primary: { DEFAULT: '#D946EF', hover: '#C026D3', active: '#A21CAF', light: '#FDF4FF' },
        secondary: { DEFAULT: '#22D3EE' },
        accent: { DEFAULT: '#FACC15' },
        surface: { DEFAULT: '#FFFFFF', bg: '#FAFAFA', offset: '#F5F5F5' },
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 4px 12px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 6px rgba(0,0,0,0.07), 0 10px 25px rgba(217,70,239,0.12)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
}
