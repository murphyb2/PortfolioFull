import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";

static propTypes = {
  projects: PropTypes.array.isRequired,
  getProjects: PropTypes.func.isRequired
};

export default function ProojectSplash() {

  return (
    <Fragment>
      <div className="row">
        {this.props.projects.map(project => (
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
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
}
