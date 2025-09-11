/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "*.js",
    "*.jsx",
    "./src/*.js",
    "./src/*.jsx",
    "./src/**/*.js",
    "./src/**/*.jsx",
  ],
  theme: {
    extend: {
      objectPosition: {
        "content-box": "content-box",
      },
      overflow: {
        clip: "clip",
      },
      colors: {
        "custom-green": "#1d9a9c",
        "custom-ghana": "#e42f17",
        "custom-badge-green": "#72d667",
        "side-navbar-color": "#06163A",
        "topBar-purple": "#6358DE",
        "semi-transparent-black": "rgba(0, 0, 0, 0.5)",
        "darker-black": "rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
