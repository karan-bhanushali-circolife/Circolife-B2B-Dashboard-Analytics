/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        drawTick: {
          "0%": { strokeDasharray: "0, 100" },
          "100%": { strokeDasharray: "100, 0" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.8)" },
          "80%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      fontSize: {
        fontCustom: "32px",
      },
      borderRadius: {
        customBorderRounded: "40px",
      },
      height: {
        customLineHeight: "105px",
        customAddressContainerWidth: "218px",
        customAddressContainerHeight: "140px",
      },
      animation: {
        drawTick: "drawTick 0.5s ease-in-out forwards",
        scaleIn: "scaleIn 0.3s ease-in-out 0.5s forwards",
      },
      backgroundImage: {
        "role-fill-2":
          "linear-gradient(302deg, rgba(189, 224, 237, 0.17)30.13%, rgba(208, 240, 192, 0.17)86.21%)",
      },
      fontFamily: {
        sans: ["Inter"],
      },
      boxShadow: {
        "custom-hover": "4px 4px 18px 0px rgba(9, 9, 9, 0.14)",
        "custom-shadow": "0px 4px 15.5px 0px rgba(172, 172, 172, 0.25)",
      },
      colors: {
        primary: "#A14996",
        secondary: "#FAF9F6",
        aside: "#FFF1FD",
        internalcard: "#BDE0ED",
        subtext: "#828282",
        background: "#FDFDFD",
        inputfield: "#d9d9d9",
        greenco: "#1ECC63",
        hdufa: "rgba(189, 224, 237, 0.17)",
        servicebackgound: "#F2FDEC",
        borderborder: "#D0D0D0",
        addaddressheeading: "##1B1818",
        toggle: "#E8F6DE",
        servicebackgound: "#E7FFDB",
        custombordercolor: "#D0D0D0",
        calendarWrapperColor: "rgba(208, 240, 192, 0.30)",
        countContainerBorderColor: "#ECECEC",
        countContainerOneColor: "#EAFFE0",
        countContainerTwoColor: "#FFF6EE",
        countContainerThreeColor: "#DCEFF6",
        countContainerFourthColor: "#FFDBFB",
        customParagraphColor: "#1FBF77",
        customParagraphTwoColor: "#FFB478",
        customParagraphTwoColorModified: "#F49244",
        hoverFontColor: "#D0F0C0BF",
        optionalcolor: "#828282",
        servicetext: "#171111",
        pasttext: "#141111",
        myCustomBackgroundColor: "rgb(253,253,253)",
      },
    },
  },
  plugins: [],
};
