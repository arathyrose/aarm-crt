import React from "react";
import { StartContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";

function Start() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  return (
    <StartContainer onClick={() => {
      console.log(getUser(state), "UID:", getUser(state).uid)
      let uid = getUser(state).uid
      let nextposition = "CRT/instruction"
      editUser(uid, { position: nextposition }).then(() => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <p>
          Now that you have seen how the puzzle looks like, here is your chance to draw your own puzzle!
        </p>
        <p>
          ou are given a 3x3 grid. Your task is to draw a puzzle similar to the ones you have seen in the previous task, although not exactly the same. You are free to make the puzzle as complicated as you like.
        </p>
        <p>
          Click on the demo video below to see a demo of using this application.
        </p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </StartContainer>
  );
}
export default Start;
