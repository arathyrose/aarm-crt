import styled from "styled-components";
import colors from "./config/colors";
import fonts from "./config/fonts";

export const APMCRTContainer = styled.div`
  background-color: ${colors.primary};
  color: ${colors.text};
  ${fonts.default};
  text-align: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  overflow-y: scroll;
`;
