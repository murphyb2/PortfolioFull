import axios from "axios";
import { returnErrors } from "../messages";
import { tokenConfig } from "../auth";
import { GET_ABOUT } from "../types";

export const getAbout = id => (dispatch, getState) => {
  console.log("getAbout action");
  axios
    .get(`/api/about/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_ABOUT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
