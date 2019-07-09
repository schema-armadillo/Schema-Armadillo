import * as types from "../constants/types";

export const addRow = {
  type: types.ADD_KEY,
  payload: {}
};

export const deleteRow = (key) => {
  type: types.DELETE_KEY,
  payload: key,
}
