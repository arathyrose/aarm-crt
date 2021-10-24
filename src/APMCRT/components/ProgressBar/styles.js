import styled from "styled-components";
import colors from "../../config/colors";

export const ProgressBarContainer = styled.div`
  background: ${colors.bgColor};
  width: 100%;
  height: 3vh;
  max-height: 24px;
  box-sizing: border-box;
  border: 1px solid #999;
`;
export const ProgressBarBar = styled.div`
  background: ${colors.secondary};
  width: ${(props) =>
    (
      ((props.value ? props.value : 0) / (props.total ? props.total : 10)) *
      100
    ).toString() + "%"};
  box-sizing: border-box;
  height: 100%;
`;
