import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d1d5db",
          200: "#9ca3af",
          300: "#6b7280",
          400: "#374151",
          500: "#143041", // Base color
          600: "#0f2433",
          700: "#0c1b26",
          800: "#08111a",
          900: "#04090e",
        },
        secondary: {
          100: "#c5d7df",
          200: "#91acb9",
          300: "#5e8092",
          400: "#2a546c",
          500: "#214f5f", // Base color
          600: "#1a3d4b",
          700: "#142c38",
          800: "#0d1a24",
          900: "#070d12",
        },
        accent: {
          100: "#fdd8c5",
          200: "#fab18b",
          300: "#f78a51",
          400: "#f46318",
          500: "#e2773a", // Base color
          600: "#b25e2e",
          700: "#823622",
          800: "#511e16",
          900: "#21070a",
        },
        highlight: {
          100: "#fff3d7",
          200: "#ffe3a5",
          300: "#ffd373",
          400: "#ffc241",
          500: "#ffcb68", // Base color
          600: "#cc9f53",
          700: "#99733e",
          800: "#664729",
          900: "#332413",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e0e0e0",
          300: "#bdbdbd",
          400: "#9e9e9e",
          500: "#757575",
          600: "#616161",
          700: "#424242",
          800: "#2c2c2c",
          900: "#111111",
          950: "#0a0a0a",
        },
        success: {
          100: "#e6f4ea",
          200: "#c1e4cb",
          300: "#9bd5ac",
          400: "#75c68d",
          500: "#4CAF50", // Base color
          600: "#3e8f40",
          700: "#306f30",
          800: "#214f20",
          900: "#112f10",
        },
        warning: {
          100: "#fff3e0",
          200: "#ffe0b2",
          300: "#ffcc80",
          400: "#ffb74d",
          500: "#FF9800", // Base color
          600: "#fb8c00",
          700: "#f57c00",
          800: "#ef6c00",
          900: "#e65100",
        },
        error: {
          100: "#ffebee",
          200: "#ffcdd2",
          300: "#ef9a9a",
          400: "#e57373",
          500: "#F44336", // Base color
          600: "#e53935",
          700: "#d32f2f",
          800: "#c62828",
          900: "#b71c1c",
        },
      },
      fontSize: {
        "2xs": ["0.625rem", "1.5em"],
        xs: ["0.75rem", "1.5em"],
        sm: ["0.875rem", "1.5em"],
        md: ["1rem", "1.5em"],
        lg: ["1.125rem", "1.5em"],
        xl: ["1.5rem", "1.5em"],
        "2xl": ["1.75rem", "1.5em"],
        "3xl": ["1.875rem", "1.5em"],
        "4xl": ["2.5rem", "1.5em"],
        "5xl": ["3rem", "1.5em"],
        "6xl": ["3.75rem", "1.5em"],
      },
      fontWeight: {
        regular: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
    },
  },
  plugins: [],
  // typography: typographyStyles,
} satisfies Config;
