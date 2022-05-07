import styled from "styled-components";
import colors from "../../../../config/colors";

export const ExampleContainer = styled.div`
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
  margin-bottom: 3%;
  text-align: left;
`;

export const CheckAnswerButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  color: ${colors.fgColor};
  float: right;
  color: ${colors.bgColor};
`;

export const GoBackToExamplesButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  color: ${colors.fgColor};
  color: ${colors.bgColor};
`;

export const ClearButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.secondary};
  float: left;
  color: ${colors.bgColor};
`;

export const ButtonInstruction = styled.div`
  box-sizing: border-box;
  font-size: 0.8em;
`;

export const ViewExplanationButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  color: ${colors.fgColor};
`;

export const ProceedButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  color: ${colors.fgColor};
`;

export const Explanation = styled.div`
  font-size: 0.8em;
  justify-content: left;
  text-align: left;
  margin-top: 2px;
`;

export const ButtonLine = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
