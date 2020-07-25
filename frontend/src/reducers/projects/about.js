import { GET_ABOUT } from "../../actions/types";

const initialState = {
  aboutContent: {}
};

export default function(state = initialState, action) {
  // Switch statement and action are probably unnecessary
  // because there should only ever be one about object
  switch (action.type) {
    case GET_ABOUT:
      return {
        ...state,
        aboutContent: action.payload
      };
    default:
      return state;
  }
}
