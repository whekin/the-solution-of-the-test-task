import axios from 'axios';
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,

  ADD_TRANSACTION,
  ADD_COUNTERPART,

  TOGGLE_FILTER_BTN,

  TOGGLE_THEME,
  SET_THEME,

  TOGGLE_DIALOG
} from './actionTypes';

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
