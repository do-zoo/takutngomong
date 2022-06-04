module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "spin-dot": {
          "0%,100% ": {
            "box-shadow":
              "0 -18px 0 0 #FFB017, 12.72984px -12.72984px 0 0 #FFB017, 18px 0 0 0 #FFB017, 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)",
          },
          "12.5% ": {
            "box-shadow":
              "0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 0 #FFB017, 18px 0 0 0 #FFB017, 12.72984px 12.72984px 0 0 #FFB017, 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)",
          },
          "25% ": {
            "box-shadow":
              "0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0 #FFB017, 12.72984px 12.72984px 0 0 #FFB017, 0 18px 0 0 #FFB017, -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)",
          },
          "37.5% ": {
            "box-shadow":
              "0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 0 #FFB017, 0 18px 0 0 #FFB017, -12.72984px 12.72984px 0 0 #FFB017, -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)",
          },
          "50% ": {
            "box-shadow":
              "0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0 #FFB017, -12.72984px 12.72984px 0 0 #FFB017, -18px 0 0 0 #FFB017, -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0)",
          },
          "62.5% ": {
            "box-shadow":
              "0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 0 #FFB017, -18px 0 0 0 #FFB017, -12.72984px -12.72984px 0 0 #FFB017",
          },
          "75% ": {
            "box-shadow":
              "0 -18px 0 0 #FFB017, 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 0 #FFB017, -12.72984px -12.72984px 0 0 #FFB017",
          },
          "87.5% ": {
            "box-shadow":
              "0 -18px 0 0 #FFB017, 12.72984px -12.72984px 0 0 #FFB017, 18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 0 #FFB017",
          },
        },
      },
      animation: {
        "spin-dot": "spin-dot 1.5s infinite linear",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        "text-color": "#FEF9FF",
        "text-color-dark": "#000000",
        "main-bg": "#060039",
        "header-bg": "#1C1085",
        "my-tosca": "#5BE7CA",
        "light-violet": "#E0E4FC",
        "bg-gray": "#D9D9D9",
        "clr-info": "#4484AB",
        "clr-primary": "#230DDF",
        "clr-primary-light": "#6B5DE5",
      },
    },
  },
  plugins: [require("daisyui")],
};
