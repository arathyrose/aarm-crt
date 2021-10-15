import React from "react";
import { APM_puzzle, traditionalPuzzleElements, } from './constructPuzzle/main'
import { OptionGrid, OptionItem, PuzzleContainer, PuzzleGrid, PuzzleItem } from "./styles";

function Puzzle({ type, APMID, selectedOption, setSelectedOption, disabled, previouslySelectedOptions, setAnswer }) {
    // console.log(APM_puzzle, type, APMID)
    const APM_Puzzle_Elements = APM_puzzle[APMID]
    setAnswer('O' + APM_Puzzle_Elements.correctOption.toString())
   
    if (type == "T")
        return <PuzzleContainer>
            <PuzzleGrid>
                {traditionalPuzzleElements.puzzle.map((elementid) => {
                    let puzzleCell = APM_Puzzle_Elements.makeShape(APM_Puzzle_Elements.puzzleCells[elementid])
                    return <PuzzleItem id={elementid} key={elementid}>
                        <svg
                            height={"100%"} width={"100%"}
                            viewBox={`0 0 200 200`}
                        >
                            {puzzleCell}
                        </svg>
                    </PuzzleItem>
                })}
            </PuzzleGrid>
            <div style={{ marginBottom: "5%" }}></div>
            <OptionGrid>
                {traditionalPuzzleElements.options.map((elementid) => {
                    let puzzleCell = APM_Puzzle_Elements.makeShape(APM_Puzzle_Elements.puzzleCells[elementid])
                    let selected = elementid === selectedOption
                    let isWrong =  previouslySelectedOptions.includes(elementid)
                    let isCorrect = previouslySelectedOptions.includes(elementid) && elementid === 'O' + APM_Puzzle_Elements.correctOption.toString()
                   // console.log("Element ID: ", elementid,selected,isWrong,isCorrect , previouslySelectedOptions)
                    return <OptionItem
                        id={elementid} key={elementid}
                        selected={selected}
                        isWrong={isWrong}
                        isCorrect={isCorrect}
                        onClick={disabled==true || isCorrect === true ||isWrong==true ? () => { } : () => { setSelectedOption(elementid) }}
                    >
                        <svg
                            height={"100%"} width={"100%"}
                            preserveAspectRatio='xMinYMin slice'
                            viewBox={`0 0 200 200`}
                        >
                            {puzzleCell}
                        </svg>
                    </OptionItem>
                })}
            </OptionGrid>
            <div style={{ marginBottom: "3%" }}></div>
        </PuzzleContainer>
    else
        return <div>
            APM_PUZZLE IN NON_TRADITIONAL FORM!
        </div>
}
export default Puzzle;