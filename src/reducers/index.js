import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,

  TOGGLE_FILTER_BTN,
  ACTIVE_SORT_BTN,
  ADD_TRANSACTION,
  CHANGE_THEME,
  SET_THEME
} from '../actions';
import { sortBtns } from '../components/SortBtnGroup';
import { DARK_THEME, LIGHT_THEME } from '../logic/colorThemes';

export const initialState = {
  transactions: {
    loadingState: "initial",
    data: []
  },
  counterparts: {
    loadingState: "initial",
    data: []
  },
  activedFilters: [],
  activedSort: {
    id: 0,
    sort: sortBtns[0].sort
  },
  currentTheme: localStorage.getItem('theme') || LIGHT_THEME
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_FILTER_BTN: {
    const activedFilters = state.activedFilters.filter(filter => !(
      action.payload.isActive === false && filter.id === action.payload.id
    ) );

    if (action.payload.isActive)
      activedFilters.push({
        id: action.payload.id,
        filter: action.payload.filter
      });

    return {
      ...state,
      activedFilters
    };
  }

  case CHANGE_THEME: {
    const theme = state.currentTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;

    localStorage.setItem('theme', theme);

    return {
      ...state,
      currentTheme: theme
    };
  }
  case SET_THEME:
    return {
      ...state,
      currentTheme: action.payload
    };
  case ACTIVE_SORT_BTN:
    return {
      ...state,
      activedSort: {
        id: action.payload.id,
        sort: action.payload.sort
      }
    };
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
  default:
    return state;
  }
};

export default rootReducer;
