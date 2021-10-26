import React from "react";
import { EndContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { Instruction } from "../styles";
import { changePage } from "../../../../services/logging";
import { editUser } from "../../../../services/firebaseFunctions";

function End() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <EndContainer onClick={() => {
      let ci = getUser(state).currentIteration + 1
      editUser(getUser(state).uid, { currentIteration: ci }).then(() => {
        changePage(getUser(state).uid, ci === 3 ? "feedback/start" : "task/start", (nextposition) => {
          setUserDetails({ ...getUser(state), position: nextposition })(dispatch)
          setUserDetails({ ...getUser(state), currentIteration: ci })(dispatch)
          history.push(appBasePath + nextposition)
        })
      })
    }}>
      <MainPart>
        Your puzzle looks great! The puzzle image has been uploaded successfully.
        You would have downloaded an image.
        Press anywhere on this page to go to the next task.
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </EndContainer>
  );
}
export default End;
