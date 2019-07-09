import * as types from "../constants/types";

export const addRow = () => ({
  type: types.ADD_KEY,
  payload: {
    key: '',
    type: '',
    required: false,
    unique: false,
  },
});

export const deleteRow = (key) => ({
  type: types.DELETE_KEY,
  payload: key,
});
