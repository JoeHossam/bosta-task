/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{ts,tsx}',
        './components/**/*.{ts,tsx}',
        './app/**/*.{ts,tsx}',
        './src/**/*.{ts,tsx}',
    ],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: {
                border: 'hsl(var(--border))',
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                },
            },
        },
    },
    variants: {
        extend: {
            display: ["group-hover"],
        },
    },
    plugins: [require('tailwindcss-dir')()],
};
