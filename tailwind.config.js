/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      text: 'var(--text)',
      background: 'var(--background)',
      surface: 'var(--surface)',
      primary: 'var(--primary)',
      secondary: 'var(--secondary)',
      transparent: 'transparent',
    }
  },
  plugins: [],
}