import { UPDATE_USER_OPTIONS, GET_TRAILS } from "../../actions/types";

const initialState = {
  userLocation: [35.7796, -78.6382], //Default is Raleigh NC
  nearbyTrails: [],
  maxDistance: 10,
  maxResults: 10
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_OPTIONS:
      return {
        ...state,
        maxDistance: action.payload[1],
        maxResults: action.payload[2],
        userLocation: action.payload[0]
      };
    case GET_TRAILS:
      return {
        ...state,
        nearbyTrails: action.payload
      };

    default:
      return state;
  }
}
