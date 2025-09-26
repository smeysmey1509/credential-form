/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms'
import scrollbar from 'tailwind-scrollbar'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                soft: "0px 6px 16px 2px rgba(0,0,0,0.05)",
            },
            colors: {
                dark: {
                    DEFAULT: '#19191C',
                },
            },
        },
    },
    plugins: [forms, scrollbar],
}
