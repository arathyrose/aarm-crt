import React from "react";
import {
  NavBarContainer,
  Nav,
  NavLogo,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./styles";
import { FaQuestion } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { positionNavHeaders } from "./config"

function NavBar({ position = "APM CRT Task", helpFunction = () => { alert("Click anywhere to continue") } }) {
  let history = useHistory();
  let currentPathName = history.location.pathname
  if (currentPathName[-1] == '/')
    currentPathName = currentPathName.substring(0, currentPathName.length - 1)
  position = positionNavHeaders[currentPathName]
  if (position == undefined) position = "APM CRT Task"
  console.log(currentPathName, position)
  return (
    <NavBarContainer>
      <Nav>
        <NavLogo> {position} </NavLogo>
        <NavBtnLink onClick={helpFunction}> <FaQuestion /> </NavBtnLink>
      </Nav>
    </NavBarContainer>
  );
}
export default NavBar;
