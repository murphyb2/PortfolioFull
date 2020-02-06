import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Footer extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    var year = new Date().getFullYear(); //Current Year
    return (
      <footer className="my-3 mx-auto text-center">
        Bryan Murphy &copy; {year}
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(Footer);
