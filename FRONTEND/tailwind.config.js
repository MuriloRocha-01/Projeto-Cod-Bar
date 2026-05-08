/** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./{app,src}/**/*.{js,jsx,ts,tsx}" ,
    "./components/**/*.{js,jsx,ts,tsx}"
  ],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors:{
        background:'#F5F5F7',
        primary:'#F87E2C',
        text_primary:'#F87E2C'
      },
      screens: {
        'mobile': '768px',
        'tablet': '1059px',
      },
      // tailwind.config.js
      fontFamily: {
        sans: ['InstrumentSans', 'sans-serif'],           
        medium: ['InstrumentSans-Medium', 'sans-serif'], 
        semibold: ['InstrumentSans-SemiBold', 'sans-serif'], 
        bold: ['InstrumentSans-Bold', 'sans-serif'],     
      },
    }
  },
  plugins: [],
};
