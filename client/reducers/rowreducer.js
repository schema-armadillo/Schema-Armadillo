import * as types from "../constants/types";

const defaultState = {
  rows: []
};

export default (state, action) => {
  switch (action.type) {
    case types.ADD_KEY:
      action.payload;
      return;
    case types.DELETE_KEY:
      return;
    default:
      return { ...state };
  }
};
