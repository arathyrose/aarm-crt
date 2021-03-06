import React from "react";
import { InstructionsContainer, MainPart, CheckAnswerButton } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

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
            task.
          </li>
          <li>
            Stay alert during the experiment.
          </li>
        </ul>
        <p> Once you are done with the task (using pen and paper), click on the button below</p>
      </MainPart>
      <CheckAnswerButton
        onClick={() => {
          // go directly to feedback
          changePage(getUser(state).uid, "feedback/start", (nextposition) => {
            setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
            history.push(appBasePath + nextposition)
          })
        }}
      >
        Finish Task
      </CheckAnswerButton>
      <Instruction>
        Click on the start experiment button to start the experiment
      </Instruction>
    </InstructionsContainer>
  );
}
export default Instructions;
