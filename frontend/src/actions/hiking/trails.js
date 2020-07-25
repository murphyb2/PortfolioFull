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
export const getNearbyTrails = (
  location,
  dist,
  results,
  api_key
) => dispatch => {
  axios
    .get("https://www.hikingproject.com/data/get-trails", {
      params: {
        lat: location[0],
        lon: location[1],
        maxDistance: dist,
        maxResults: results,
        key: api_key
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
