import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Router, Route, Switch } from "react-router";

import Dashboard from "./devPortfolio/Dashboard";
import Hiking from "./hiking/Hiking";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <div className="container">
            <Switch>
              <Route path="/hiking" component={Hiking} />
              <Route path="/projects/" component={Dashboard} />
            </Switch>
          </div>
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
