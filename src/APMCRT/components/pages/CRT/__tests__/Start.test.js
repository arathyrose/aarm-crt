import Start from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("Start", () => {
  it("should render correctly", () => {
    let StartSnapshot = shallow(<Start />);
    expect(StartSnapshot).toMatchSnapshot();
  });
});