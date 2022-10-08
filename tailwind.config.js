/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['"Fredoka One"', 'cursive'],
        nabla: ['Nabla', 'cursive'],
        noto: ['"Noto Sans Mono"', 'monospace'],
      },
    },
    plugins: [],
  },
};
