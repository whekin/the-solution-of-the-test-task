import {
  TRANSACTIONS_REQUEST,
  TRANSACTIONS_SUCCESS,
  TRANSACTIONS_FAIL,

  COUNTERPARTS_REQUEST,
  COUNTERPARTS_SUCCESS,
  COUNTERPARTS_FAIL,

  TOGGLE_FILTER_BTN,
  ACTIVE_SORT_BTN,
  ADD_TRANSACTION,
  CHANGE_THEME,
  SET_THEME
} from '../actions';
import { sortBtns } from '../components/SortBtnGroup';
import { DARK_THEME, LIGHT_THEME } from '../logic/colorThemes';

export const initialState = {
  loadingState: "",
  transactions: [],
  counterparts: [],
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
  case TRANSACTIONS_REQUEST:
    return {
      ...state,
      loadingState: "loading_data"
    };
  case TRANSACTIONS_SUCCESS:
    return {
      ...state,
      transactions: action.payload,
      loadingState: "loaded"
    };
  case TRANSACTIONS_FAIL:
    return {
      ...state,
      loadingState: "fail"
    };
  case COUNTERPARTS_REQUEST:
    return {
      ...state
    };
  case COUNTERPARTS_SUCCESS:
    return {
      ...state,
      counterparts: action.payload
    };
  case COUNTERPARTS_FAIL:
    return {
      ...state
    };
  case ADD_TRANSACTION:
    return {
      ...state,
      transactions: state.transactions.concat(action.payload),
      activedFilters: []
    };
  default:
    return state;
  }
};

export default rootReducer;
