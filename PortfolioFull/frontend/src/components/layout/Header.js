import React, { useEffect, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import { getProjects } from "../../actions/projects";

const Header = () => {
  // Perform redux actions with useDispatch
  const dispatch = useDispatch();

  // Read the state using useSelector
  const projects = useSelector(state => state.projectReducer.projects);

  // Similar to componentDidMount lifecycle method
  // Empty array argument prevents this from updating constantly
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const socialButtons = (
    <div className="float-right">
      <a
        target="_blank"
        href="https://www.linkedin.com/in/bryan-murphy-664020a0/"
        role="button"
        className="btn btn-primary mx-2"
      >
        <i className="fab fa-linkedin-in" />
      </a>
      <a
        target="_blank"
        href="https://github.com/murphyb2"
        role="button"
        className="btn btn-secondary mx-2"
      >
        <i className="fab fa-github" />
      </a>

      <a
        target="_blank"
        href="https://www.instagram.com/thecrimsonnchin/"
        role="button"
        className="btn btn-success mx-2"
      >
        <i className="fab fa-instagram" />
      </a>
    </div>
  );

  return (
    <Fragment>
      <div className="container-fluid bg-light">
        <div className="col-fluid">
          <div className="jumbotron-fluid py-3">
            <div className="container">
              <div className="row">
                <Link className="text-decoration-none" to="/">
                  <h1 className="text-primary font-weight-bold d-none d-lg-inline">
                    Bryan Murphy
                  </h1>
                  {/* Smaller text for smaller screens */}
                  <h2 className="text-primary font-weight-bold d-lg-none">
                    Bryan Murphy
                  </h2>
                  <h4 className="lead d-inline"> / Software Engineer</h4>
                </Link>
              </div>
              {/* <div className="row">
                  <div className="col-8">
                    <p className="lead">Software Engineer</p>
                  </div>
                  <div className="col-4">{socialButtons}</div>
                </div> */}
            </div>
            <hr className="my-2" />

            <div className="row">
              <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light p-0">
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo02"
                  >
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item">
                        <NavLink className="nav-link text-secondary" to="/">
                          Home<span className="sr-only">(current)</span>
                        </NavLink>
                      </li>

                      <li className="nav-item dropdown">
                        <a
                          className="nav-link dropdown-toggle"
                          href="#"
                          id="navbarDropdownMenuLink"
                          role="button"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Projects
                        </a>
                        <div
                          className="dropdown-menu"
                          aria-labelledby="navbarDropdownMenuLink"
                        >
                          {projects.map(project => (
                            <NavLink
                              key={project.id}
                              className="dropdown-item text-secondary"
                              to={`/projects/${project.id}`}
                            >
                              {project.name}
                            </NavLink>
                          ))}
                        </div>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link text-secondary"
                          tabIndex="-1"
                          aria-disabled="true"
                          to="/about"
                        >
                          About
                        </NavLink>
                      </li>
                    </ul>
                    {socialButtons}
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {isAuthenticated ? authLinks : guestLinks} */}
    </Fragment>
  );
};

export default Header;
