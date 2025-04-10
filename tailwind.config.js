/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cereal', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Open Sans', 'Helvetica Neue', 'sans-serif'],
      },
      colors: {
        gray: {
          25: 'rgb(252, 252, 253)',
          50: 'rgb(249, 250, 251)',
          100: 'rgb(243, 244, 246)',
          200: 'rgb(229, 231, 235)',
          300: 'rgb(210, 214, 219)',
          400: 'rgb(157, 164, 174)',
          500: 'rgb(108, 115, 127)',
          600: 'rgb(77, 87, 97)',
          700: 'rgb(56, 66, 80)',
          800: 'rgb(31, 41, 55)',
          900: 'rgb(17, 24, 39)',
        }
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin-slow 3s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      }
    },
  },
  plugins: [],
};