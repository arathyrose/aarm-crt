import DataAnalysis from "../index";
import { shallow } from "enzyme";
import React from 'react';
describe("DataAnalysis", () => {
  it("should render correctly", () => {
    let DataAnalysisSnapshot = shallow(<DataAnalysis />);
    expect(DataAnalysisSnapshot).toMatchSnapshot();
  });
});