import React, { Fragment, useEffect } from "react";

import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import ProjectSplash from "./ProjectSplash";
import ProjectDetail from "./ProjectDetail";
import About from "./About";

const Projects = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/" component={ProjectSplash} />
          <Route path="/projects/:id" component={ProjectDetail} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default Projects;
