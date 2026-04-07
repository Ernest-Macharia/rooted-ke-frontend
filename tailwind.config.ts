/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary
        "rooted-green": "#0F3D33",
        "rooted-green-light": "#164d40",
        // Secondary
        "ocean-teal": "#1F6F6B",
        "ocean-teal-light": "#237872",
        // Neutrals
        "savannah-sand": "#D6C2A8",
        "savannah-sand-light": "#EDE4D8",
        "savannah-sand-dark": "#C4AD90",
        // Accents
        "safari-gold": "#C59A3D",
        "clay-earth": "#A75B2C",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(to bottom, rgba(15,61,51,0.3) 0%, rgba(15,61,51,0.7) 100%)",
        "card-gradient": "linear-gradient(to top, rgba(15,61,51,0.95) 0%, rgba(15,61,51,0.4) 60%, transparent 100%)",
        "sand-grain": "url('/textures/grain.png')",
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-in": "slideIn 0.6s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};