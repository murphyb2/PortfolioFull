import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjects } from "../../actions/projects";
import ReactGA from "react-ga";

const ProjectSplash = () => {
  // Perform redux actions with useDispatch
  const dispatch = useDispatch();

  // Read the state using useSelector
  const projects = useSelector((state) => state.projectReducer.projects);

  // Similar to componentDidMount lifecycle method
  // Empty array argument prevents this from updating constantly
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  return (
    <Fragment>
      <div className="row">
        {projects.map((project) => (
          <div
            key={project.id}
            className="col-xl-6 col-6 w-auto mt-1"
            // className="col-6 col-md col-lg col-xl w-auto my-1"
          >
            <div className="card border-0 text-center mb-5">
              <h4 className="lead d-none d-sm-block card-title">
                {project.name}
              </h4>
              <h6 className="lead d-sm-none card-title">
                {project.short_title}
              </h6>
              <NavLink to={`/projects/${project.id}`}>
                <img src={project.cover_image} className="card-img" alt="" />
              </NavLink>
              <div className="text-muted">
                {project.tags.map((tag) => (
                  <span key={tag.id} className="badge badge-light border">
                    <img src={tag.icon} width="auto" height="20" alt="" />
                  </span>
                ))}
              </div>
              {/* <div className="card-body py-0 mx-auto mb-0 mt-1"> */}

              {/* </div> */}

              <div className="card-body mx-auto px-1">
                <NavLink
                  key={project.id}
                  className="btn btn-success mx-2 d-inline"
                  role="button"
                  to={`/projects/${project.id}`}
                >
                  Details
                </NavLink>
                {project.url && (
                  <ReactGA.OutboundLink
                    eventLabel={project.short_title}
                    className="btn btn-primary d-none d-lg-inline"
                    to={project.url}
                    target="_blank"
                    role="button"
                  >
                    Visit Site
                  </ReactGA.OutboundLink>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSplash;
