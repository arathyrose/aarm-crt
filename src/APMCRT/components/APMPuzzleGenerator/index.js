import React from "react";
import { APM_puzzle, traditionalPuzzleElements, } from './constructPuzzle/main'
import { OptionGrid, OptionItem, PuzzleContainer, PuzzleGrid, PuzzleItem, ErrorImportant } from "./styles";


function Puzzle({ type, APMID, selectedOption, setSelectedOption, disabled, previouslySelectedOptions, setAnswer }) {
    const APM_Puzzle_Elements = APM_puzzle[APMID]
    //  console.log(type, APMID, APM_Puzzle_Elements)
    setAnswer('O' + APM_Puzzle_Elements.correctOption.toString())
    const [show, setShow] = React.useState(false)
    const [device, setDevice] = React.useState(!!navigator.maxTouchPoints ? 'mobile' : 'computer')
    const [orientation, setOrientation] = React.useState(!navigator.maxTouchPoints ? 'desktop' : !window.screen.orientation.angle ? 'portrait' : 'landscape')

    React.useEffect(() => {
        const detectListener = window.addEventListener("resize", () => {
            setDevice(!!navigator.maxTouchPoints ? 'mobile' : 'computer')
            setOrientation(!navigator.maxTouchPoints ? 'desktop' : !window.screen.orientation.angle ? 'portrait' : 'landscape')
        })
        if (orientation == 'desktop') setShow(true)
        else if (orientation == 'portrait') {
            if (type == 'T') setShow(true)
            else setShow(false)
        }
        else {
            if (type == 'T') setShow(false)
            else setShow(true)
        }
    }, [orientation, device])

    if (!show) {
        return <ErrorImportant> Please rotate your screen to perform the experiment. </ErrorImportant>
    }
    else
        if (type == "T")
            return <PuzzleContainer>
                <PuzzleGrid>
                    {traditionalPuzzleElements.puzzle.map((elementid) => {
                        let puzzleCell = APM_Puzzle_Elements.makeShape(APM_Puzzle_Elements.puzzleCells[elementid])
                        if (elementid == 'F33')
                            return <PuzzleItem id={elementid} key={elementid}>
                                <svg
                                    height={"100%"} width={"100%"}
                                    viewBox={`0 0 200 200`}
                                >
                                </svg>
                            </PuzzleItem>
                        else
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
                        let isWrong = previouslySelectedOptions.includes(elementid)
                        let isCorrect = previouslySelectedOptions.includes(elementid) && elementid === 'O' + APM_Puzzle_Elements.correctOption.toString()
                        // console.log("Element ID: ", elementid,selected,isWrong,isCorrect , previouslySelectedOptions)
                        return <OptionItem
                            id={elementid} key={elementid}
                            selected={selected}
                            isWrong={isWrong}
                            isCorrect={isCorrect}
                            onClick={disabled == true || isCorrect === true || isWrong == true ? () => { } : () => { setSelectedOption(elementid) }}
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