import React from "react";
import { InstructionsContainer, MainPart, CheckAnswerButton } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";

function Instructions() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory();
  return (
    <InstructionsContainer>
      <MainPart>
        <ul>
          <li>
            Here, you will be given a grid and then asked to draw an APM puzzle.
          </li>
          <li>
            The APM puzzle drawn should follow some rule along its row/column/both. 
            You are free to make the puzzle as complicated as you like, as long as it is solvable.
          </li>
          <li>
            Please avoid all distractions especially during this part of the
            task. Stay alert during the experiment
          </li>
        </ul>
        <p>If you are ready to start the experiment, click on the button below</p>
      </MainPart>
      <CheckAnswerButton
        onClick={() => {
          console.log(getUser(state), "UID:", getUser(state).uid);
          let uid = getUser(state).uid;
          let nextposition = "CRT/task";
          editUser(uid, { position: nextposition }).then(() => {
            setUserDetails({ ...getUser(state), position: nextposition })(
              dispatch
            );
            history.push(appBasePath + nextposition);
          });
        }}
      >
        Start Experiment
      </CheckAnswerButton>
      <Instruction>
        Click on the start experiment button to start the experiment
      </Instruction>
    </InstructionsContainer>
  );
}
export default Instructions;
