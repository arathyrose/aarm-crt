import React from "react";
import { ProgressBarContainer, ProgressBarBar } from "./styles";
import { useLocation } from "react-router-dom";

function ProgressBar() {
  const location = useLocation();

  function getPathLength(pathName) {
    pathName = pathName.split('/')[3]
    if (pathName) return parseInt(pathName)
    else return undefined
  }

  return (
    <ProgressBarContainer>
      {getPathLength(location.pathname) ?
        <ProgressBarBar total={6} value={getPathLength(location.pathname) - 1} />
        : ""}
    </ProgressBarContainer>
  );
}
export default ProgressBar;
