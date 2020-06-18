import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { getProjects } from "../../actions/projects";

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
            className="col-6 col-md col-lg col-xl w-auto my-3"
          >
            <div className="card">
              <NavLink to={`/projects/${project.id}`}>
                <img
                  src={project.cover_image}
                  className="card-img-top"
                  alt=""
                />
              </NavLink>
              <div className="card-body py-0 mx-auto mb-0 mt-1">
                <h5 className="d-none d-sm-block card-title mb-0 ">
                  {project.short_title}
                </h5>
                <h6 className="d-sm-none card-title mb-0 ">
                  {project.short_title}
                </h6>
              </div>
              <div className="card-body mx-auto px-1">
                <NavLink
                  key={project.id}
                  className="btn btn-success mx-2 d-inline"
                  role="button"
                  to={`/projects/${project.id}`}
                >
                  Details
                </NavLink>
                <a
                  className="btn btn-primary d-none d-lg-inline"
                  href={project.url}
                  target="_blank"
                  role="button"
                >
                  Visit Site
                </a>
              </div>
              <div className="card-footer text-muted">
                {project.tags.map((tag) => (
                  <span key={tag.id} className="mx-1 badge badge-light border">
                    {tag.tech}
                    <img
                      src={tag.icon}
                      className="mx-1"
                      width="auto"
                      height="15"
                      alt=""
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default ProjectSplash;
