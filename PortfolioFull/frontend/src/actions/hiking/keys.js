import axios from "axios";
import { GET_KEYS } from "../types";

export const getHikingKeys = () => dispatch => {
  // console.log("get keys action");
  axios
    .get("hiking/api/keys")
    .then(res => {
      dispatch({
        type: GET_KEYS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
