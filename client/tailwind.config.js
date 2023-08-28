// JSDoc comment helps tools identify the config type
/** @type {import('tailwindcss').Config} */
// module.exports exports js object as config settings
module.exports = {
  // type of files that tailwind should scan for css classes
  // all js, jsx, ts (typescript), tsx files inside a src folder
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // custom width utility classes
      width: {
        // for example if i use w-150 in tailwind code it will fetch it from here instead of writing w-[150px]
        150: "150px",
        190: "190px",
        225: "225px",
        275: "275px",
        300: "300px",
        340: "340px",
        350: "350px",
        375: "375px",
        460: "460px",
        656: "656px",
        880: "880px",
        508: "508px",
      },
      height: {
        80: "80px",
        150: "150px",
        225: "225px",
        300: "300px",
        340: "340px",
        370: "370px",
        420: "420px",
        510: "510px",
        600: "600px",
        650: "650px",
        685: "685px",
        800: "800px",
        // h-90vh
        "90vh": "90vh",
      },
      minWidth: {
        210: "210px",
        350: "350px",
        620: "620px",
      },
      screens: {
        // media query breakpoints
        // small screens means 640px
        sm: "640px",
        // medium screens
        md: "768px",
        // large
        lg: "1024px",
        // xlarge
        xl: "1800px",
        // double xlarge
        "2xl": "2024px",
      },
      colors: {
        // custom colors (color classes)
        headingColor: "#2e2e2e",
        textColor: "#515151",
        primary: "#f3f3f3",
        darkOverlay: "rgba(0,0,0,0.2)",
        lightOverlay: "rgba(255,255,255,0.4)",
        lighttextGray: "#9ca0ab",
        card: "rgba(256,256,256,0.8)",
        cartBg: "#282a2c",
        cartItem: "#2e3033",
        cartTotal: "#343739",
      },
    },
  },
  plugins: [],
};
