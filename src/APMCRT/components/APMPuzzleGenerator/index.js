import React from "react";
import { dropOption, optionSelectT, pickupOption } from "../../services/logging";
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
  apmType = "T",
  APMID = 1,
  disabled = false,
  // answer = undefined,
  setAnswer = undefined,
  indemo = false,
  selectedOption = "",
  setSelectedOption = undefined,
  previouslySelectedOptions = [],
  currentPuzzleSetup = [["", "", ""], ["", "", ""], ["", "", ""]],
  setCurrentPuzzleSetup = undefined, // a setter
  currentOptions = undefined, // ["opt1","opt2",...]
  setCurrentOptions = undefined,
  // fillable = undefined,
  setFillable = undefined,
  uid = "",
}) {
  // drag drop attempted from https://medium.com/@deepakkadarivel/drag-and-drop-dnd-for-mobile-browsers-fc9bcd1ad3c5
  const APM_Puzzle_Elements = APM_puzzle[APMID];
  // https://konvajs.org/docs/react/Drag_And_Drop.html
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
  )
  // const [activeEvent, setActiveEvent] = React.useState('')
  // const [originalPosition, setOriginalPosition] = React.useState({ x: "0px", y: "0px" })

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
    if (orientation === "desktop") setShow(true);
    else if (orientation === "portrait") {
      if (apmType === "T") setShow(true);
      else setShow(false);
    } else {
      if (apmType === "T") setShow(false);
      else setShow(true);
    }
  }, [orientation, device]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (indemo) {
      if (apmType === 'T') {
        setAnswer("O" + APM_Puzzle_Elements.correctOption.toString());
      }
      else {
        if (APM_Puzzle_Elements.possibleAnswers[apmType]) {
          let givenAnswers = APM_Puzzle_Elements.possibleAnswers[apmType]
          let finalAns = []
          for (let g in givenAnswers) {
            let givenAns = givenAnswers[g]
            let a = [["", "", ""], ["", "", ""], ["", "", ""]]
            for (let i = 0; i < 3; i++) {
              for (let j = 0; j < 3; j++) {
                if (givenAns[i][j] !== '') a[i][j] = "opt" + (givenAns[i][j] + 1).toString()
              }
            }
            finalAns.push(a)
          }
          setAnswer(finalAns)
        }
        else {
          let a = [["", "", ""], ["", "", ""], ["", "", ""]]
          for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
              let optPos = APM_Puzzle_Elements.givenPuzzles[apmType].options.indexOf('F' + (i + 1).toString() + (j + 1).toString())
              if (optPos !== -1) {
                a[i][j] = "opt" + (optPos + 1).toString()
              }
            }
          }
          console.log(a)
          setAnswer([a])
        }
      }
    }
    if (apmType !== "T") {
      let a = [["", "", ""], ["", "", ""], ["", "", ""]]
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          let elementid = "F" + i + j;
          // console.log(elementid, APM_Puzzle_Elements.givenPuzzles[apmType].given, APM_Puzzle_Elements.givenPuzzles[apmType].given.includes(elementid))
          if (APM_Puzzle_Elements.givenPuzzles[apmType].given.includes(elementid)) {
            a[i][j] = "F"
          }
        }
        setFillable(a)
      }
    }
    setCurrentPuzzleSetup([["", "", ""], ["", "", ""], ["", "", ""]])
    // based on the row/col, need to change
    setCurrentOptions(apmType === 'A' ? ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7", "opt8"] :
      ["opt1", "opt2", "opt3", "opt4", "opt5", "opt6", "opt7"]
    )
  }, [APMID])  // eslint-disable-line react-hooks/exhaustive-deps

  function colorise() {
    for (let i = 1; i <= 3; i++)
      for (let j = 1; j <= 3; j++) {
        let puzzleCell = document.getElementById('pos' + i.toString() + j.toString())
        if (puzzleCell && puzzleCell.children.length === 0) {
          puzzleCell.innerHTML = '<svg id="pos' + i.toString() + j.toString() + '" height="100%" width="100%" viewBox="0 0 200 200"></svg>'
        }
      }
    // also color the elements

  }

  const DraggablePuzzleElement = ({ id }) => {
    const optionIndex = parseInt(id[3])
    const eid = APM_Puzzle_Elements.givenPuzzles[apmType].options[optionIndex - 1]
    console.log(optionIndex, " of ", eid, " from common errors: ", APM_Puzzle_Elements.commonErrors, " APMID =", APMID)
    const puzzleCell = APM_Puzzle_Elements.makeShape(APM_Puzzle_Elements.puzzleCells[
      eid.slice(0, 2) === 'CE' ? 'O' + APM_Puzzle_Elements.commonErrors[parseInt(eid[2]) - 1].toString() : eid
    ])
    return <OptionItemDraggable id={id} key={id} draggable={disabled ? false : true} onDragStart={(event) => drag(event)}      >
      {puzzleCell}
    </OptionItemDraggable>
  }

  function drag(ev) {
    //  LOGGING.PICKUP(ev.target.id)
    ev.dataTransfer.setData("text", ev.target.id)
    let parent = document.getElementById(ev.target.id).parentNode.id
    ev.dataTransfer.setData("parent", parent)
    console.log("pickup ", ev.target.id, " from ", parent)
    pickupOption(uid, ev.target.id, parent)
  }
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var parent = ev.dataTransfer.getData("parent");
    if (ev.target.id) {
      let pos = [parseInt(ev.target.id[3]) - 1, parseInt(ev.target.id[4] - 1)]
      console.log("Attempting to drop ", data, " from parent ", parent, " on ", pos, " which has content ", currentPuzzleSetup[pos[0]][pos[1]])
      if (currentPuzzleSetup[pos[0]][pos[1]] === "" && ev.target.id[0] === 'p') {
        currentPuzzleSetup[pos[0]][pos[1]] = data
        console.log("Drop successful!")
        setCurrentOptions(currentOptions.filter((item) => item !== data))
        if (parent[0] === 'p') {
          let pos = [parseInt(parent[3]) - 1, parseInt(parent[4] - 1)]
          currentPuzzleSetup[pos[0]][pos[1]] = ""
        }
        dropOption(uid, data, parent, ev.target.id)
      }
    }
    colorise()
  }
  function dropStash(ev) {
    colorise()
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var parent = ev.dataTransfer.getData("parent");
    console.log("Attempting to drop ", data, " of parent ", parent, " on top of stash")
    // LOGGING.DROP(data, "stash")
    //document.getElementById("stash").appendChild(document.getElementById(data));
    if (parent !== 'stash') {
      setCurrentOptions([...currentOptions, data])
      if (parent[0] === 'p') {
        let pos = [parseInt(parent[3]) - 1, parseInt(parent[4] - 1)]
        currentPuzzleSetup[pos[0]][pos[1]] = ""
      }
      dropOption(uid, data, parent, ev.target.id)
    }
    //  colorComplete()
    colorise()
  }
  /* function detectTouchEnd(x1, y1, x2, y2, w, h) {
    console.log("Mouse at ", x1, y1)
    if (x2 - x1 > w)
      return false;
    if (y2 - y1 > h)
      return false;
    return true;
  }

  function onTop(mousePosition, div) {
    return detectTouchEnd(mousePosition.x, mousePosition.y, div.offsetLeft, div.offsetTop, div.offsetWidth, div.offsetHeight)
  } */

  if (!show) {
    return (
      <ErrorImportant>
        Please rotate your screen to perform the experiment.
      </ErrorImportant>
    );
  } else if (apmType === "T")
    return (
      <TraditionalPuzzleContainer>
        <PuzzleGrid>
          {["1", "2", "3"].map((i) => {
            return ["1", "2", "3"].map((j) => {
              let elementid = "F" + i + j;
              // console.log(elementid, APM_Puzzle_Elements.givenPuzzles[apmType].given, APM_Puzzle_Elements.givenPuzzles[apmType].given.includes(elementid))
              if (
                APM_Puzzle_Elements.givenPuzzles[apmType].given.includes(elementid)
              ) {
                let puzzleCell = APM_Puzzle_Elements.makeShape(
                  APM_Puzzle_Elements.puzzleCells[elementid]
                );
                return (
                  <PuzzleItem id={elementid} key={elementid}>
                    {puzzleCell}
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
            let puzzleCell = APM_Puzzle_Elements.makeShape(APM_Puzzle_Elements.puzzleCells[elementid]);
            let selected = elementid === selectedOption;
            let isWrong = previouslySelectedOptions.includes(elementid);
            let isCorrect = previouslySelectedOptions.includes(elementid) && elementid === "O" + APM_Puzzle_Elements.correctOption.toString();
            // console.log("Element ID: ", elementid,selected,isWrong,isCorrect , previouslySelectedOptions)
            return (
              <OptionItem
                id={elementid}
                key={elementid}
                selected={selected}
                isWrong={isWrong}
                isCorrect={isCorrect}
                onClick={
                  disabled === true || isCorrect === true || isWrong === true
                    ? () => { }
                    : () => {
                      optionSelectT(uid, elementid)
                      setSelectedOption(elementid);
                    }
                }
              >
                {puzzleCell}
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
              let elementid = "pos" + i + j;
              // check if it is a given fixed puzzle
              if (APM_Puzzle_Elements.givenPuzzles[apmType].given.includes("F" + i + j)) {
                let puzzleCell = APM_Puzzle_Elements.makeShape(
                  APM_Puzzle_Elements.puzzleCells["F" + i + j]
                );
                return (
                  <PuzzleItem id={"fixed_" + elementid} key={elementid}>
                    {puzzleCell}
                  </PuzzleItem>
                );
              }
              // draw the puzzle shape of the containing image if any
              else {
                // console.log(i, j, currentPuzzleSetup)
                let contents = currentPuzzleSetup[parseInt(i) - 1][parseInt(j) - 1]
                return (
                  <PuzzleItem id={elementid} key={elementid} onDrop={(event) => drop(event)} onDragOver={(event) => event.preventDefault()} >
                    {contents === "" ? <svg id={"pos" + i + j} height={"100%"} width={"100%"} viewBox={`0 0 200 200`} > ""  </svg> : <DraggablePuzzleElement id={contents} />}
                  </PuzzleItem>
                );
              }
            });
          })}
        </PuzzleGrid>
        <OptionStashContainer>
          <OptionStash id="stash" onDrop={(event) => dropStash(event)} onDragOver={event => event.preventDefault()}>
            {currentOptions.map((optionID) => {
              return <DraggablePuzzleElement id={optionID} />
            })}
          </OptionStash>
        </OptionStashContainer>
      </AbstractPuzzleContainer>
    );
}
export default Puzzle;
