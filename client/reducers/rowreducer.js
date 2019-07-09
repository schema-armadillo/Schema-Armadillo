import * as types from "../constants/types";

const defaultState = [
  {
    key:'',
    type:'',
    required:false,
    unique:false,
  },
];

export default (state = defaultState, action) => {
  let rows;
  switch (action.type) {
    case types.ADD_KEY:
      rows = state;
      rows[rows.length]=action.payload;
      return rows;
    case types.DELETE_KEY:
      rows = state.rows;
      Object.keys(rows).forEach(row => {
        if(row===action.payload.id){
          delete rows[row];
        }
      })
      totalRows = state.totalRows-1;
      return { ...state, totalRows, rows};
    default:
      return { ...state };
  }
};
