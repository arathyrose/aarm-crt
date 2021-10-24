import APMCRT from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("APMCRT", () => {
  it("should render correctly", () => {
    let APMCRTSnapshot = shallow(<APMCRT />);
    expect(APMCRTSnapshot).toMatchSnapshot();
  });
});