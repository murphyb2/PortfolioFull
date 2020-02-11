import React, { Fragment, useEffect } from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import ProjectSplash from "./ProjectSplash";
import ProjectDetail from "./ProjectDetail";
import About from "./About";

const Projects = () => {
  return (
    <>
      <div className="container">
        <Switch>
          <Route exact path="/" component={ProjectSplash} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </>
  );
};

export default Projects;
