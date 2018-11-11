import { combineReducers } from 'redux';
import { dialogs } from './dialogs';
import { filterBtns } from './filterBtns';
import { loadingData } from './loadingData';
import { themes } from './themes';

const rootReducer = combineReducers({
  dialogs,
  filterBtns,
  loadingData,
  themes
});

export default rootReducer;
