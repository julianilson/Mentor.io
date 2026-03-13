
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: '#0F766E',
                    DEFAULT: '#14B8A6',
                    light: '#CCFBF1',
                    50: '#F0FDFA',
                },
                accent: {
                    DEFAULT: '#F59E0B',
                    hover: '#D97706',
                },
                surface: {
                    DEFAULT: '#FAFAF8',
                    alt: '#F3F4F6',
                },
                text: {
                    main: '#1A1A2E',
                    body: '#4A4A5A',
                    muted: '#8A8A9A',
                },
                success: '#10B981',
                error: '#EF4444',
                border: '#E8E8E4',
            },
            fontFamily: {
                heading: ['"DM Sans"', 'sans-serif'],
                sans: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'warm': '0 10px 25px -5px rgba(26, 26, 46, 0.05), 0 8px 10px -6px rgba(26, 26, 46, 0.01)',
                'warm-lg': '0 20px 25px -5px rgba(26, 26, 46, 0.05), 0 8px 10px -6px rgba(26, 26, 46, 0.01)',
            }
        },
    },
    plugins: [],
}
