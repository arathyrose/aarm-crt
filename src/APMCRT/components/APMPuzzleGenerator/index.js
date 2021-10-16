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

  function colorise() {
    console.log("something will happen")
    for (let i = 1; i <= 3; i++)for (let j = 1; j <= 3; j++) {
      let puzzleCell = document.getElementById('pos' + i.toString() + j.toString())
      if (puzzleCell && puzzleCell.children.length == 0) {
        puzzleCell.innerHTML = '<svg id="' + 'pos' + i.toString() + j.toString() + '" height="100%" width="100%" viewBox="0 0 200 200"></svg>'
      }
    }
  }
  function drag(ev) {
    //  LOGGING.PICKUP(ev.target.id)
    ev.dataTransfer.setData("text", ev.target.id)
    let parent = document.getElementById(ev.target.id).parentNode.id
    console.log("pickup ", ev.target.id, " from ", parent)
  }
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("Attempting to drop ", data, " on ", ev.target)
    if (ev.target.id.includes("pos")) {
      console.log("yay!")
      //   LOGGING.DROP(data, ev.target.id)
      let curElement = document.getElementById(ev.target.id)
      if (curElement.children.length == 1) {
        curElement.innerHTML = ""
        curElement.appendChild(document.getElementById(data))
        // drop successful
        colorise()
      }
    }
    colorise()
  }
  function dropStash(ev) {
    colorise()
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("Attempting to drop ", data)
    // LOGGING.DROP(data, "stash")
    document.getElementById("stash").appendChild(document.getElementById(data));
    //  colorComplete()
    colorise()
  }
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
                  <PuzzleItem id={"pos" + i + j} key={elementid}>
                    <svg height={"100%"} width={"100%"} viewBox={`0 0 200 200`}>
                      {puzzleCell}
                    </svg>
                  </PuzzleItem>
                );
              } else {
                return (
                  <PuzzleItem id={"pos" + i + j} key={elementid} onDrop={(event) => drop(event)} onDragOver={(event) => event.preventDefault()}>
                    <svg id={"pos" + i + j}
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
          <OptionStash id="stash" onDrop={(event) => dropStash(event)} onDragOver={event => event.preventDefault()}>
            {APM_Puzzle_Elements.givenPuzzles[type].options.map((eid, index) => {
              let puzzleCell = APM_Puzzle_Elements.makeShape(
                APM_Puzzle_Elements.puzzleCells[eid.slice(0, 2) == 'CE' ? 'O' + APM_Puzzle_Elements.commonErrors[parseInt(eid[2]) - 1].toString() : eid]
              );
              let fid = "opt" + (index + 1).toString()
              return <OptionItemDraggable id={fid} key={fid} draggable={true} onDragStart={(event) => drag(event)}>
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
