/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.html',
    './src/**/*.vue',
    './src/**/*.jsx',
    // Additional file types that contain Tailwind classes
  ],
  // darkMode: true,
  // darkMode: [true, '[data-mode="dark"]'],
  darkMode: 'class',
  // theme: {
  //     colors: {
  //       'primary': '#3490dc',
  //       'secondary': '#ffed4a',
  //       'danger': '#e3342f',
  //       'dark-page': '#232D45',
  //       'dark': '#28334E',
  //       'light': '#f7fafc',
  //     },
  // },
  // Rest of your TailwindCSS configuration
}