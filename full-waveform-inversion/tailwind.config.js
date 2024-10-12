/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        generalSansExtralight: ['GeneralSans-Extralight', 'sans-serif'],
        generalSansExtralightItalic: ['GeneralSans-ExtralightItalic', 'sans-serif'],
        generalSansLight: ['GeneralSans-Light', 'sans-serif'],
        generalSansLightItalic: ['GeneralSans-LightItalic', 'sans-serif'],
        generalSansRegular: ['GeneralSans-Regular', 'sans-serif'],
        generalSansItalic: ['GeneralSans-Italic', 'sans-serif'],
        generalSansMedium: ['GeneralSans-Medium', 'sans-serif'],
        generalSansMediumItalic: ['GeneralSans-MediumItalic', 'sans-serif'],
        generalSansSemibold: ['GeneralSans-Semibold', 'sans-serif'],
        generalSansSemiboldItalic: ['GeneralSans-SemiboldItalic', 'sans-serif'],
        generalSansBold: ['GeneralSans-Bold', 'sans-serif'],
        generalSansBoldItalic: ['GeneralSans-BoldItalic', 'sans-serif'],
        generalSansVariable: ['GeneralSans-Variable', 'sans-serif'],
        generalSansVariableItalic: ['GeneralSans-VariableItalic', 'sans-serif'],
        // Switzer fonts
        switzerThin: ['Switzer-Thin', 'sans-serif'],
        switzerThinItalic: ['Switzer-ThinItalic', 'sans-serif'],
        switzerExtralight: ['Switzer-Extralight', 'sans-serif'],
        switzerExtralightItalic: ['Switzer-ExtralightItalic', 'sans-serif'],
        switzerLight: ['Switzer-Light', 'sans-serif'],
        switzerLightItalic: ['Switzer-LightItalic', 'sans-serif'],
        switzerRegular: ['Switzer-Regular', 'sans-serif'],
        switzerItalic: ['Switzer-Italic', 'sans-serif'],
        switzerMedium: ['Switzer-Medium', 'sans-serif'],
        switzerMediumItalic: ['Switzer-MediumItalic', 'sans-serif'],
        switzerSemibold: ['Switzer-Semibold', 'sans-serif'],
        switzerSemiboldItalic: ['Switzer-SemiboldItalic', 'sans-serif'],
        switzerBold: ['Switzer-Bold', 'sans-serif'],
        switzerBoldItalic: ['Switzer-BoldItalic', 'sans-serif'],
        switzerExtrabold: ['Switzer-Extrabold', 'sans-serif'],
        switzerExtraboldItalic: ['Switzer-ExtraboldItalic', 'sans-serif'],
        switzerBlack: ['Switzer-Black', 'sans-serif'],
        switzerBlackItalic: ['Switzer-BlackItalic', 'sans-serif'],
        switzerVariable: ['Switzer-Variable', 'sans-serif'],
        switzerVariableItalic: ['Switzer-VariableItalic', 'sans-serif'],
      },
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
            '.animate-spin-counterclockwise': {
              animation: 'spin-counterclockwise 1s linear infinite',
            },
            '@keyframes spin-counterclockwise': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(-360deg)' },
            },
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
    },
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

