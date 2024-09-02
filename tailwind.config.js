/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray100: 'var(--gray100)',
        gray200: 'var(--gray200)',
        gray300: 'var(--gray300)',
        gray400: 'var(--gray400)',
        gray500: 'var(--gray500)',
        gray600: 'var(--gray600)',
        gray700: 'var(--gray700)',
        gray800: 'var(--gray800)',
        gray900: 'var(--gray900)',
        gray1000: 'var(--gray1000)',
        'primary-brand': 'var(--primary-bran)',
        'primary-negative': 'var(--primary-negative)',
      },
    },
  },
  plugins: [],
};
