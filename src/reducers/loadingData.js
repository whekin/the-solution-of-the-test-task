import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,
  ADD_TRANSACTION,
  ADD_COUNTERPART
} from '../actions/actionTypes';

const initialState = {
  transactions: {
    loadingState: "initial",
    data: []
  },
  counterparts: {
    loadingState: "initial",
    data: []
  }
};

export const loadingData = (state = initialState, action) => {
  switch (action.type) {
  case DATA_REQUEST:
    return {
      ...state,
      [action.payload.to]: {
        loadingState: "request",
        data: []
      }
    };
  case DATA_SUCCESS:
    return {
      ...state,
      [action.payload.to]: {
        loadingState: "success",
        data: action.payload.data
      }
    };
  case DATA_FAIL:
    return {
      ...state,
      [action.payload.to]: {
        loadingState: "fail",
        data: []
      }
    };
  case ADD_TRANSACTION:
    return {
      ...state,
      transactions: {
        ...state.transactions,
        data: state.transactions.data.concat(action.payload)
      },
      activedFilters: []
    };
  case ADD_COUNTERPART:
    return {
      ...state,
      counterparts: {
        ...state.transactions,
        data: state.counterparts.data.concat(action.payload)
      }
    };
  default:
    return state;
  }
};
