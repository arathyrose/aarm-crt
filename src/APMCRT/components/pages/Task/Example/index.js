import React from "react";
import {
  CheckAnswerButton,
  ExampleContainer,
  ButtonInstruction,
  MainPart,
  ViewExplanationButton,
  Explanation,
} from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { Instruction } from "../styles";
import { editUser } from "../../../../services/firebaseFunctions";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import Puzzle from "../../../APMPuzzleGenerator";
import { APM_IDs } from "../../../APMPuzzleGenerator/constructPuzzle/main";

function Example() {
  let currentExampleNumberPart = useLocation().pathname.split("/").slice(3);
  let currentExampleNumber = currentExampleNumberPart === "2" ? 2 : 1;
  const { state, dispatch } = React.useContext(Context);
  const APMType = getUser(state).APMType;
  const [selectedOption, setSelectedOption] = React.useState("");
  const [isCorrect, setIsCorrect] = React.useState(undefined);
  const [previouslySelectedOptions, setPreviouslySelectedOptions] =
    React.useState([]);
  const [answer, setAnswer] = React.useState("");
  const [/* logs */, setLogs] = React.useState([]); // need to refer and add in logs
  const [viewExplanation, setViewExplanation] = React.useState(false);
  console.log(APMType, "is the type")
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
      instruction:
        "You are given a grid of a 3x3 matrix, and only one row/column is given to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense.",
    },
    D: {
      header: "Determinate Abstract APM",
      instruction:
        "You are given a grid of a 3x3 matrix, and only one row/column is given to you and the last cell is also shown to you. Your task here is to construct a puzzle using the puzzle shapes given on the side in such a way that the overall puzzle is best completed and make sense.",
    },
  };
  let history = useHistory();
  return (
    <ExampleContainer
      onClick={() => {
        if (isCorrect === true) {
          console.log(getUser(state), "UID:", getUser(state).uid);
          let uid = getUser(state).uid;
          let nextposition =
            currentExampleNumber === 1
              ? "task/example/" + (currentExampleNumber + 1).toString()
              : "task/instruction/";
          editUser(uid, { position: nextposition }).then(() => {
            setUserDetails({ ...getUser(state), position: nextposition })(
              dispatch
            );
            history.push(appBasePath + nextposition);
            if (currentExampleNumber === 1) {
              // window.location.reload();
              setSelectedOption('')
              setIsCorrect(undefined)
              setPreviouslySelectedOptions([])
              setAnswer("")
              setLogs([])
              setViewExplanation(false)
            }
          });
        }
      }}
    >
      <MainPart>
        <h2> Example {currentExampleNumber}</h2>

        <p>{instructions[APMType].instruction[currentExampleNumber - 1]} </p>
        <Puzzle
          apmType={APMType}
          APMID={APM_IDs.demo[currentExampleNumber - 1]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          previouslySelectedOptions={previouslySelectedOptions}
          disabled={isCorrect}
          setIsCorrect={setIsCorrect}
          setAnswer={setAnswer}
        />
      </MainPart>

      <CheckAnswerButton
        onClick={() => {
          if (selectedOption !== "") {
            if (selectedOption === answer) {
              setIsCorrect(true);
            } else {
              setIsCorrect(false);
            }
            setPreviouslySelectedOptions([
              ...previouslySelectedOptions,
              selectedOption,
            ]);
            setSelectedOption("");
          }
        }}
      >
        {" "}
        Check answer{" "}
      </CheckAnswerButton>
      <ButtonInstruction>
        {isCorrect === true ? (
          <p>Your answer is correct!</p>
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
        {" "}
        View Explanation{" "}
      </ViewExplanationButton>

      {viewExplanation ? (
        <Explanation>
          {GetExplanations(APMType, currentExampleNumber)}
        </Explanation>
      ) : (
        <span></span>
      )}

      <Instruction>
        Once you have got this question correct, click anywhere to continue...
      </Instruction>
    </ExampleContainer>
  );
}
export default Example;
