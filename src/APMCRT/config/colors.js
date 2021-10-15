import { getCookie } from "../utils/common";

const colors = {
  bgColor: "#F1F1F1",
  fgColor: "#FFFDF9",
  primary: "#D75745",
  secondary: "#F2994A",
  text: "#4F4F4F",
  ordinaryText: "#4F4F4F",
  majorTitle: "#FFFDF9",
  navbarTitle: "#F1F1F1",
  instructionText: "#000000",
  majorText: "#9C7A7A",
  titleText: "#FFFDF9",
  errorText: "#ff0000"

  /* text: "#62615F",
  primary: "#FE8590",
  secondary: "#AFABAB",
  background: "#EEE9E6",
  ...(() => {
    return getCookie("devmode")
      ? {
          primary: getCookie("primary") || "#00FFFF",
          text: getCookie("text") || "#00FF00",
          background: getCookie("background") || "#333333",
        }
      : {};
  })(), */
};
export default colors;
