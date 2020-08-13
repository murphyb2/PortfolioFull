import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAbout } from "../../actions/about";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const About = () => {
  const dispatch = useDispatch();
  const about = useSelector((state) => state.aboutReducer.aboutContent);

  useEffect(() => {
    dispatch(getAbout(1));
  }, []);

  const { description, prof_pic, resume } = about;

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
          <div className="row">
            <div className="col">
              <h3>Docs/</h3>
              <div className="row">
                <div className="col">
                  Resume
                  <Document file={resume} className="mx-auto">
                    <Page pageNumber={1} />
                  </Document>
                </div>
                <div className="col">
                  Certs
                  <Document file={resume} className="mx-auto">
                    <Page pageNumber={1} />
                  </Document>
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
