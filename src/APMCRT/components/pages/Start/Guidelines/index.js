import React from "react";
import { GuidelinesContainer, MainPart, LabName, CollegeName, WelcomeMessage, StudyAim } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";

function Guidelines() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <GuidelinesContainer onClick={() => {
      console.log(getUser(state))
      let uid = getUser(state).uid
      let nextposition = "demographic/" + "instructions"
      editUser(uid, { position: nextposition }).then(() => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <ul>
          <li>Do the experiment in a quiet place free from distractions for the whole duration of the experiment.</li>
          <li>Please try to finish each task in a single sitting. Do not take breaks within the same task.</li>
          <li>Please make sure that you have a steady internet connection during the whole experiment. If you fear that there is an issue with your net, please send a mail with your id, and screen recording.</li>
          <li>This experiment is designed to be done in your mobile phone. For the experiment, kindly turn on landscape mode on your mobile phone, and keep your phone in silent/do not disturb mode.</li>
          <li>The experiment requires you to record your screen during the whole experiment duration. So please ensure that you have sufficient storage space in your phone for recording your screen. Also, ensure that you have any screen recorder app (for example, Vidma Recorder)</li>
          <li>Sit upright and at a comfortable distance from your mobile screen. Be relaxed during the whole experiment, and do not rush through any of the tasks.</li>
          <li>In the questionnaires, do not dwell on any single question. However, answer every question sincerely to the best of your ability. In the tasks, ensure that whatever you have done is correct according to you, do not rush through the tasks.</li>
        </ul>
      </MainPart>


      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </GuidelinesContainer>
  );
}
export default Guidelines;
