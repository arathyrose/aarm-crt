import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import SampleApp from "./SampleApp";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "./SampleApp/Store";

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <SampleApp />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
