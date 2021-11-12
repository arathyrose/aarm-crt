import styled from "styled-components";
import colors from "../../../config/colors"
export const BreakContainer = styled.div`
  min-height: 92vh;
  max-width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;
export const MainPart = styled.div`
  font-size: 1em;
  box-sizing: border-box;
  margin-bottom: 5%;
  text-align: left;
`;

export const TimerContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  font-size: 1.2em;
  margin-bottom: 5%;
`;

export const ButtonLine = styled.div`
  flex-direction: row;
`;

export const NextButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  margin-bottom: 10px;
  margin-top: 10px;
  float: right;
  color: ${colors.bgColor};
`;
