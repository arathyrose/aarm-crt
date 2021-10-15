import React from "react";
import { CheckAnswerButton, ExampleContainer, ButtonInstruction, MainPart, ViewExplanationButton, Explanation } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions"
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import Puzzle from "../../../APMPuzzleGenerator";

function Example() {
  const { state, dispatch } = React.useContext(Context);
  const APMType = getUser(state).APMType
  const [selectedOption, setSelectedOption] = React.useState('')
  const [isCorrect, setIsCorrect] = React.useState(undefined)
  const [previouslySelectedOptions, setPreviouslySelectedOptions] = React.useState([])
  const [answer, setAnswer] = React.useState('')
  const [logs, setLogs] = React.useState([]) // need to refer and add in logs
  const [viewExplanation, setViewExplanation] = React.useState(false)

  const instructions = {
    "T": {
      header: "Traditional APM",
      instruction: "In the example above, try selecting an option here."
    },
    "A": {
      header: "Abstract APM",
      instruction: "You are given a grid of a 3x3 matrix, and only one row/column is given to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense."
    },
    "D": {
      header: "Determinate Abstract APM",
      instruction: "You are given a grid of a 3x3 matrix, and only one row/column is given to you and the last cell is also shown to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense."
    }
  }
  let history = useHistory()
  return (
    <ExampleContainer onClick={() => {
      if (isCorrect == true) {
        console.log(getUser(state), "UID:", getUser(state).uid)
        let uid = getUser(state).uid
        let nextposition = "task/" + "example"
        editUser(uid, { position: nextposition }).then(() => {
          setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
          history.push(appBasePath + nextposition)
        })
      }
    }}>
      <MainPart>
        <h2> Example 1</h2>
        <p>{instructions[APMType].instruction}  </p>
        <Puzzle type={APMType} APMID={1}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          previouslySelectedOptions={previouslySelectedOptions}
          disabled={isCorrect}
          setIsCorrect={setIsCorrect}
          setAnswer={setAnswer}
        />

      </MainPart>

      <CheckAnswerButton onClick={() => {
        if (selectedOption == answer) {
          setIsCorrect(true)
        }
        else {
          setIsCorrect(false)
        }
        setPreviouslySelectedOptions([...previouslySelectedOptions, selectedOption])
        setSelectedOption('')
      }} > Check answer </CheckAnswerButton>
      <ButtonInstruction>
        {isCorrect == true ? <p>Your answer is correct!</p> :
          isCorrect == false ? <p>Your answer is incorrect!<br /> Sorry, please try again. Hint: Study the row and see what is changing, and the columns and see what is changing. Combine both the rules to get the last cell.</p> :
            <p>Press the button above to check your answer</p>}
      </ButtonInstruction>

      <Instruction />

      <ViewExplanationButton onClick={() => { setViewExplanation(!viewExplanation) }} > View Explanation </ViewExplanationButton>

      {viewExplanation ? <Explanation>
        Here, the two rules that can be identified are
        <ul>
          <li>Row-wise: when we go from the left to the right (within a row), the horizontal line comes closer to the center.</li>
          <li>Column-wise: when we go from top to bottom (within a column), the number of arms in the cell increases.</li>
        </ul>
        Hence, by combining these rules, we can conclude that option 1 is the correct answer to this question.

      </Explanation> : <span></span>}

      <Instruction> Once you have got this question correct, click anywhere to continue...</Instruction>
    </ExampleContainer>
  );
}
export default Example;
