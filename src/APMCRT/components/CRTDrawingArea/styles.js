import styled from "styled-components";
import colors from "../../config/colors";

export const MenuRow = styled.div`
  width: 100%;
  height: 40px;
  justify-content: center;
  padding: 2%;
  background-color: ${colors.primary};
  align-items: center;
  box-sizing: border-box;
  text-align: center;
`;

export const MenuButton = styled.div`
  height: 100%;
  box-sizing: border-box;
  border-width: 2px;
  float: left;
  width: 14%;
  color: ${colors.bgColor};
  padding: 5px;
  align-items: center;
  justify-content: center;
  text-align: center;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;
