import axios from 'axios';

export const TOGGLE_FILTER_BTN = 'TOGGLE_FILTER_BTN';
export const ACTIVE_SORT_BTN = 'ACTIVE_SORT_BTN';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAIL = 'DATA_FAIL';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';

export const CHANGE_THEME = 'CHANGE_THEME';
export const SET_THEME = 'SET_THEME';

export const getData = (to, address) => dispatch => {
  dispatch({
    type: DATA_REQUEST,
    payload: {
      to
    }
  });

  axios.get(address)
    .then(res => {
      dispatch({
        type: DATA_SUCCESS,
        payload: {
          to,
          data: res.data
        }
      });
    })
    .catch(reason => {
      dispatch({
        type: DATA_FAIL,
        payload: {
          to,
          reason
        }
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
