/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // this enables toggling dark mode via a 'dark' class
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                dark: {
                    DEFAULT: '#19191C', // now you can use `bg-dark` and `dark:bg-dark`
                },
            },
        },
    },
    plugins: [],
}
