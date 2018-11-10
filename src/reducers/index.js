import {
  DATA_REQUEST,
  DATA_SUCCESS,
  DATA_FAIL,

  TOGGLE_FILTER_BTN,

  ADD_TRANSACTION,
  ADD_COUNTERPART,

  CHANGE_THEME,
  SET_THEME,

  TOGGLE_DIALOG
} from '../actions';
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
  currentTheme: localStorage.getItem('theme') || LIGHT_THEME,
  dialogsState: {
    AddTransactionDialog: {
      isOpen: false
    },
    AddCounterpartDialog: {
      isOpen: false
    },
    NightFeaturePresentDialog: {
      isOpen: false
    }
  }
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
  case TOGGLE_DIALOG:
    return {
      ...state,
      dialogsState: {
        ...state.dialogsState,
        [action.payload.dialog]: {
          isOpen: action.payload.isOpen
        }
      }
    };
  default:
    return state;
  }
};

export default rootReducer;
