import styled from "styled-components";
import colors from "../../../../config/colors";

export const InstructionsContainer = styled.div`
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
  margin-bottom: 10%;
  text-align: left;
`;

export const CheckAnswerButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  color: ${colors.fgColor};
`;
