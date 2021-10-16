import React from "react";
import { APM_puzzle, traditionalPuzzleElements } from "./constructPuzzle/main";
import {
  OptionGrid,
  OptionItem,
  TraditionalPuzzleContainer,
  PuzzleGrid,
  PuzzleItem,
  ErrorImportant,
  AbstractPuzzleContainer,
  OptionStashContainer,
  OptionStash,
  OptionItemDraggable
} from "./styles";

function Puzzle({
  type,
  APMID,
  disabled,
  setAnswer,
  selectedOption = "",
  setSelectedOption,
  previouslySelectedOptions = [],
  currentPuzzleSetup = [],
  setCurrentPuzzleSetup,
  previouslySelectedPuzzleShapes = [],
}) {
  const APM_Puzzle_Elements = APM_puzzle[APMID];
  //  console.log(type, APMID, APM_Puzzle_Elements)
  setAnswer("O" + APM_Puzzle_Elements.correctOption.toString());
  const [show, setShow] = React.useState(false);
  const [device, setDevice] = React.useState(
    !!navigator.maxTouchPoints ? "mobile" : "computer"
  );
  const [orientation, setOrientation] = React.useState(
    !navigator.maxTouchPoints
      ? "desktop"
      : !window.screen.orientation.angle
        ? "portrait"
        : "landscape"
  );

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setDevice(!!navigator.maxTouchPoints ? "mobile" : "computer");
      setOrientation(
        !navigator.maxTouchPoints
          ? "desktop"
          : !window.screen.orientation.angle
            ? "portrait"
            : "landscape"
      );
    });
    if (orientation == "desktop") setShow(true);
    else if (orientation == "portrait") {
      if (type == "T") setShow(true);
      else setShow(false);
    } else {
      if (type == "T") setShow(false);
      else setShow(true);
    }
  }, [orientation, device]);

  if (!show) {
    return (
      <ErrorImportant>
        Please rotate your screen to perform the experiment.
      </ErrorImportant>
    );
  } else if (type == "T")
    return (
      <TraditionalPuzzleContainer>
        <PuzzleGrid>
          {["1", "2", "3"].map((i) => {
            return ["1", "2", "3"].map((j) => {
              let elementid = "F" + i + j;
              // console.log(elementid, APM_Puzzle_Elements.givenPuzzles[type].given, APM_Puzzle_Elements.givenPuzzles[type].given.includes(elementid))
              if (
                APM_Puzzle_Elements.givenPuzzles[type].given.includes(elementid)
              ) {
                let puzzleCell = APM_Puzzle_Elements.makeShape(
                  APM_Puzzle_Elements.puzzleCells[elementid]
                );
                return (
                  <PuzzleItem id={elementid} key={elementid}>
                    <svg height={"100%"} width={"100%"} viewBox={`0 0 200 200`}>
                      {puzzleCell}
                    </svg>
                  </PuzzleItem>
                );
              } else {
                return (
                  <PuzzleItem id={elementid} key={elementid}>
                    <svg
                      height={"100%"}
                      width={"100%"}
                      viewBox={`0 0 200 200`}
                    />
                  </PuzzleItem>
                );
              }
            });
          })}
        </PuzzleGrid>
        <div style={{ marginBottom: "5%" }}></div>
        <OptionGrid>
          {traditionalPuzzleElements.options.map((elementid) => {
            let puzzleCell = APM_Puzzle_Elements.makeShape(
              APM_Puzzle_Elements.puzzleCells[elementid]
            );
            let selected = elementid === selectedOption;
            let isWrong = previouslySelectedOptions.includes(elementid);
            let isCorrect =
              previouslySelectedOptions.includes(elementid) &&
              elementid === "O" + APM_Puzzle_Elements.correctOption.toString();
            // console.log("Element ID: ", elementid,selected,isWrong,isCorrect , previouslySelectedOptions)
            return (
              <OptionItem
                id={elementid}
                key={elementid}
                selected={selected}
                isWrong={isWrong}
                isCorrect={isCorrect}
                onClick={
                  disabled == true || isCorrect === true || isWrong == true
                    ? () => { }
                    : () => {
                      setSelectedOption(elementid);
                    }
                }
              >
                <svg
                  height={"100%"}
                  width={"100%"}
                  preserveAspectRatio="xMinYMin slice"
                  viewBox={`0 0 200 200`}
                >
                  {puzzleCell}
                </svg>
              </OptionItem>
            );
          })}
        </OptionGrid>
        <div style={{ marginBottom: "3%" }}></div>
      </TraditionalPuzzleContainer>
    );
  else
    return (
      <AbstractPuzzleContainer>
        <PuzzleGrid>
          {["1", "2", "3"].map((i) => {
            return ["1", "2", "3"].map((j) => {
              let elementid = "F" + i + j;
              // console.log(elementid, APM_Puzzle_Elements.givenPuzzles[type].given, APM_Puzzle_Elements.givenPuzzles[type].given.includes(elementid))
              if (
                APM_Puzzle_Elements.givenPuzzles[type].given.includes(elementid)
              ) {
                let puzzleCell = APM_Puzzle_Elements.makeShape(
                  APM_Puzzle_Elements.puzzleCells[elementid]
                );
                return (
                  <PuzzleItem id={elementid} key={elementid}>
                    <svg height={"100%"} width={"100%"} viewBox={`0 0 200 200`}>
                      {puzzleCell}
                    </svg>
                  </PuzzleItem>
                );
              } else {
                return (
                  <PuzzleItem id={elementid} key={elementid}>
                    <svg
                      height={"100%"}
                      width={"100%"}
                      viewBox={`0 0 200 200`}
                    />
                  </PuzzleItem>
                );
              }
            });
          })}
        </PuzzleGrid>
        <OptionStashContainer>
          <OptionStash>
            {APM_Puzzle_Elements.givenPuzzles[type].options.map((eid) => {
              let elementid = eid.slice(0, 2) == 'CE' ? 'O' + APM_Puzzle_Elements.commonErrors[parseInt(eid[2]) - 1].toString() : eid
              console.log(elementid, eid)
              let puzzleCell = APM_Puzzle_Elements.makeShape(
                APM_Puzzle_Elements.puzzleCells[elementid]
              );
              return <OptionItemDraggable id={eid} key={eid}>
                <svg height={"100%"} width={"100%"} viewBox={`0 0 200 200`}>
                  {puzzleCell}
                </svg>
              </OptionItemDraggable>
            })}
          </OptionStash>
        </OptionStashContainer>
      </AbstractPuzzleContainer>
    );
}
export default Puzzle;
