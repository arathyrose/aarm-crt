import React from "react";
import { EndContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { Instruction } from "../styles";

function End() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <EndContainer onClick={() => {
      console.log(getUser(state), "UID:", getUser(state).uid)
      let uid = getUser(state).uid
      let nextposition = "crt/start"
      editUser(uid, { position: nextposition }).then(() => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        You have performed quite well in this task! Press anywhere on this page to go to the creativity task.
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </EndContainer>
  );
}
export default End;
