import React from "react";
import { IntroductionContainer, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { changePage } from "../../../../services/logging";

function Introduction() {
  const { state, dispatch } = React.useContext(Context);
  const APMType = getUser(state).APMType[getUser(state).currentIteration - 1]
  const instructions = {
    "T": {
      // header: "Traditional APM",
      header: "Task 1",
      instruction: "You are given a puzzle image on 3x3 matrix. However, the last cell is missing. Your task here is to identify the most appropriate match that would best complete the puzzle out of the 8 options provided to you."
    },
    "A": {
      // header: "Abstract APM",
      header: "Task 1",
      instruction: "You are presented with a grid of a 3x3 matrix, in which only one row/column contains components. Your task here is to fill the remaining rows/columns using the puzzle components given on the right, in such a way that the overall puzzle is best completed and makes sense."
    },
    "D": {
      // header: "Determinate Abstract APM",
      header: "Task 1",
      instruction: "You are given a grid of a 3x3 matrix, and only one row/column is given to you and the last cell is also shown to you. Your task here is to construct a puzzle using the puzzle components given on the side in such a way that the overall puzzle is best completed and make sense."
    }
  }
  let history = useHistory()
  return (
    <IntroductionContainer onClick={() => {
      changePage(getUser(state).uid, "task/example", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
        history.push(appBasePath + nextposition)
      })
    }}>
      <MainPart>
        <h2> {instructions[APMType].header} </h2>
        <p> {instructions[APMType].instruction}  </p>
      </MainPart>
      <Instruction>
        Click anywhere to continue ...
      </Instruction>
    </IntroductionContainer>
  );
}
export default Introduction;
