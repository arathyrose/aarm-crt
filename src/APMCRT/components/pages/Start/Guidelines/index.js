import React from "react";
import { GuidelinesContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Guidelines() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <GuidelinesContainer onClick={() => {
      changePage(getUser(state).uid, "demographic/instructions", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        {/* If you are doing the experiment in person (at our lab), you can ignore these instructions. But, if you are doing this experiment somewhere else with the use of internet, please attend to the following: */}
        <ul>
          {/* <li>Do the experiment in a quiet place free from distractions for the whole duration of the experiment.</li>
          <li>Please try to finish each task in a single sitting. Do not take breaks within the same task.</li>
          <li>The experiment requires you to record your screen during the whole experiment duration.</li>
          <li>Please make sure that you have a steady internet connection during the whole experiment. If you fear that there is an issue with your net, please send a mail with your id, and screen recording.</li> */}
          <li>Be relaxed during the whole experiment, and do not rush through any of the tasks.</li>
          <li>In the questionnaires, do not dwell on any single question. However, answer every question sincerely to the best of your ability.</li>
        </ul>
      </MainPart>

      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </GuidelinesContainer>
  );
}
export default Guidelines;
