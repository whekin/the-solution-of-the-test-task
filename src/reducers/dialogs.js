import { TOGGLE_DIALOG } from '../actions/actionTypes';

const initialState = {
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

export const dialogs = (state = initialState, action) => {
  switch (action.type) {
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
