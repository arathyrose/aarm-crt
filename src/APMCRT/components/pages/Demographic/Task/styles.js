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

export const Label = styled.div`
  justify-content: flex-end;
  text-align: left;
  min-width: 300px;
  max-width: 20%;
`

export const Input = styled.input`
  margin-left: 10px;
`

export const FormRow = styled.div`
display: flex;
  flex-direction: row;
  margin-bottom:10px
`