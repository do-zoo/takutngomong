module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "text-color": "#FEF9FF",
        "text-color-dark": "#000000",
        "main-bg": "#060039",
        "header-bg": "#FFB017",
        "my-tosca": "#5BE7CA",
        "light-violet": "#E0E4FC",
        "bg-gray": "#D9D9D9",
      },
    },
  },
  plugins: [require("daisyui")],
};
