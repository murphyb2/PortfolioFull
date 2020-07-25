import React, { useEffect, Fragment } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
// import { getAbout } from "../actions/about";
import { getAbout } from "../../actions/about";

const About = () => {
  const dispatch = useDispatch();
  const about = useSelector(state => state.aboutReducer.aboutContent);

  useEffect(() => {
    dispatch(getAbout(1));
  }, []);
  const { description, prof_pic } = about;
  return (
    <Fragment>
      <div className="row">
        <div className="col">
          <div className="row">
            <div className="col">
              {/* Smaller text for smaller screens */}
              <h1 className="d-none d-lg-block">About</h1>
              <h3 className="d-lg-none">About</h3>
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
              {/* <div className="row">
                  
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
