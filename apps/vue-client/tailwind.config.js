/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      height: {
        header: "var(--header-height)",
        fullNoHeader: "calc(100dvh - var(--header-height))",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
};
