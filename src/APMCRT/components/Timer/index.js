import React from "react";
import { TimerContainer } from "./styles";

function Timer({ resetTimer, setResetTimer }) {
  const [timeTaken, setTimeTaken] = React.useState(0)
  function reset() {
    setTimeTaken(0)
  }
  React.useEffect(() => {
    let myInterval = setInterval(() => {
      setTimeTaken(timeTaken + 1)
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
    let h = Math.floor(t / 3600);
    let min = Math.floor((t % 3600) / 60);
    let sec = Math.floor(t % 60);
    return pad(h) + ":" + pad(min) + ":" + pad(sec);
  }

  return <TimerContainer>
    {pprint(timeTaken)}
  </TimerContainer>
}
export default Timer;
