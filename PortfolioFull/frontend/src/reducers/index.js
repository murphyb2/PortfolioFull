import { combineReducers } from "redux";
import projects from "./projects";
import trails from "./hiking/trails";
import hikingKeys from "./hiking/keys";
import errors from "./errors";
// import messages from "./messages";
import auth from "./auth";
// import about from "./about";

export default combineReducers({
  projectReducer: projects,
  errorReducer: errors,
  //   messagesReducer: messages,
  authReducer: auth,
  //   aboutReducer: about
  hikingKeysReducer: hikingKeys,
  trailsReducer: trails
});
