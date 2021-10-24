import React from "react";
import { HomeContainer, LabPart, LabName, CollegeName, WelcomeMessage, StudyAim } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { setUserDetails } from "../../../../Store/user/actions";
import { getUser } from "../../../../Store/user/accessors";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Home() {
  let history = useHistory()
  const { state, dispatch } = React.useContext(Context);
  return (
    <HomeContainer onClick={() => {
      // this is where the ID and other stuff is done
      changePage(getUser(state).uid, "start/details", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
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
