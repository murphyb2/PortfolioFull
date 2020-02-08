import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getNearbyTrails } from "../../actions/trails";

export class TrailResults extends Component {
  static propTypes = {
    userLocation: PropTypes.array.isRequired,
    getNearbyTrails: PropTypes.func.isRequired,
    nearbyTrails: PropTypes.array,
    maxDistance: PropTypes.number.isRequired,
    maxResults: PropTypes.number.isRequired
  };
  state = {
    featuredHikes: [],
    normalHikes: [],
    prevTrails: [],
    prevMaxDist: 0,
    prevMaxResults: 0,
    prevUserLocation: []
  };
  componentDidMount() {
    const { maxDistance, maxResults, userLocation, nearbyTrails } = this.props;
    // Call API to get nearby trails
    this.props.getNearbyTrails(userLocation, maxDistance, maxResults);
  }
  componentDidUpdate() {
    const { maxDistance, maxResults, userLocation, nearbyTrails } = this.props;
    const {
      prevMaxDist,
      prevMaxResults,
      prevUserLocation,
      prevTrails
    } = this.state;

    // Only get new trails if the props have actually changed
    if (
      !areEqual(prevTrails, nearbyTrails) ||
      maxDistance !== this.state.prevMaxDist ||
      maxResults !== this.state.prevMaxResults ||
      userLocation !== prevUserLocation
    ) {
      // Call API to get nearby trails
      this.props.getNearbyTrails(userLocation, maxDistance, maxResults);

      // Update previous vars
      this.setState({ prevTrails: nearbyTrails });
      this.setState({ prevMaxDist: maxDistance });
      this.setState({ prevMaxResults: maxResults });
      this.setState({ prevUserLocation: userLocation });
    }
  }
  render() {
    if (!this.props.nearbyTrails) {
      return <Fragment />;
    }
    // If the API returned zero results, display a message to expand the search options
    if (this.props.nearbyTrails.length < 1) {
      return (
        <h4 className="text-center">
          No trails found! Try expanding your search radius...
        </h4>
      );
    }

    this.state.featuredHikes = this.props.nearbyTrails.filter(
      trail => trail.type == "Featured Hike"
    );
    this.state.normalHikes = this.props.nearbyTrails.filter(
      trail => trail.type == "Trail"
    );
    return (
      <Fragment>
        <div className="container mt-4">
          {/* Featured Hikes */}
          {this.state.featuredHikes.map(trail => (
            <div className="card my-3" key={trail.id}>
              <h5
                className="card-header"
                //   style={{ backgroundColor: trail.difficulty }}
              >
                <div className="row justify-content-between">
                  <div className="col">
                    <strong>{trail.name}</strong>
                    <div className="">
                      Rating: {trail.stars} stars/{trail.starVotes} Votes
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <strong>{trail.location}</strong>
                    </div>
                    <div className="row">
                      Coordinates: {trail.latitude}, {trail.longitude}
                    </div>
                  </div>
                </div>
              </h5>

              <div className="card-body">
                <div className="row mx-1 mb-2">
                  <p className="card-text">{trail.summary}</p>
                </div>
                <div className="row">
                  <div className="col">
                    <img src={trail.imgSmall} alt="" />
                  </div>
                  <div className="col">
                    <div className="row">Distance: {trail.length} mi</div>
                    <div className="row">
                      Condition Status: {trail.conditionStatus}
                    </div>
                    <div className="row">
                      Condition Details: {trail.conditionDetails}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Normal Hikes */}
          {this.state.normalHikes.map(trail => (
            <div className="card my-3" key={trail.id}>
              <div
                className="card-header"
                //   style={{ backgroundColor: trail.difficulty }}
              >
                <div className="row justify-content-between">
                  <div className="col">
                    {trail.name}
                    <div className="">
                      Rating: {trail.stars} stars/{trail.starVotes} Votes
                    </div>
                  </div>
                  <div className="col">
                    <div className="row">
                      <strong>{trail.location}</strong>
                    </div>
                    <div className="row">
                      Coordinates: {trail.latitude}, {trail.longitude}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <div className="row mx-1 mb-2">
                  <p className="card-text">{trail.summary}</p>
                </div>
                <div className="row">
                  <div className="col">
                    <img src={trail.imgSmall} alt="" />
                  </div>
                  <div className="col">
                    <div className="row">Distance: {trail.length} mi</div>
                    <div className="row">
                      Condition Status: {trail.conditionStatus}
                    </div>
                    <div className="row">
                      Condition Details: {trail.conditionDetails}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Fragment>
    );
  }
}

// Compare two arrays and return if they are equal
const areEqual = (array1, array2) => {
  // Get the value type
  var type = Object.prototype.toString.call(array1);

  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(array2)) return false;

  // If items are not an object or array, return false
  if (["[object Array]", "[object Object]"].indexOf(type) < 0) return false;

  // Check the length
  var len1 =
    type === "[object Array]" ? array1.length : Object.keys(array1).length;
  var len2 =
    type === "[object Array]" ? array2.length : Object.keys(array2).length;
  if (len1 !== len2) return false;

  // Compare properties

  for (var i = 0; i < len1; i++) {
    if (array1[i].id !== array2[i].id) return false;
  }
  // Nothing failed, return true
  return true;
};

const mapStateToProps = state => ({
  userLocation: state.trailsReducer.userLocation,
  nearbyTrails: state.trailsReducer.nearbyTrails.trails,
  maxResults: state.trailsReducer.maxResults,
  maxDistance: state.trailsReducer.maxDistance
});

export default connect(
  mapStateToProps,
  { getNearbyTrails }
)(TrailResults);
