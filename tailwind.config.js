/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: '#F5F5F5',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
