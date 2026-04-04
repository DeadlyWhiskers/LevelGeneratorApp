/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        text: 'var(--text-color)',
        accentGreen: 'var(--accent-green)',
        accentBlue: 'var(--accent-blue)',
        lowColor: 'var(--low-color)',
        lowBackground: 'var(--low-background)',
        mediumColor: 'var(--medium-color)',
        mediumBackground: 'var(--medium-background)',
        highColor: 'var(--high-color)',
        highBackground: 'var(--high-background)',
      }
    },
  },
  plugins: [],
}

