import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import ProjectSplash from "./devPortfolio/ProjectSplash";
import Hiking from "./hiking/Hiking";

class App extends Component {
  render() {
    return (
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
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
