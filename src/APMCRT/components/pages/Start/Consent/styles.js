import styled from "styled-components";
import colors from "../../../../config/colors";

export const HomeContainer = styled.div`
  min-height: 92vh;
  max-width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

export const ConsentDetails = styled.div`
  font-size: 0.9em;
  box-sizing: border-box;
  margin-bottom: 2%;
`;

export const ConsentButtonApprove = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.primary};
  margin-bottom: 10px;
`;

export const ConsentButtonDeny = styled.button`
  font-size: 1em;
  box-sizing: border-box;
  background-color: ${colors.secondary};
  margin-bottom: 10px;
`;



export const MainPart = styled.div`
  font-size: 1em;
  box-sizing: border-box;
  margin-bottom: 2%;
  text-align: left;
`;
