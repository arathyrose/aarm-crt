import React from "react";
import { HomeContainer, LabPart, LabName, CollegeName, WelcomeMessage, StudyAim } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";

function Home() {
  let history = useHistory()
  return (
    <HomeContainer onClick={() => { history.push(appBasePath + "start/details") }}>
      <LabPart>
        <LabName>
          Perception and Cognition Group, Cognitive sciences Lab
        </LabName>
        <CollegeName>
          IIIT Hyderabad
        </CollegeName>
        <WelcomeMessage>
          Welcomes you to this research!
        </WelcomeMessage>
      </LabPart>
      <StudyAim>
        In this study, we aim to understand how one’s creative ability is affected after solving different kinds of mental tasks and puzzles.
        This is a pilot study.
      </StudyAim>

      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </HomeContainer>
  );
}
export default Home;
