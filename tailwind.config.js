module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  plugins: [require('daisyui')],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // or your preferred color
      }
    }
  },
};