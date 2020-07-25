import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNearbyTrails } from "../../../actions/hiking/trails";

const TrailResults = apiKey => {
  const dispatch = useDispatch();

  const userLocation = useSelector(state => state.trailsReducer.userLocation);
  const nearbyTrails = useSelector(
    state => state.trailsReducer.nearbyTrails.trails
  );
  const maxDistance = useSelector(state => state.trailsReducer.maxDistance);
  const maxResults = useSelector(state => state.trailsReducer.maxResults);

  const [featuredHikes, setFeaturedHikes] = useState([]);
  const [normalHikes, setNormalHikes] = useState([]);

  useEffect(() => {
    // js is weird..
    if (apiKey.apiKey != "") {
      dispatch(
        getNearbyTrails(userLocation, maxDistance, maxResults, apiKey.apiKey)
      );
    }
  }, [apiKey.apiKey, userLocation, maxDistance, maxResults]);

  useEffect(() => {
    if (nearbyTrails) {
      setFeaturedHikes(
        nearbyTrails.filter(trail => trail.type == "Featured Hike")
      );
      setNormalHikes(nearbyTrails.filter(trail => trail.type == "Trail"));
    }
  }, [nearbyTrails]);

  if (!nearbyTrails) {
    return <Fragment />;
  }
  // If the API returned zero results, display a message to expand the search options
  if (nearbyTrails.length < 1) {
    return (
      <h4 className="text-center">
        No trails found! Try expanding your search radius...
      </h4>
    );
  }

  return (
    <Fragment>
      <div className="container mt-4">
        {/* Featured Hikes */}
        {featuredHikes.map(trail => (
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
        {normalHikes.map(trail => (
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
};

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

export default TrailResults;
