import React from "react";
import { DetailsContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
function Details() {
  let history = useHistory()
  return (
    <DetailsContainer onClick={() => { history.push(appBasePath + "start/consent") }}>
      <MainPart>
        The experiment will take about 30-40 minutes to complete. We will instruct task specific details as we proceed
        <ol>
          <li> Keep your phone in silent mode </li>
          <li> Sit in a comfartable position </li>
          <li> Feel free to ask questions if you have any doubts </li>
        </ol>
        {/* <ol>
          <li> Demographic questionnaire (which takes approximately 2-3 minutes) </li>
          <li> Solving the puzzle task (which takes approximately 25-30 minutes) </li>
          <li> Creativity task (which takes approximately 5-8 minutes)</li>
          <li> Feedback form (which takes approximately 5-8 minutes) </li>
        </ol>
        Task 3 will be done on pen and paper. */}
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </DetailsContainer>
  );
}
export default Details;
