import React from "react";
import { InstructionsContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { CheckAnswerButton, GoBackToExamplesButton } from "../Example/styles";
import { changePage } from "../../../../services/logging";

function Instructions() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory();
  return (
    <InstructionsContainer>
      <MainPart>
        <ul>
          <li> Here, you will be given 6 puzzles, similar to the one you have answered earlier. </li>
          <li> All puzzle tasks need to be solved. There is no navigation in this task, i.e. once you have completed one puzzle, you cannot go back to a previous puzzle. </li>
          <li> There is no feedback after completing each question. (the option will turn blue, once selected, to show submission). </li>
          <li> There is no enforced time limit. Nevertheless, try to respond as fast and accurate as you can. </li>
          <li> You are requested to stay alert during the task, and answer it to the best of your ability. </li>
          <li> Please avoid all distractions especially during this part of the task. Stay alert, and solve each problem as accurately as possible. </li>
        </ul>
        <p>
          If you have any doubts and wish to go back to the examples, you may click here:
          <GoBackToExamplesButton
            onClick={() => {
              changePage(getUser(state).uid, "task/example/1", (nextposition) => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
              })
            }}
          >
            Go back to examples
          </GoBackToExamplesButton>
        </p>
        <p>If you are ready to start the experiment, click on the button below</p>
      </MainPart>
      <CheckAnswerButton
        onClick={() => {
          changePage(getUser(state).uid, "task/puzzle/1", (nextposition) => {
            setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
            history.push(appBasePath + nextposition)
          })
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
