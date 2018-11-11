import {
  TOGGLE_FILTER_BTN
} from '../actions/actionTypes';

const initialState = {
  activedFilters: []
};

export const filterBtns = (state = initialState, action) => {
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

  default:
    return state;
  }
};
