/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // GeneralSans fonts
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
      // FWI colors can be set up here
      // colors: {
      //   primary: '#FF5733',
      //   secondary: '#FFFC33',
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
            ".scrollbar-webkit": {
                "&::-webkit-scrollbar" : {
                  width: "8px"
                },
                "&::-webkit-scrollbar-thumb" : {
                  background: "#c0c0c0",
                  borderRadius: "20px",
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
