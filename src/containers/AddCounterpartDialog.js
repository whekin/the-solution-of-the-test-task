import { connect } from 'react-redux';
import AddCounterpartDialog from '../components/AddCounterpartDialog';
import { toggleDialog, addCounterpart } from '../actions';

export default connect(state => ({
  lastCounterpartId: state.loadingData.counterparts.data.length,
  counterparts: state.loadingData.counterparts,
  isOpen: state.dialogs.dialogsState.AddCounterpartDialog.isOpen
}), dispatch => ({
  addCounterpart: (...args) => {
    dispatch(addCounterpart(...args) );
  },
  toggleDialog: isOpen => {
    dispatch(toggleDialog("AddCounterpartDialog", isOpen) );
  }
}) )(AddCounterpartDialog);
