/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FBFBFA',
        charcoal: '#1A1A1A',
        sage: '#6E7F6B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        editorial: '0 20px 60px rgba(26, 26, 26, 0.08)',
      },
    },
  },
  plugins: [],
};