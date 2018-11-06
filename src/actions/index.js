import axios from 'axios';

export const TOGGLE_FILTER_BTN = 'TOGGLE_FILTER_BTN';
export const ACTIVE_SORT_BTN = 'ACTIVE_SORT_BTN';

export const TRANSACTIONS_REQUEST = 'TRANSACTIONS_REQUEST';
export const TRANSACTIONS_SUCCESS = 'TRANSACTIONS_SUCCESS';
export const TRANSACTIONS_FAIL = 'TRANSACTION_FAIL';
export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const COUNTERPARTS_REQUEST = 'COUNTERPARTS_REQUEST';
export const COUNTERPARTS_SUCCESS = 'COUNTERPARTS_SUCCESS';
export const COUNTERPARTS_FAIL = 'COUNTERPARTS_FAIL';

export const CHANGE_THEME = 'CHANGE_THEME';
export const SET_THEME = 'SET_THEME';

export const getData = (type, address) => dispatch => {
  dispatch({
    type: `${type}_REQUEST`
  });

  axios.get(address)
    .then(res => {
      dispatch({
        type: `${type}_SUCCESS`,
        payload: res.data
      });
    })
    .catch(reason => {
      dispatch({
        type: `${type}_FAIL`,
        payload: reason
      });
    });
};

export const addTransaction = transaction => ({
  type: ADD_TRANSACTION,
  payload: transaction
});

export const toggleFilterBtn = (id, isActive, filter) => ({
  type: TOGGLE_FILTER_BTN,
  payload: {
    id,
    isActive,
    filter
  }
});

export const activeSortBtn = (id, sort) => ({
  type: ACTIVE_SORT_BTN,
  payload: {
    id,
    sort
  }
});

export const changeTheme = () => ({
  type: CHANGE_THEME
});

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme
});
