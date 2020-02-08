import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Footer extends Component {
  render() {
    var year = new Date().getFullYear(); //Current Year
    return (
      <footer className="my-3 mx-auto text-center">
        <div className="col mx-auto">
          Powered by:{" "}
          <a href="https://www.hikingproject.com/data" target="_blank">
            Hiking Project Data API
          </a>
        </div>
        <div className="col mx-auto">Bryan Murphy &copy; {year}</div>
      </footer>
    );
  }
}

export default Footer;
