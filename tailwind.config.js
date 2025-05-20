// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <-- this line is essential
  ],
  theme: {
    extend: {
boxShadow: {
        custom: '0 2px 5px -1px rgba(50, 50, 93, 0.25), 0 1px 3px -1px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
