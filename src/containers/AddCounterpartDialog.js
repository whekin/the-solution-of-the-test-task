import { connect } from 'react-redux';
import AddCounterpartDialog from '../components/AddCounterpartDialog';
import { toggleDialog } from '../actions';

export default connect(state => ({
  isOpen: state.dialogs.dialogsState.AddCounterpartDialog.isOpen
}), dispatch => ({
  toggleDialog: isOpen => {
    dispatch(toggleDialog("AddCounterpartDialog", isOpen) );
  }
}) )(AddCounterpartDialog);
