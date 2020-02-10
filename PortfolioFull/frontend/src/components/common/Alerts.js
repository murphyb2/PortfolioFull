import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };
  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
      if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
      if (error.msg.url) alert.error(`URL: ${error.msg.url.join()}`);
      if (error.msg.description)
        alert.error(`Description: ${error.msg.description.join()}`);
      // if (error.msg.message) {
      //   alert.error(`Message: ${error.msg.message.join()}`);
      // }
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
      if (error.msg.username) alert.error(error.msg.username.join());
    }

    if (message !== prevProps.message) {
      if (message.deleteProject) alert.success(message.deleteProject);
      if (message.addProject) alert.success(message.addProject);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = state => ({
  error: state.errorReducer,
  message: state.messagesReducer
});

export default connect(mapStateToProps)(withAlert()(Alerts));
