import { GET_KEYS } from "../../actions/types";

const initialState = {
  apiKeys: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_KEYS:
      return {
        ...state,
        apiKeys: action.payload
      };
    default:
      return state;
  }
}
