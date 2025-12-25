/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada en Mario Party 3 - Tonos amarillos y cálidos
        primary: '#FFD700',      // Amarillo dorado
        secondary: '#FFA500',    // Naranja
        accent: '#FFEB3B',       // Amarillo brillante
        warm: '#FF8C00',         // Naranja oscuro
        sunny: '#FFC107',        // Ámbar
        golden: '#FFB300',       // Amarillo dorado oscuro
        dark: '#4A2C2A',         // Marrón oscuro
        light: '#FFF9E6',        // Crema claro
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s infinite',
      }
    },
  },
  plugins: [],
}
