import React from "react";
import { InstructionsContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Instructions() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <InstructionsContainer onClick={() => {
      changePage(getUser(state).uid, "feedback/task", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <p>In this section, we would be asking for your feedback on the whole experiment.</p>
        <p>Please fill in all questions seriously.</p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </InstructionsContainer>
  );
}
export default Instructions;
