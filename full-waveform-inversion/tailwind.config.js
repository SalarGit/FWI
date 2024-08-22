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
                "&::-webkit-scrollbar-track" : {
                    background: "white"
                },
                // "&::-webkit-scrollbar-track:hover" : {
                //     background: "black"
                // },
                "&::-webkit-scrollbar-thumb" : {
                    background: "rgb(31 41 55)",
                    borderRadius: "20px",
                    border: "1px solid white"
                },
                "&::-webkit-scrollbar-thumb:hover" : {
                    background: "#c0a0b9"
                  }
            }
        }
        addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

