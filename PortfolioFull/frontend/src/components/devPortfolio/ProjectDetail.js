import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectDetail } from "../../actions/projects";
import { useParams } from "react-router-dom";

const ProjectDetail = () => {
  // Get the project ID from the URL ID parameter
  let { id } = useParams();

  const dispatch = useDispatch();

  // Only dispatch the redux action if the url ID parameter changes
  const project = useSelector((state) => state.projectReducer.projectDetail);
  useEffect(() => {
    dispatch(getProjectDetail(id));
  }, [id]);

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          {/* Title line row */}
          <div className="container">
            <div className="row">
              {/* <div className="col"> */}
              {/* Smaller text for smaller screens */}
              <h1 className="d-none d-lg-block">{project.name}</h1>
              <h3 className="d-lg-none">{project.name}</h3>
              {project.tags ? (
                project.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="mx-1 my-auto badge badge-light border"
                  >
                    {tag.tech}
                    <img
                      src={tag.icon}
                      className="mx-1"
                      width="auto"
                      height="15"
                      alt=""
                    />
                  </span>
                ))
              ) : (
                <h5></h5>
              )}
              {/* </div> */}
            </div>
          </div>

          {/* One column. Image to left. Links and description to right. */}
          <div className="container">
            <div className="row mt-3">
              {/* Left Column with image */}
              <div className="col-lg mb-3 mb-lg-0 mb-xl-0">
                <img src={project.cover_image} className="img-fluid" alt="" />
              </div>
              {/* Right column. Link on top. Description below. */}
              <div className="col-lg">
                {/* If In Progress, two columns with badge to left, link to right
                  Otherwise just one column with link */}
                <div className="row">
                  {project.url && (
                    <a
                      className="btn btn-primary"
                      href={project.url}
                      target="_blank"
                      role="button"
                    >
                      Visit Site
                    </a>
                  )}
                </div>
                {/* Right column with description and In Progress tag if applicable */}
                <div className="row mt-md-3 mt-1">
                  <p>
                    {project.inProgress > 0 && (
                      <span className="badge badge-secondary mr-2">
                        In Progress
                      </span>
                    )}
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectDetail;
