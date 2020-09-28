// React
import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  //   HashRouter as Router,
  Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { createHashHistory } from "history";

// Redux
import { Provider } from "react-redux";
import store from "../store";

// App Components
import Projects from "./devPortfolio/Projects";

import Hiking from "./hiking/Hiking";

// React GA - Google Analytics
import ReactGA from "react-ga";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center",
};

const history = createHashHistory();

class App extends Component {
  componentDidMount() {
    ReactGA.initialize("UA-128907823-1");
    ReactGA.pageview("/");
    history.listen((location) => ReactGA.pageview(location.pathname));
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <>
            <Switch>
              {/* Order matters here.. Hiking app doesnt use the same header/footer */}
              <Route exact path="/hiking" component={Hiking} />
              <Route path="/">
                <Projects />
              </Route>
            </Switch>
          </>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
