/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

const generateColorClass = (variable) => {
  return ({ opacityValue }) =>
  opacityValue
    ? `rgba(var(--${variable}), ${opacityValue})`
    : `rgb(var(--${variable}))`
}

const textColor = {
  primary: generateColorClass('text-primary'),
  secondary: generateColorClass('text-secondary'),
  tertiary: generateColorClass('text-tertiary'),
}

const backgroundColor = {
  primary: generateColorClass('bg-primary'),
  secondary: generateColorClass('bg-secondary'),
  tertiary: generateColorClass('bg-tertiary'),
}

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'green-dark': '#1e4c51',
      'green-light': '#e1fdc9',
      'pink': '#efd0ca',
      'orange': '#f78154',
      'grey': '#9eb3c2',
      'white': '#ffffff',
      'gray': colors.gray,
    },
    extend: {
      textColor,
      backgroundColor,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
