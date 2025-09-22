/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Merriweather"', "sans-serif"],
        serif: ['"EB Garamond"', "serif"],
      },
      colors: {
        'primary': '#5D4037',      // 濃い茶色
        'accent': '#C89B3F',       // 金色
        'background': '#F5EFE6',   // 羊皮紙
        'muted': '#E0DACE',       // 背景より少し濃い
        'main': '#1A1A1A',         // ほぼ黒
        'text-secondary': '#6B4F4F',// 少し赤みがかった茶色

        'white': '#FFFFFF',
        'border': '#D7CFC3',       // ボーダー
        'success': '#4CAF50',
        'warning': '#FFA726',
        'info': '#2196F3',
        'error': '#D32F2F',
      },
    },
  },
  plugins: [],
};
