import React, { useEffect, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../../actions/auth";
import { getProjects } from "../../../actions/projects";
import ReactGA from "react-ga";

const Header = () => {
  // Perform redux actions with useDispatch
  const dispatch = useDispatch();

  // Read the state using useSelector
  const projects = useSelector((state) => state.projectReducer.projects);

  // Similar to componentDidMount lifecycle method
  // Empty array argument prevents this from updating constantly
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const socialButtons = (
    <div className="float-right">
      <ReactGA.OutboundLink
        eventLabel="LinkedIn"
        target="_blank"
        to="https://www.linkedin.com/in/bryan-murphy-664020a0/"
        role="button"
        className="btn btn-primary"
      >
        <i className="fab fa-linkedin-in" />
      </ReactGA.OutboundLink>
      <ReactGA.OutboundLink
        eventLabel="GitHub"
        target="_blank"
        to="https://github.com/murphyb2"
        role="button"
        className="btn btn-secondary"
      >
        <i className="fab fa-github" />
      </ReactGA.OutboundLink>

      <ReactGA.OutboundLink
        eventLabel="Instagram"
        target="_blank"
        to="https://www.instagram.com/thecrimsonnchin/"
        role="button"
        className="btn btn-success"
      >
        <i className="fab fa-instagram" />
      </ReactGA.OutboundLink>
    </div>
  );

  return (
    <Fragment>
      <div className="container-fluid bg-light border-0">
        <div className="col-fluid">
          <div className="jumbotron-fluid pt-3">
            <div className="container">
              <div className="row">
                <Link className="text-decoration-none mx-auto" to="/">
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
            {/* <hr className="my-2" /> */}

            <div className="row">
              <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-0 border-0">
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
                          {projects.map((project) => (
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
