import * as types from "../constants/types";

export const addRow = () => ({
  type: types.ADD_ROW,
  payload: {
    key: '',
    type: '',
    required: false,
    unique: false,
  },
});

export const deleteRow = (index) => ({
  type: types.DELETE_ROW,
  payload: index,
});

export const updateRow = (rowObj) => ({
  type: types.UPDATE_ROW,
  payload: rowObj,
})
