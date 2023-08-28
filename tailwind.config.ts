import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        "bug-type-dark": "#66bb6a",
        "bug-type-light": "#81c784",

        "dark-type-dark": "#757575",
        "dark-type-light": "#9e9e9e",

        "dragon-type-dark": "#ff7043",
        "dragon-type-light": "#ff8a65",

        "electric-type-dark": "#ffce4b",
        "electric-type-light": "#fbe068",

        "fairy-type-dark": "#ffab91",
        "fairy-type-light": "#ffccbc",

        "fighting-type-dark": "#ff7043",
        "fighting-type-light": "#ff8a65",

        "fire-type-dark": "#fc6c6d",
        "fire-type-light": "#fc7e7e",

        "flying-type-dark": "#448aff",
        "flying-type-light": "#82b1ff",

        "ghost-type-dark": "#9575cd",
        "ghost-type-light": "#b39ddb",

        "grass-type-dark": "#48d0b0",
        "grass-type-light": "#61e0c9",

        "ground-type-dark": "#ffa726",
        "ground-type-light": "#ffb74d",

        "ice-type-dark": "#64b5f6",
        "ice-type-light": "#90caf9",

        "normal-type-dark": "#90a4ae",
        "normal-type-light": "#b0bec5",

        "poison-type-dark": "#ba68c8",
        "poison-type-light": "#ce93d8",

        "psychic-type-dark": "#f06292",
        "psychic-type-light": "#f48fb1",

        "rock-type-dark": "#a1887f",
        "rock-type-light": "#bcaaa4",

        "steel-type-dark": "#9e9e9e",
        "steel-type-light": "#bdbdbd",

        "water-type-dark": "#76befe",
        "water-type-light": "#8fd1fd",

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      }
    }
  },
  plugins: []
};
export default config;
