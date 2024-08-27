/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#FF5733',
      //   secondary: '#FFFC33',
      // },
      // spacing: {
      //   5: '3.5rem',
      // },
    },
  },
  plugins: [
    function ({addUtilities}) {
        const newUtilities = {
            ".scrollbar-thin" : {
                // Specifically for firefox, bc firefox doesn't allow much customization
                // scrollbarWidth : "thin",
                // scrollbarColor : "rgb(31 29 29) white", // rgb thumb, white drag
                // borderRadius: "20px"
            },
            ".scrollbar-webkit": {
                "&::-webkit-scrollbar" : {
                    width: "8px"
                },
                // "&::webkit-scrollbar-button": {
                //     display: "none"
                // },
                // "&::-webkit-scrollbar-track" : {
                //     background: "white",
                //     // borderRadius: "20px",
                // },
                // "&::-webkit-scrollbar-track:hover" : {
                //     background: "black"
                // },
                "&::-webkit-scrollbar-thumb" : {
                    background: "#c0c0c0",
                    borderRadius: "20px",
                    // borderRight: "solid 2px transparent",
                    // backgroundClip: "padding-box",
                    // border: "1px solid white"
                },
                "&::-webkit-scrollbar-thumb:hover" : {
                    background: "#888888"
                  }
            }
        }
        addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}
// https://stackoverflow.com/questions/21684101/css-vertical-scrollbar-padding-left-right-in-ul-possible
// https://stackoverflow.com/questions/29866759/how-do-i-add-a-margin-to-a-css-webkit-scrollbar
// https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing

// #f1f1f1;
// #888888;
// #c0c0c0;

// Vragen:

// Scrollbar Solutions
// 1. Check of overflown is en dan vierkant maken met regular scrollbar/
// 2. Custom scrollbar maken

