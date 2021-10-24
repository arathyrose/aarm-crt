import React from "react";
import { PuzzleContainer, MainPart, ErrorMessage, ButtonLine, ClearButton, NextButton } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { APM_IDs } from "../../../APMPuzzleGenerator/constructPuzzle/main";
import Puzzle from "../../../APMPuzzleGenerator";
import { changePage, clearPuzzle, endPuzzle, startPuzzle, submitPuzzle } from "../../../../services/logging";
import Timer from "../../../Timer";
import ProgressBar from "../../../ProgressBar"

function PuzzlePage() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [selectedOption, setSelectedOption] = React.useState("");
  let nunberPath = useLocation().pathname.split("/").slice(3);
  const [currentNo, setCurrentNo] = React.useState(parseInt(nunberPath) ? parseInt(nunberPath) : 1)
  const { uid, APMType } = getUser(state);
  const [resetTimer, setResetTimer] = React.useState(false)
  const [currentPuzzleSetup, setCurrentPuzzleSetup] = React.useState([["", "", ""], ["", "", ""], ["", "", ""]]);
  const [currentOptions, setCurrentOptions] = React.useState(undefined);
  const [fillable, setFillable] = React.useState(undefined);


  const [error, setError] = React.useState("");

  return (
    <PuzzleContainer>
      <MainPart>
        <ProgressBar />
        <Timer resetTimer={resetTimer} setResetTimer={setResetTimer} />
        <Puzzle
          apmType={APMType}
          APMID={APM_IDs.VA[currentNo - 1]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          uid={uid}
          currentPuzzleSetup={currentPuzzleSetup}
          setCurrentPuzzleSetup={setCurrentPuzzleSetup}
          currentOptions={currentOptions}
          setCurrentOptions={setCurrentOptions}
          setFillable={setFillable}
          fillable={fillable}
        />
        <ButtonLine>
          <ClearButton onClick={() => {
            setSelectedOption('')
            clearPuzzle(uid)
          }} >
            Clear
          </ClearButton>
          <NextButton onClick={() => {
            submitPuzzle(uid)
            let errorState = false
            if (APMType === 'T') {
              if (selectedOption === '') {
                alert("Please complete the task")
                setError("Please complete the task")
                errorState = true
              }
            }
            else {
              for (let i = 0; i < 3; i++)
                for (let j = 0; j < 3; j++)
                  if (fillable[i][j] !== '' && currentPuzzleSetup[i][j] === '')
                    errorState = true
              if (errorState === true)
                alert("Please complete the task")
              setError("Please complete the task")
            }

            if (errorState === false) {
              setError("")
              endPuzzle(uid)
              changePage(uid, (currentNo < 6) ? "task/puzzle/" + (currentNo + 1).toString() : "task/end", (nextposition) => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
                setCurrentNo(currentNo + 1)
                setSelectedOption('')
                startPuzzle(uid)
                setResetTimer(true)
              })
            }
          }} >
            Next
          </NextButton>
        </ButtonLine>
        {error !== "" ? <ErrorMessage>{error}</ErrorMessage> : <span></span>}
      </MainPart>
    </PuzzleContainer>
  );
}
export default PuzzlePage;
