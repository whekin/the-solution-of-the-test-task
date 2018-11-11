import { connect } from 'react-redux';
import AddTransactionDialog from '../components/AddTransactionDialog';
import { toggleDialog } from '../actions';

export default connect(state => ({
  isOpen: state.dialogs.dialogsState.AddTransactionDialog.isOpen
}), dispatch => ({
  toggleDialog: isOpen => {
    dispatch(toggleDialog("AddTransactionDialog", isOpen) );
  }
}) )(AddTransactionDialog);
