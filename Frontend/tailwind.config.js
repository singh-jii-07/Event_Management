/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#7C3AED",
          secondary: "#06B6D4",
          accent: "#F59E0B",
          bg: "#0F172A",
          card: "#111827",
          surface: "#1E293B",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        display: ["Outfit", "Inter", "ui-sans-serif"],
      },
      backgroundImage: {
        "gradient-brand": "linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)",
        "gradient-warm": "linear-gradient(135deg, #7C3AED 0%, #F59E0B 100%)",
        "gradient-dark": "linear-gradient(180deg, #0F172A 0%, #111827 100%)",
        "mesh-hero":
          "radial-gradient(at 40% 20%, #7C3AED33 0px, transparent 50%), radial-gradient(at 80% 0%, #06B6D433 0px, transparent 50%), radial-gradient(at 0% 50%, #F59E0B22 0px, transparent 50%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-left": "slideInLeft 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "marquee": "marquee 25s linear infinite",
        "counter": "counter 2s ease-out forwards",
        "shimmer": "shimmer 1.5s infinite",
        "loader-ring": "loaderRing 1.5s ease-in-out infinite",
        "bounce-soft": "bounceSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px #7C3AED66" },
          "50%": { boxShadow: "0 0 40px #7C3AED99, 0 0 80px #06B6D433" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        loaderRing: {
          "0%": { transform: "rotate(0deg) scale(1)" },
          "50%": { transform: "rotate(180deg) scale(1.05)" },
          "100%": { transform: "rotate(360deg) scale(1)" },
        },
        bounceSoft: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        glow: "0 0 20px #7C3AED66",
        "glow-cyan": "0 0 20px #06B6D466",
        "glow-amber": "0 0 20px #F59E0B66",
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(124,58,237,0.3)",
      },
    },
  },
  plugins: [],
};