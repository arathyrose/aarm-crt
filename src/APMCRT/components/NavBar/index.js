import React from "react";
import { NavBarContainer, Nav, NavLogo, NavBtnLink } from "./styles";
import { FaQuestion } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { positionNavHeaders } from "./config"

function NavBar({ helpFunction = () => { alert("Click anywhere to continue") } }) {
  const location = useLocation();
  console.log(location)
  let currentPathName = location.pathname
  let position = positionNavHeaders["/" + currentPathName]
  if (position === undefined) position = "APM CRT Task"
  console.log(currentPathName, positionNavHeaders[currentPathName.substring(1)])

  function transformPathName(pathName) {
    pathName = pathName.split('/').slice(1, 3)
    return pathName[0] + '/' + pathName[1]
  }

  return (
    <NavBarContainer>
      <Nav>
        <NavLogo> {positionNavHeaders[transformPathName(currentPathName)] ? positionNavHeaders[transformPathName(currentPathName)] : "APM CRT Task"} </NavLogo>
        <NavBtnLink onClick={helpFunction}> <FaQuestion /> </NavBtnLink>
      </Nav>
    </NavBarContainer>
  );
}
export default NavBar;
