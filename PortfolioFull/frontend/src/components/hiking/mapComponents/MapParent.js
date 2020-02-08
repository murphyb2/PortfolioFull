import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import MapContainer from "./MapContainer";
import PropTypes from "prop-types";

export class MapParent extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired,
    nearbyTrails: PropTypes.array,
    maxDistance: PropTypes.number.isRequired,
    maxResults: PropTypes.number.isRequired
  };

  render() {
    // Pass the user entered location to the map for rendering.
    // This separates connect with the Google Maps API and avoids
    // the need for exporting multiple wrappers in one component
    // parameters = [this.props.userLocation, this.props.nearbyTrails];
    if (this.props.nearbyTrails === null) {
      return <Fragment />;
    }
    return (
      <MapContainer
        // styles={containerStyles}
        // userLocation={this.props.userLocation}
        // nearbyTrails={this.props.nearbyTrails}
        {...this.props}
      />
    );
  }
}
const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation,
  nearbyTrails: state.trailsReducer.nearbyTrails.trails,
  maxResults: state.trailsReducer.maxResults,
  maxDistance: state.trailsReducer.maxDistance
});

export default connect(mapStateToProps)(MapParent);
