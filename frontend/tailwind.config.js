export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D946EF',
        secondary: '#22D3EE',
        tertiary: '#FACC15',
        surface: '#FFFFFF',
        background: '#FAFAFA',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444'
      },
      fontFamily: {
        sans: ['Vazirmatn', 'sans-serif']
      }
    }
  },
  plugins: []
};
