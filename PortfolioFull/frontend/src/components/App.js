// React
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Redux
import { Provider } from "react-redux";
import store from "../store";

// App Components
import ProjectSplash from "./devPortfolio/ProjectSplash";
import Hiking from "./hiking/Hiking";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <>
              <div className="container">
                <Switch>
                  <Route path="/" component={ProjectSplash} />
                  <Route path="/hiking" component={Hiking} />
                </Switch>
              </div>
              {/* <Footer /> */}
            </>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
