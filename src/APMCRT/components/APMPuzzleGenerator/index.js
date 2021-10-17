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
  apmType,
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
  //  console.log(apmType, APMID, APM_Puzzle_Elements)
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
  )
  const [activeEvent, setActiveEvent] = React.useState('')
  const [originalPosition, setOriginalPosition] = React.useState({ x: "0px", y: "0px" })

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

  function colorise() {
    for (let i = 1; i <= 3; i++)for (let j = 1; j <= 3; j++) {
      let puzzleCell = document.getElementById('pos' + i.toString() + j.toString())
      if (puzzleCell && puzzleCell.children.length === 0) {
        puzzleCell.innerHTML = '<svg id="pos' + i.toString() + j.toString() + '" height="100%" width="100%" viewBox="0 0 200 200"></svg>'
      }
    }
    // also color the elements
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
      if (curElement.children.length === 1) {
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
  function detectTouchEnd(x1, y1, x2, y2, w, h) {
    console.log("Mouse at ", x1, y1)
    if (x2 - x1 > w)
      return false;
    if (y2 - y1 > h)
      return false;
    return true;
  }

  function onTop(mousePosition, div) {
    return detectTouchEnd(mousePosition.x, mousePosition.y, div.offsetLeft, div.offsetTop, div.offsetWidth, div.offsetHeight)
  }

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
                  disabled === true || isCorrect === true || isWrong === true
                    ? () => { }
                    : () => { setSelectedOption(elementid); }
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
              let elementid = "pos" + i + j;
              // console.log(elementid, APM_Puzzle_Elements.givenPuzzles[apmType].given, APM_Puzzle_Elements.givenPuzzles[apmType].given.includes(elementid))
              if (
                APM_Puzzle_Elements.givenPuzzles[apmType].given.includes("F" + i + j)
              ) {
                let puzzleCell = APM_Puzzle_Elements.makeShape(
                  APM_Puzzle_Elements.puzzleCells["F" + i + j]
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
                  <PuzzleItem id={elementid} key={elementid} onDrop={(event) => drop(event)} onDragOver={(event) => event.preventDefault()} >
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
            {APM_Puzzle_Elements.givenPuzzles[apmType].options.map((eid, index) => {
              let puzzleCell = APM_Puzzle_Elements.makeShape(
                APM_Puzzle_Elements.puzzleCells[eid.slice(0, 2) === 'CE' ? 'O' + APM_Puzzle_Elements.commonErrors[parseInt(eid[2]) - 1].toString() : eid]
              );
              let fid = "opt" + (index + 1).toString()
              return <OptionItemDraggable id={fid} key={fid} draggable={true} onDragStart={(event) => drag(event)}
                onTouchStart={(e) => {
                  let parent = e.target.parentNode
                  while (!parent.id || !parent.id.includes('opt'))
                    parent = parent.parentNode
                  e.target.element = parent
                  console.log(parent)
                  let originalX = (parent.offsetLeft - 10) + "px";
                  let originalY = (parent.offsetTop - 10) + "px";
                  console.log("Originally picking", originalX, originalY, parent)
                  setOriginalPosition({ x: originalX, y: originalY })
                  setActiveEvent('move')
                }}
                onTouchMove={(e) => {
                  var touchLocation = e.targetTouches[0];
                  var pageX = (touchLocation.pageX - 50) + "px";
                  var pageY = (touchLocation.pageY - 50) + "px";
                  e.target.style.position = "absolute";
                  e.target.style.left = pageX;
                  e.target.style.top = pageY;
                  setActiveEvent('move')
                  for (let i = 1; i <= 3; i++) {
                    for (let j = 1; j <= 3; j++) {
                      let puzzleCellElement = document.getElementById("pos" + i.toString() + j.toString())
                      if (onTop({ x: pageX, y: pageY }, puzzleCellElement)) {
                        console.log("on ", puzzleCellElement.id)
                      }
                    }
                  }
                }}
                onTouchEnd={(e) => {
                  e.preventDefault()
                  if (activeEvent === 'move') {
                    let mousePosition = {
                      x: (parseInt(e.target.style.left) - 50),
                      y: (parseInt(e.target.style.top) - 50)
                    }
                    // check if overlapping with stash
                    let flag = false
                    let stashElement = document.getElementById('stash')
                    if (!flag && onTop(mousePosition, stashElement)) {
                      console.log("on stash!")
                      stashElement.appendChild(e.target.element);
                      e.target.style.position = "initial";
                      flag = true
                    }
                    for (let i = 1; i <= 3; i++) {
                      for (let j = 1; j <= 3; j++) {
                        let puzzleCellElement = document.getElementById("pos" + i.toString() + j.toString())
                        if (!flag && onTop(mousePosition, puzzleCellElement)) {
                          console.log("on ", puzzleCellElement.id)
                          if (puzzleCellElement.children.length === 1) {
                            puzzleCellElement.innerHTML = ""
                            puzzleCellElement.appendChild(e.target.element)
                            // drop successful
                            e.target.style.position = "initial";
                            flag = true
                            colorise()
                          }
                        }
                      }
                    }
                    if (!flag) {
                      e.target.style.left = originalPosition.x;
                      e.target.style.top = originalPosition.y;
                    }
                  }

                }}
              >
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
