import React from "react";
import { InstructionsContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";

function Instructions() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <InstructionsContainer onClick={() => {
      console.log(getUser(state), "UID:", getUser(state).uid)
      let uid = getUser(state).uid
      let nextposition = "demographic/" + "task"
      editUser(uid, { position: nextposition }).then(() => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        console.log("After state change", state)
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <p>In this section, we would be asking for your demographic information.</p>
        <p>Please fill all questions seriously.</p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </InstructionsContainer>
  );
}
export default Instructions;
