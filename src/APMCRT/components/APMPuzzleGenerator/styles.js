import styled from "styled-components";
import colors from "../../config/colors";

const height = window.innerHeight
const width = window.innerWidth
const puzzleCellDimension = (Math.min(height, width) / 4 * 0.6)
console.log("Puzzle cell dimension", puzzleCellDimension)

export const PuzzleContainer = styled.div`
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

export const PuzzleGrid = styled.div`
  width: ${(puzzleCellDimension * 3 + 12).toString() + "px"};
  height: ${(puzzleCellDimension * 3 + 12).toString() + "px"};
  background: ${colors.fgColor};
  border: 6px solid ${colors.fgColor};
  float: left;
  padding: 0;
  margin: 0;
`;

export const PuzzleItem = styled.div`
  position: relative;
  width:${puzzleCellDimension.toString() + "px"};
  height:${puzzleCellDimension};

  border: 1px dashed gray;
  margin: 1px;
  display: inline-block;
  padding: 0;
  aspect-ratio: 1;
`;


export const OptionGrid = styled.div`
  width: ${(puzzleCellDimension * 4 + 16).toString() + "px"};
  height: ${(puzzleCellDimension * 2 + 8).toString() + "px"};
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
  background-color: ${(props) => (props.isCorrect ? "green"  : (props.isWrong ? "red" : (props.selected ? "blue" :  "none")))};
  margin: 1px;
  display: inline-block;
  padding: 0;
  aspect-ratio: 1;
  
 /*  &:hover {
    border-color: green;
    border-style: solid;
    background-color: green;
  } */
`;

export const MainPart = styled.div`
  font-size: 1em;
  box-sizing: border-box;
  margin-bottom: 10%;
  text-align: left;
`;
