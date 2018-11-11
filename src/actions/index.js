import axios from 'axios';

export const TOGGLE_FILTER_BTN = 'TOGGLE_FILTER_BTN';

export const DATA_REQUEST = 'DATA_REQUEST';
export const DATA_SUCCESS = 'DATA_SUCCESS';
export const DATA_FAIL = 'DATA_FAIL';

export const ADD_TRANSACTION = 'ADD_TRANSACTION';
export const ADD_COUNTERPART = 'ADD_COUNTERPART';

export const TOGGLE_THEME = 'TOGGLE_THEME';
export const SET_THEME = 'SET_THEME';

export const TOGGLE_DIALOG = 'TOGGLE_DIALOG';

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

export const addCounterpart = counterpart => ({
  type: ADD_COUNTERPART,
  payload: counterpart
});

export const toggleFilterBtn = (id, isActive, filter) => ({
  type: TOGGLE_FILTER_BTN,
  payload: {
    id,
    isActive,
    filter
  }
});

export const toggleTheme = () => ({
  type: TOGGLE_THEME
});

export const setTheme = theme => ({
  type: SET_THEME,
  payload: theme
});

export const toggleDialog = (dialog, isOpen) => ({
  type: TOGGLE_DIALOG,
  payload: {
    dialog,
    isOpen
  }
});
