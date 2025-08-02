import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        cordovanChalkTheme: {
          primary: '#f0efed', //chalk

          'primary-content': '#141414',

          secondary: '#a17e60', //chamoisee

          'secondary-content': '#090503',

          accent: '#8c4853', //cordovan

          'accent-content': '#e9d9da',

          neutral: '#f0efcd',

          'neutral-content': '#14140f',

          'base-100': '#f0efed',

          'base-200': '#d1d0ce',

          'base-300': '#b2b1b0',

          'base-content': '#141414',

          info: '#2563ed',

          'info-content': '#d2e2ff',

          success: '#16a34a',

          'success-content': '#000a02',

          warning: '#fbbf24',

          'warning-content': '#150d00',

          error: '#be123c',

          'error-content': '#f8d5d6',
        },
      },
      {
        brownPinkRoseTheme: {
          primary: '#1c1917',

          'primary-content': '#cccbcb',

          secondary: '#f5e3e0',

          'secondary-content': '#151212',

          accent: '#d282a6',

          'accent-content': '#10060a',

          neutral: '#292524',

          'neutral-content': '#d0cece',

          'base-100': '#1c1917',

          'base-200': '#171412',

          'base-300': '#12100e',

          'base-content': '#cccbcb',

          info: '#3b82f6',

          'info-content': '#010615',

          success: '#10b981',

          'success-content': '#000d06',

          warning: '#facc15',

          'warning-content': '#150f00',

          error: '#9f1239',

          'error-content': '#f1d2d4',
        },
      },
    ],
    darkTheme: 'brownPinkRoseTheme',
    styled: true,
  },
};
