/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        makkah: {
          navy: {
            900: '#070F1E',
            800: '#0B192C',
            700: '#0F2137',
            600: '#162A45',
            500: '#1E3A5F',
          },
          emerald: {
            600: '#059669',
            500: '#0D9488',
            400: '#10B981',
            300: '#34D399',
          },
          gold: {
            600: '#D97706',
            500: '#F59E0B',
            400: '#FBBF24',
            100: '#FEF3C7',
          },
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          sand: '#FDFBF7'
        }
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
        readex: ['"Readex Pro"', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0B192C 0%, #0F2137 50%, #162A45 100%)',
        'wave-gradient': 'linear-gradient(90deg, #06B6D4 0%, #8B5CF6 33%, #10B981 66%, #F59E0B 100%)',
        'gold-glow': 'radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(255, 255, 255, 0) 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 25, 44, 0.08)',
        'glass-hover': '0 12px 40px 0 rgba(11, 25, 44, 0.15)',
        'emerald-glow': '0 4px 20px -2px rgba(13, 148, 136, 0.35)',
        'gold-glow': '0 4px 20px -2px rgba(245, 158, 11, 0.35)'
      }
    },
  },
  plugins: [],
}
