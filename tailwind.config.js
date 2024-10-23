/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,jsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        custom: '0px 0px 21px -7px #000',
      },
      colors:{
        mainColor:'#053B5C',
        secondColor:'#005D94',
        thirdColor: '#96949C'
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #053B5C, #2B6CB0)',
      },
    },
  },
  plugins: [],
});