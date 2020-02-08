import React, { Component } from "./node_modules/react";
import { connect } from "./node_modules/react-redux";
import PropTypes from "./node_modules/prop-types";
import { updateUserOptions } from "../../actions/trails";

import Geocode from "./node_modules/react-geocode";

export class GeocodeContainer extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired,
    updateUserOptions: PropTypes.func.isRequired,
    maxResults: PropTypes.number.isRequired,
    maxDistance: PropTypes.number.isRequired
  };

  state = {
    address: "",
    localMaxDistance: 10,
    localMaxResults: 10
  };

  onSubmit = e => {
    const { localMaxDistance, localMaxResults } = this.state;
    e.preventDefault();

    // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
    Geocode.setApiKey("AIzaSyDJmck0cGFO7NBL1YV2bUkYyCetBlOp1-Y");
    // Geocode.enableDebug();
    // Get latidude & longitude from address.
    Geocode.fromAddress(this.state.address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        // Update search box with formatted address
        this.setState({ address: response.results[0].formatted_address });

        var location = [lat, lng];
        var options = [location, localMaxDistance, localMaxResults];
        this.props.updateUserOptions(options);
      },
      error => {
        console.log(error);
      }
    );
  };

  // Update local state with typed address
  onChange = e => {
    this.setState({ address: e.target.value });
  };

  // Update max distance option
  setMaxDist = e => {
    e.preventDefault();
    this.setState({ localMaxDistance: Number(event.target.value) });
  };
  // Update max results option
  setMaxResults = e => {
    e.preventDefault();
    this.setState({ localMaxResults: Number(event.target.value) });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="address"
          style={{ padding: "5px", zIndex: "1" }} // Need zIndex so textbox renders on top and allows typing
          placeholder="Enter address, zip code, city or state..."
          value={this.state.address}
          onChange={this.onChange}
          className="form-control mb-2"
        />
        <div className="form-group">
          <label htmlFor="selectResults">Max Results</label>
          <select
            id="selectResults"
            value={this.state.localMaxResults}
            onChange={this.setMaxResults}
            className="custom-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="selectResults">Max Distance</label>
          <select
            value={this.state.localMaxDistance}
            onChange={this.setMaxDist}
            className="custom-select"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <input
          type="submit"
          value="Submit"
          className="btn btn-info"
          style={{ zIndex: "1" }} // Need zIndex so submit button renders on top and allows click
        />
      </form>
    );
  }
}

const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation,
  maxResults: state.trailsReducer.maxResults,
  maxDistance: state.trailsReducer.maxDistance
});

export default connect(mapStateToProps, { updateUserOptions })(
  GeocodeContainer
);
