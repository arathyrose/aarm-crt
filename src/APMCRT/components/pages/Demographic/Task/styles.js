import styled from "styled-components";
import colors from "../../../../config/colors";

export const TaskContainer = styled.div`
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

export const SubmitButton = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const ErrorMessage = styled.p`
  font-size: 0.8em;
  color: ${colors.errorText};
`;
