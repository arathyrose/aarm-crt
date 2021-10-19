import styled from "styled-components";
import colors from "../../../config/colors";

export const ThankYouContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  box-sizing: border-box;
  background-color: ${colors.primary};
`;

export const AppLogo = styled.img`
  height: 80px;
`;
export const AppTitle = styled.div`
  margin-top: 50px;
  font-size: 4em;
  box-sizing: border-box;
  color: ${colors.titleText};
`;

export const SmallText = styled.div`
  box-sizing: border-box;
  padding-top: 10%;
  font-size: 0.8em;
  color: ${colors.bgColor};
`;
