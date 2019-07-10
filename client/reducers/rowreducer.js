import * as types from "../constants/types";

const defaultState = [
  {
    key: "",
    type: "",
    required: false,
    unique: false
  }
];

export default (state = defaultState, action) => {
  let rows;
  switch (action.type) {
    case types.ADD_ROW:
      rows = Object.values(state);
      rows[rows.length] = action.payload;
      return rows;
    case types.DELETE_ROW:
      rows = Object.values(state);
      console.log("payload issss ", action.payload);
      rows.splice(action.payload, 1);
      return rows;
    case types.UPDATE_KEY:
      rows = Object.values(state);
      const { index, newKey } = action.payload;
      rows[index].key = newKey;
      return rows;
    default:
      return [...state];
  }
};
