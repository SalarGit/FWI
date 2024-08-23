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
                    width: "18px"
                },
                // "&::-webkit-scrollbar-track" : {
                //     background: "white",
                //     // borderRadius: "20px",
                // },
                // "&::-webkit-scrollbar-track:hover" : {
                //     background: "black"
                // },
                "&::-webkit-scrollbar-thumb" : {
                    background: "#c0c0c0",
                    // borderRadius: "20px",
                    borderRight: "solid 10px transparent",
                    backgroundClip: "padding-box",
                    // border: "1px solid white"
                },
                // "&::-webkit-scrollbar-thumb:hover" : {
                //     background: "#888888"
                //   }
            }
        }
        addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

// #f1f1f1;
// #888888;
// #c0c0c0;
