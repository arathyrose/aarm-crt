import React from "react";
import { DetailsContainer, MainPart, LabName, CollegeName, WelcomeMessage, StudyAim } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
function Details() {
  let history = useHistory()
  return (
    <DetailsContainer onClick={() => { history.push(appBasePath + "start/" + "consent") }}>
      <MainPart>
        The experiment will take about 1 hour to complete. There will be 3 main tasks in this study:
        <ol>
          <li> Demographic questionnaire (which takes approximately 2-3 minutes) </li>
          <li> Solving the puzzle task (which takes approximately 40 minutes) </li>
          <li> 	Creativity task (which takes approximately 5-8 minutes)</li>
          <li> Feedback form (which takes approximately 5-8 minutes) </li>
        </ol>
      </MainPart>


      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </DetailsContainer>
  );
}
export default Details;
