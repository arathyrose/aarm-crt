import React from "react";
import { EndContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { Instruction } from "../styles";
import { changePage } from "../../../../services/logging";

function End() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <EndContainer onClick={() => {
      changePage(getUser(state).uid, getUser(state).currentIteration === 2 ? "feedback/start" : "break", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch)
        history.push(appBasePath + nextposition)
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
