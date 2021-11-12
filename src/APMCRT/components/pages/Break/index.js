import React from "react";
import { BreakContainer, TimerContainer, ButtonLine, NextButton, MainPart } from "./styles";
import { useHistory } from "react-router-dom";
import { appBasePath } from "../../../config/paths";
import { getUser } from "../../../Store/user/accessors";
import { setUserDetails } from "../../../Store/user/actions";
import { Context } from "../../../Store";
import { changePage } from "../../../services/logging";
import { editUser } from "../../../services/firebaseFunctions"

function Break() {
  const [resetTimer, setResetTimer] = React.useState(false)
  const { state, dispatch } = React.useContext(Context);
  let history = useHistory()
  const [timeTaken, setTimeTaken] = React.useState(5 * 60)
  function reset() {
    setTimeTaken(0)
  }
  function gotoNextPage() {
    let ci = getUser(state).currentIteration + 1
    editUser(getUser(state).uid, { currentIteration: ci }).then(() => {
      changePage(getUser(state).uid, ci === 3 ? "feedback/start" : "task/start", (nextposition) => {
        setUserDetails({ ...getUser(state), position: nextposition })(dispatch)
        setUserDetails({ ...getUser(state), currentIteration: ci })(dispatch)
        history.push(appBasePath + nextposition)
        setResetTimer(true)
      })
    })
  }
  React.useEffect(() => {
    let myInterval = setInterval(() => {
      setTimeTaken(timeTaken - 1)
      if (timeTaken < 0) {
        reset()
        alert("Break is over. Please continue the experiment.")
        gotoNextPage()
      }
    }, 1000)
    return () => {
      clearInterval(myInterval);
    };
  }); // eslint-disable-line react-hooks/exhaustive-deps
  React.useEffect(() => {
    if (resetTimer) {
      reset()
      setResetTimer(false)
    }
  }, [resetTimer])  // eslint-disable-line react-hooks/exhaustive-deps

  function pad(num) {
    num = num.toString();
    while (num.length < 2) num = "0" + num;
    return num;
  }
  function pprint(t) {
    if (t < 0) return "00:00:00"
    let h = Math.floor(t / 3600);
    let min = Math.floor((t % 3600) / 60);
    let sec = Math.floor(t % 60);
    return pad(h) + ":" + pad(min) + ":" + pad(sec);
  }
  return <BreakContainer>
    <MainPart>
      Please take a break of at least 5 minutes before continuing to the next task.
      A timer is provided below for reference.
    </MainPart>

    <ButtonLine>
      {timeTaken > 0 ?
        <TimerContainer>
          {pprint(timeTaken)}
        </TimerContainer> :
        <NextButton onClick={gotoNextPage} >
          Next
        </NextButton>
      }
    </ButtonLine>
  </BreakContainer>;
}
export default Break;
