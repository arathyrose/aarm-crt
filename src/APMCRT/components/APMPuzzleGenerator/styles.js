import styled from "styled-components";
import colors from "../../config/colors";

const height = window.innerHeight;
const width = window.innerWidth;
const puzzleCellDimension = (Math.min(height, width) / 4) * 0.8;
console.log("Puzzle cell dimension", puzzleCellDimension);

export const TraditionalPuzzleContainer = styled.div`
  min-height: 50vh;
  max-width: 800px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  flex: 1;
`;

export const AbstractPuzzleContainer = styled.div`
  min-width: 80vh;
  max-width: 1000px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  box-sizing: border-box;
  flex: 1;
`;

export const PuzzleGrid = styled.div`
  width: ${((puzzleCellDimension + 4) * 3).toString() + "px"};
  height: ${((puzzleCellDimension + 4) * 3).toString() + "px"};
  background: ${colors.fgColor};
  border: 6px solid ${colors.fgColor};
  float: left;
  padding: 0;
  margin: 0;
`;

export const PuzzleItem = styled.div`
  position: relative;
  width: ${puzzleCellDimension.toString() + "px"};
  height: ${puzzleCellDimension};

  border: 1px dashed gray;
  margin: 1px;
  display: inline-block;
  padding: 0;
  aspect-ratio: 1;
`;

export const OptionGrid = styled.div`
  width: ${((puzzleCellDimension + 4) * 4).toString() + "px"};
  height: ${((puzzleCellDimension + 4) * 2).toString() + "px"};
  background: ${colors.fgColor};
  border: 6px solid ${colors.fgColor};
  float: left;
  padding: 0;
  margin: 0;
`;

export const OptionItem = styled.div`
  position: relative;
  width: ${puzzleCellDimension.toString() + "px"};
  border: 1px dashed gray;
  background-color: ${(props) =>
    props.isCorrect
      ? "green"
      : props.isWrong
        ? "red"
        : props.selected
          ? "blue"
          : "none"};
  margin: 1px;
  display: inline-block;
  padding: 0;
  aspect-ratio: 1;
`;

export const MainPart = styled.div`
  font-size: 1em;
  box-sizing: border-box;
  margin-bottom: 10%;
  text-align: left;
`;

export const ErrorImportant = styled.h1`
  color: ${colors.errorText};
`;

export const OptionStashContainer = styled.div`
  flex: 1;
  height: ${((puzzleCellDimension + 4) * 3 + 4).toString() + "px"};
  width: ${((puzzleCellDimension + 4) * 2 + 30).toString() + "px"};
  float: right;
  text-align: right;
`;

export const OptionStash = styled.div`
  height: ${((puzzleCellDimension + 4) * 3).toString() + "px"};
  width: ${((puzzleCellDimension + 4) * 2 + 12).toString() + "px"};
  background-color: ${colors.majorText};
  border: 6px solid ${colors.majorText};
  margin: 0;
  padding-right: 4px;
  overflow-x: hidden;
  overflow-y: scroll;
  float: right;
  ::-webkit-scrollbar {
    // width
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    // track
    box-shadow: inset 0 0 5px ${colors.majorText};
    border-radius: 5px;
  }
  ::-webkit-scrollbar-thumb {
    // handle
    background: white;
    border-radius: 5px;
  }
  ::-webkit-scrollbar-button {
    // arrows
    display: none;
  }
  ::-webkit-scrollbar-track-piece {
    // bar background
    background: ${colors.text};
    border-radius: 5px;
  }
`;

export const OptionItemDraggable = styled.div`
  position: relative;
  width: ${puzzleCellDimension.toString() + "px"};
  min-width: ${puzzleCellDimension.toString() + "px"};
  max-width: ${puzzleCellDimension.toString() + "px"};
  height: ${puzzleCellDimension.toString() + "px"};
  min-height: ${puzzleCellDimension.toString() + "px"};
  max-height: ${puzzleCellDimension.toString() + "px"};
  display: inline-block;
  background-color: ${(props) => {
    console.log(props.complete)
    return props.isCorrect
      ? "green"
      : props.isWrong
        ? "red"
        : props.complete 
          ? "#eeeeee"
          : "#cccccc"
  }};
  
  border: 1px dashed gray;
  margin: 1px;
`;
