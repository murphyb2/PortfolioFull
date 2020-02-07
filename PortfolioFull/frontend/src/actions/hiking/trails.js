import axios from "axios";
import { UPDATE_USER_OPTIONS, GET_TRAILS } from "../types";

// Update user entered location
export const updateUserOptions = options => dispatch => {
  dispatch({
    type: UPDATE_USER_OPTIONS,
    payload: options
  });
};

// Get trails based on user entered location
export const getNearbyTrails = (location, dist, results) => dispatch => {
  axios
    .get("https://www.hikingproject.com/data/get-trails", {
      params: {
        lat: location[0],
        lon: location[1],
        maxDistance: dist,
        maxResults: results,
        key: "200462394-f52578031e3e05e015044245f248eff4"
      }
    })
    .then(res => {
      dispatch({
        type: GET_TRAILS,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};
