import React, { Fragment, useEffect } from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "../layout/Header";
import ProjectSplash from "./ProjectSplash";
import ProjectDetail from "./ProjectDetail";

const Projects = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={ProjectSplash} />
          <Route path="/projects/:id" component={ProjectDetail} />
        </Switch>
      </div>
    </>
  );
};

export default Projects;
