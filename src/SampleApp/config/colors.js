import { getCookie } from "../utils/common";

const colors = {
  text: "#62615F",
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
  })(),
};
export default colors;
