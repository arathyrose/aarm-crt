import React from "react";
import { PuzzleContainer, MainPart, ErrorMessage, ButtonLine, ClearButton, NextButton } from "./styles";
import { useHistory, useLocation } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import { APM_IDs } from "../../../APMPuzzleGenerator/constructPuzzle/main";
import Puzzle from "../../../APMPuzzleGenerator";
import { changePage } from "../../../../services/logging";

function PuzzlePage() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [selectedOption, setSelectedOption] = React.useState("");
  let nunberPath = useLocation().pathname.split("/").slice(3);
  const [currentNo, setCurrentNo] = React.useState(parseInt(nunberPath) ? parseInt(nunberPath) : 1)
  const APMType = getUser(state).APMType;

  const [error, setError] = React.useState("");

  return (
    <PuzzleContainer>
      <MainPart>
        <Puzzle
          apmType={APMType}
          APMID={APM_IDs.VA[currentNo - 1]}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
        <ButtonLine>
          <ClearButton onClick={() => {
            setSelectedOption('')
          }} >
            Clear
          </ClearButton>
          <NextButton onClick={() => {
            if (selectedOption === '') {
              alert("Please complete the task")
              setError("Please complete the task")
            }
            else {
              setError("")
              changePage(getUser(state).uid, (currentNo < 6) ? "task/puzzle/" + (currentNo + 1).toString() : "task/end", (nextposition) => {
                setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
                history.push(appBasePath + nextposition)
                setCurrentNo(currentNo + 1)
                setSelectedOption('')
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
