import Timer from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("Timer", () => {
  it("should render correctly", () => {
    let TimerSnapshot = shallow(<Timer />);
    expect(TimerSnapshot).toMatchSnapshot();
  });
});