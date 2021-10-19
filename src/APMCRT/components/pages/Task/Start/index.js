import React from "react";
import { StartContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Start() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <StartContainer onClick={() => {
      changePage(getUser(state).uid, "task/introduction", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <h2>A gentle reminder...</h2>
        <p> Please avoid all distractions especially during this part of the quiz. Stay alert, and solve each problem to the best of your ability. </p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </StartContainer>
  );
}
export default Start;
