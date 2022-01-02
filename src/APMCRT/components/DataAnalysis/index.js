import React from "react";
import { DataAnalysisContainer } from "./styles";
import { Route, Switch } from "react-router-dom";
import { appBasePath } from "../../config/paths";
import NavBar from "../NavBar"
import AnotherPage from "../pages/AnotherPage"
function DataAnalysis(props) {
   let currentPath = appBasePath + "dataanalysis/"
   console.log("Current Path",currentPath)
  return <DataAnalysisContainer>
 

    <NavBar />
    <div>
      The data analysis part will be done later.
      
      However, you may be able to download the json file containing the data soon.
    </div>
    <Switch>
      <Route path={currentPath} component={AnotherPage} />
    </Switch>
  </DataAnalysisContainer>;
}

export default DataAnalysis;