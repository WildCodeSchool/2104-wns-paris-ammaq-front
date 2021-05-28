module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        p10:"10%",
      },
      // Neumorphism rules
      boxShadow: {
        mainnav:
          "-2px 2px 4px rgba(40, 40, 40, 0.2), 2px -2px 4px rgba(40, 40, 40, 0.2), -2px -2px 4px rgba(54, 54, 54, 0.9), 2px 2px 5px rgba(40, 40, 40, 0.9), inset 1px 1px 2px rgba(54, 54, 54, 0.3), inset -1px -1px 2px rgba(40, 40, 40, 0.5);",
        profile:
          "-54px -54px 108px rgba(23, 23, 23, 0.2), 54px 54px 108px rgba(23, 23, 23, 0.2), -54px 54px 108px rgba(67, 67, 67, 0.9), 54px -54px 135px rgba(23, 23, 23, 0.9), inset 2px -2px 2px rgba(67, 67, 67, 0.3), inset -2px 2px 2px rgba(23, 23, 23, 0.5);",
        channels:
          "-1px 1px 2px rgba(39, 39, 39, 0.2), 1px -1px 2px rgba(39, 39, 39, 0.2), -1px -1px 2px rgba(51, 51, 51, 0.9), 1px 1px 3px rgba(39, 39, 39, 0.9), inset 1px 1px 2px rgba(51, 51, 51, 0.3), inset -1px -1px 2px rgba(39, 39, 39, 0.5);",
        pressed:
          "1px 1px 2px rgba(54, 54, 54, 0.3), -1px -1px 2px rgba(36, 36, 36, 0.5), inset -2px 2px 4px rgba(36, 36, 36, 0.2), inset 2px -2px 4px rgba(36, 36, 36, 0.2), inset -2px -2px 4px rgba(54, 54, 54, 0.9), inset 2px 2px 5px rgba(36, 36, 36, 0.9);",
        circle:
          "-1px 1px 2px rgba(29, 29, 29, 0.2), 1px -1px 2px rgba(29, 29, 29, 0.2), -1px -1px 2px rgba(61, 61, 61, 0.9), 1px 1px 3px rgba(29, 29, 29, 0.9), inset 1px 1px 2px rgba(61, 61, 61, 0.3), inset -1px -1px 2px rgba(29, 29, 29, 0.5);",
        usersnav:
          " 3px 3px 6px rgba(26, 26, 26, 0.2), -3px -3px 6px rgba(26, 26, 26, 0.2), 3px -3px 6px rgba(64, 64, 64, 0.9), -3px 3px 8px rgba(26, 26, 26, 0.9), inset -1px 1px 2px rgba(64, 64, 64, 0.3), inset 1px -1px 2px rgba(26, 26, 26, 0.5);",
        pictures:
          "-26px 26px 52px rgba(39, 39, 39, 0.2), 26px -26px 52px rgba(39, 39, 39, 0.2), -26px -26px 52px rgba(51, 51, 51, 0.9), 26px 26px 65px rgba(39, 39, 39, 0.9), inset 1px 1px 2px rgba(51, 51, 51, 0.3), inset -1px -1px 2px rgba(39, 39, 39, 0.5);",
        buttonsPressed:
          "1px 1px 2px rgba(63, 63, 63, 0.3), -1px -1px 2px rgba(31, 31, 31, 0.5), inset -1px 1px 2px rgba(31, 31, 31, 0.2), inset 1px -1px 2px rgba(31, 31, 31, 0.2), inset -1px -1px 2px rgba(63, 63, 63, 0.9), inset 1px 1px 3px rgba(31, 31, 31, 0.9);"
      },
      backgroundImage: {
        mainnav: "linear-gradient(135deg, #2F2F2F 0%, #2B2B2B 100%);",
        circle: "linear-gradient(135deg, #2B2B2B 0%, #2F2F2F 100%);",
        usersnav: "linear-gradient(135deg, #2F2F2F 0%, #2B2B2B 100%);",
        workit: "linear-gradient(180deg, #FF8B03 0%, #EF5469 100%);",
        community: "linear-gradient(125.2deg, #4ADE80 -4.15%, #097972 85.68%);",
        library: "linear-gradient(125.5deg, #6BD2FF 7.91%, #5356E1 67.04%);",
        agenda: "linear-gradient(125.5deg, #FACC15 -5.2%, #F97316 74.78%);",
        quizz: "linear-gradient(125.5deg, #FB77B8 9.42%, #EF2A4C 105.75%);",
        pressed: "linear-gradient(135deg, #2F2F2F 0%, #2B2B2B 100%);",
      },

      // Colors
      colors: {
        main: {
          orange: "#FF8B03",
          red: "#EF5469",
          darkgrey: "#2D2D2D",
          white: "#E5E5E5",
        },
        community: {
          green: {
            light: "#4ADE80",
            dark: "#097972",
          },
          blue: "#6BA6FF",
        },
        quizz: {
          pink: "#FB77B8",
          red: "#EF2A4C",
        },
        library: {
          blue: {
            light: "#6BD2FF",
            dark: "#5356E1",
          },
        },
        agenda: {
          yellow: "#FACC15",
          orange: "#F97316",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
