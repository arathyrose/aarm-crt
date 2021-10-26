import React from "react";
import {
  CheckAnswerButton,
  ExampleContainer,
  ButtonInstruction,
  MainPart,
  ViewExplanationButton,
  Explanation, ClearButton, ButtonLine
} from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import Puzzle from "../../../APMPuzzleGenerator";
import { APM_IDs } from "../../../APMPuzzleGenerator/constructPuzzle/main";
import { changePage, checkPuzzle, clearPuzzle, endPuzzle, skipPuzzle, startPuzzle } from "../../../../services/logging";
import { NextButton } from "../End/styles";

function Example() {
  let currentExampleNumberPart = useLocation().pathname.split("/").slice(3).toString();
  const [currentExampleNumber, setCurrentExampleNumber] = React.useState(currentExampleNumberPart === "2" ? 2 : 1)
  const { state, dispatch } = React.useContext(Context);
  const { uid } = getUser(state);
  const APMType = getUser(state).APMType[getUser(state).currentIteration - 1]
  console.log(getUser(state).APMType, getUser(state).currentIteration)
  const [selectedOption, setSelectedOption] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(undefined);
  const [previouslySelectedOptions, setPreviouslySelectedOptions] = React.useState([]);
  const [currentPuzzleSetup, setCurrentPuzzleSetup] = React.useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [currentOptions, setCurrentOptions] = React.useState(undefined);
  const [fillable, setFillable] = React.useState(undefined);
  const [answer, setAnswer] = React.useState("");
  const [viewExplanation, setViewExplanation] = React.useState(false);
  const [colorAnswer, setColorAnswer] = React.useState(false);

  const GetExplanations = (APMType, currentExampleNumber) => {
    switch (currentExampleNumber) {
      case 1:
        switch (APMType) {
          case "T":
            return (
              <Explanation>
                Here, the two rules that can be identified are
                <ul>
                  <li>
                    Row-wise: when we go from the left to the right (within a
                    row), the horizontal line comes closer to the center.
                  </li>
                  <li>
                    Column-wise: when we go from top to bottom (within a
                    column), the number of arms in the cell increases.
                  </li>
                </ul>
                Hence, by combining these rules, we can conclude that option 1
                is the correct answer to this question.
              </Explanation>
            );
          default:
            return <Explanation> Under Construction</Explanation>
        }
      case 2:
        switch (APMType) {
          case "T":
            return (<Explanation>
              Here, the two rules that can be identified are
              <ul>
                <li>
                  Row-wise: Within the same row, the third column element is a
                  combination/superimposition of the first two column
                  elements.{" "}
                </li>
                <li>
                  Column-wise: Within the same column, the third row element
                  is a combination/superimposition of the first two row
                  elements.{" "}
                </li>
              </ul>
              Hence, by combining these rules, we can conclude that option 6
              is the correct answer to this question.
            </Explanation>
            );
          default:
            return <Explanation> Under Construction</Explanation>
        }
      default:
        return <Explanation> Unreachable case</Explanation>
    }
  };
  const instructions = {
    T: {
      header: "Traditional APM",
      instruction: [
        "In the example above, try selecting an option here.",
        "Now check out this example. If you still face any difficulties, check out view explanation.",
      ],
    },
    A: {
      header: "Abstract APM",
      instruction: [
        "You are given a grid of a 3x3 matrix, and only one row/column is given to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense.",
        "Now check out this example. If you still face any difficulties, check out view explanation.",
      ],
    },
    D: {
      header: "Determinate Abstract APM",
      instruction: [
        "You are given a grid of a 3x3 matrix, and only one row/column is given to you and the last cell is also shown to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense.",
        "Now check out this example. If you still face any difficulties, check out view explanation.",
      ],
    },
  };
  let history = useHistory();
  return (
    <ExampleContainer>
      <MainPart>
        <h2> Example {currentExampleNumber} </h2>
        {getUser(state).currentIteration === 2 ? <p>
          <NextButton onClick={() => {
            skipPuzzle(uid)
            changePage(getUser(state).uid, "task/instruction/", (nextposition) => {
              setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
              history.push(appBasePath + nextposition)
            })
          }}          >
            Skip Examples
          </NextButton>
        </p> : ""}
        <p>{instructions[APMType].instruction[currentExampleNumber - 1]} </p>
        <Puzzle
          apmType={APMType}
          APMID={APM_IDs.demo[currentExampleNumber - 1]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          previouslySelectedOptions={previouslySelectedOptions}
          disabled={isCorrect}
          setIsCorrect={setIsCorrect}
          answer={answer}
          setAnswer={setAnswer}
          indemo={true}
          uid={getUser(state).uid}
          currentPuzzleSetup={currentPuzzleSetup}
          setCurrentPuzzleSetup={setCurrentPuzzleSetup}
          currentOptions={currentOptions}
          setCurrentOptions={setCurrentOptions}
          setFillable={setFillable}
          fillable={fillable}
          colorAnswer={colorAnswer}
          setColorAnswer={setColorAnswer}
        />
      </MainPart>

      <ButtonLine>

        <CheckAnswerButton
          onClick={() => {
            checkPuzzle(uid)
            if (!isCorrect) {
              if (APMType === 'T') {
                if (selectedOption === "") {
                  alert("Please perform the task (select an option)")
                }
                else {
                  if (selectedOption === answer) {
                    setIsCorrect(true);
                  } else {
                    setIsCorrect(false);
                  }
                  setPreviouslySelectedOptions([...previouslySelectedOptions, selectedOption]);
                  setSelectedOption("");
                }
              }
              else {
                let incomplete = 0, correct = 1, overallCorrect = 0
                for (let a in answer) {
                  let posAnswer = answer[a]
                  correct = 1
                  for (let i = 0; i < 3; i++)for (let j = 0; j < 3; j++) {
                    if (posAnswer[i][j] !== currentPuzzleSetup[i][j]) correct = 0
                    if (currentPuzzleSetup[i][j] === "" && posAnswer[i][j] !== "") incomplete = 1
                  }
                  if (correct === 1)
                    overallCorrect = 1
                }
                if (incomplete === 1) {
                  alert("Please perform the task (select an option)")
                }
                else if (overallCorrect === 0) {
                  setIsCorrect(false);
                  setColorAnswer(true)
                  console.log(answer, currentPuzzleSetup)
                }
                else {
                  setIsCorrect(true);
                  setColorAnswer(true)
                }
              }
            }
            else {
              endPuzzle(uid)
              changePage(getUser(state).uid, currentExampleNumber === 1 ? "task/example/" + (currentExampleNumber + 1).toString() : "task/instruction/", (nextposition) => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
                if (currentExampleNumber === 1) {
                  setSelectedOption('')
                  setIsCorrect(undefined)
                  setPreviouslySelectedOptions([])
                  setAnswer("")
                  setCurrentExampleNumber(2)
                  setViewExplanation(false)
                  setColorAnswer(true)
                  startPuzzle(uid, "example")
                }
              })
            }
          }}
        >
          {isCorrect ? "Go to next Page" : "Check answer"}
        </CheckAnswerButton>

        <ClearButton onClick={() => {
          if (!isCorrect) {
            clearPuzzle(uid)
            setSelectedOption("")
            setCurrentPuzzleSetup([["", "", ""], ["", "", ""], ["", "", ""]])
            setCurrentOptions(APMType === 'A' ? ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7", "opt8"] :
              ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7"]
            ) // this is fixed
            setColorAnswer(true)
          }
        }}>
          Clear
        </ClearButton>

      </ButtonLine>
      <ButtonInstruction>
        {isCorrect === true ? (
          <p>Your answer is correct! Click on the button to continue.</p>
        ) : isCorrect === false ? (
          <p>
            Your answer is incorrect! Sorry, please try again.
            <br /> Hint: Study the row and see what is changing, and the columns
            and see what is changing. Combine both the rules to get the last
            cell.
          </p>
        ) : (
          <p>Press the button above to check your answer</p>
        )}
      </ButtonInstruction>

      <Instruction />

      <ViewExplanationButton
        onClick={() => {
          setViewExplanation(!viewExplanation);
        }}
      >
        View Explanation
      </ViewExplanationButton>

      {viewExplanation ? (
        <Explanation>
          {GetExplanations(APMType, currentExampleNumber)}
        </Explanation>
      ) : (
        <span></span>
      )}

      <Instruction>
        Once you have got this question correct, click on the button to continue.
      </Instruction>
    </ExampleContainer>
  );
}
export default Example;
