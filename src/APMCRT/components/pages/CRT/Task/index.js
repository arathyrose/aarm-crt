import React from "react";
import { PuzzleContainer, MainPart, ButtonLine, NextButton, ClearButton } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../../config/paths";
import { getUser } from "../../../../Store/user/accessors";
import { setUserDetails } from "../../../../Store/user/actions";
import { Context } from "../../../../Store";
import DrawingArea from "../../../CRTDrawingArea";
import { changePage, clearCRT } from "../../../../services/logging";
import Timer from "../../../Timer";

function PuzzlePage() {
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [saveImage, setSaveImage] = React.useState(false)
  const [clear, setClear] = React.useState(false)
  const [resetTimer, setResetTimer] = React.useState(false)
  return (
    <PuzzleContainer>
      <Timer resetTimer={resetTimer} />
      <MainPart>
        <DrawingArea saveImage={saveImage}
          setSaveImage={setSaveImage}
          uid={getUser(state).uid}
          clear={clear}
          setClear={setClear}
          currentIteration={getUser(state).currentIteration}
        />
        <ButtonLine>
          <ClearButton onClick={() => {
            clearCRT(getUser(state).uid)
            setClear(true)
          }}>
            Clear
          </ClearButton>
          <NextButton onClick={() => {
            setSaveImage(true)
            //  while (saveImage === true);
            changePage(getUser(state).uid, "crt/end", (nextposition) => {
              setUserDetails({ ...getUser(state), position: nextposition })(dispatch);
              history.push(appBasePath + nextposition)
              setResetTimer(true)
            })
          }} >
            Next
          </NextButton>
        </ButtonLine>
      </MainPart>
    </PuzzleContainer>
  );
}
export default PuzzlePage;
