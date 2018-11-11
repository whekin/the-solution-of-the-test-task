import { SET_THEME, TOGGLE_THEME } from '../actions/actionTypes';
import { DARK_THEME, LIGHT_THEME } from '../logic/colorThemes';

const initialState = {
  currentTheme: localStorage.getItem('theme') || LIGHT_THEME
};

export const themes = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_THEME: {
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
  default:
    return state;
  }
};
