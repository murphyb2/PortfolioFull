import React, { Component } from "react";

const Footer = () => {
  var year = new Date().getFullYear(); //Current Year

  return (
    <footer className="my-3 mx-auto text-center">
      Bryan Murphy &copy; {year}
    </footer>
  );
};

export default Footer;
