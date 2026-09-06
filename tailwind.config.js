/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        desktop: 'rgb(var(--desktop) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        view: 'rgb(var(--view) / <alpha-value>)',
        edge: 'rgb(var(--edge) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        dim: 'rgb(var(--dim) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        danger: 'rgb(var(--danger) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['"Noto Sans"', 'system-ui', 'Segoe UI', 'sans-serif'],
        mono: ['"Noto Sans Mono"', 'ui-monospace', 'Consolas', 'monospace'],
      },
      borderRadius: {
        breeze: '3px',
      },
      animation: {
        fadeIn: 'fadeIn 0.15s ease-out',
        riseIn: 'riseIn 0.25s cubic-bezier(0.2, 0, 0, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-4px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        riseIn: {
          '0%': { opacity: 0, transform: 'translateY(12px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
