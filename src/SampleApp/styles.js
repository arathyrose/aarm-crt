import styled from "styled-components";
import colors from "./config/colors";
import fonts from "./config/fonts";

export const SampleAppContainer = styled.div`
  background-color: ${colors.background};
  color: ${colors.text};
  ${fonts.default};
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow-y: scroll;
`;
