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
  corePlugins: {
    preflight: false,
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
