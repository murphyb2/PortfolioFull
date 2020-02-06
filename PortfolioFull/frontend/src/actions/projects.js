import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import { tokenConfig } from "./auth";

import {
  GET_PROJECTS,
  GET_PROJECT_DETAIL,
  DELETE_PROJECT,
  ADD_PROJECT,
  GET_ERRORS
} from "./types";

// These actions are dispatched between the reducer and the backend
// The get, post, and delete functions talk to the server, the dispatch
// does the corresponding action on the UI

// GET PROJECTS
export const getProjects = () => (dispatch, getState) => {
  axios
    .get("/api/projects/", tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROJECTS,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// GET PROJECTS
export const getProjectDetail = id => (dispatch, getState) => {
  axios
    .get(`/api/projects/${id}/`, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_PROJECT_DETAIL,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE PROJECT
export const deleteProject = id => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${id}/`, tokenConfig(getState))
    .then(res => {
      // Create and dispatch a message
      dispatch(createMessage({ deleteLead: "Project Deleted" }));
      // Delete it from the server
      dispatch({
        type: DELETE_PROJECT,
        payload: id
      });
    })
    .catch(err => console.log(err));
};

// ADD PROJECT
export const addProject = project => (dispatch, getState) => {
  axios
    .post("/api/projects/", project, tokenConfig(getState))
    .then(res => {
      // Create and dispatch a message
      dispatch(createMessage({ addProject: "Project Added" }));
      dispatch({
        type: ADD_PROJECT,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
