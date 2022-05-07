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
      changePage(getUser(state).uid, "crt/instruction", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <p>
          Now that you have seen how the puzzle looks like, here is your chance to draw your own puzzle!
        </p>
        <p>
          You are presented with a 3x3 empty grid. Your task is to draw a puzzle similar to the ones you have seen in the previous task, although not exactly the same. You are free to make the puzzle as complicated as you like.
        </p>
        <p>
          This task will be done with pen and paper. You can reach out to the experimenter for details.
        </p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </StartContainer>
  );
}
export default Start;
