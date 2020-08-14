import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../../actions/about";
import { DocModal } from "./DocModal";

const About = () => {
  const dispatch = useDispatch();
  const about = useSelector((state) => state.aboutReducer.aboutContent);

  useEffect(() => {
    dispatch(getAbout(1));
  }, []);

  const { description, prof_pic, resume, certs } = about;

  return (
    <Fragment>
      <div className="row">
        <div className="col">
          {/* BIO */}
          <div className="row">
            <div className="col">
              {/* Smaller text for smaller screens */}
              <h1 className="d-none d-lg-block">About</h1>
              <h3 className="d-none d-lg-block">Bio/</h3>
              <h3 className="d-lg-none">About</h3>
              <h4 className="d-lg-none">Bio/</h4>
              <div className="row">
                <div className="col-1" />
                <div className="col-lg-5 mb-3 mb-lg-0 mb-xl-0">
                  <img src={prof_pic} className="img-fluid" alt="" />
                </div>
                <div className="col-lg-5">
                  <div>{description}</div>
                </div>
              </div>
              <div className="col-1" />
            </div>
          </div>
          {/* DOCS */}
          <h3>Docs/</h3>
          <div className="row">
            <div className="col">
              <h4>Resume/</h4>
              <div className="row">
                <div className="col">
                  <div className="row justify-content-center my-2">
                    <DocModal doc={resume} title="Resume" />
                  </div>
                </div>
              </div>
              <h4>Certs/</h4>
              <div className="row">
                <div className="col">
                  {certs
                    ? certs.map((cert) => (
                        <div
                          key={cert.id}
                          className="row justify-content-center my-3"
                        >
                          <DocModal doc={cert.doc} title={cert.title} />
                        </div>
                      ))
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
