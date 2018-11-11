import { connect } from 'react-redux';
import AddTransactionDialog from '../components/AddTransactionDialog';
import { toggleDialog, addTransaction } from '../actions';

export default connect(state => ({
  lastTransactionId: state.loadingData.transactions.data.length,
  counterparts: state.loadingData.counterparts,
  isOpen: state.dialogs.dialogsState.AddTransactionDialog.isOpen
}), dispatch => ({
  addTransaction: (...args) => {
    dispatch(addTransaction(...args) );
  },
  toggleDialog: isOpen => {
    dispatch(toggleDialog("AddTransactionDialog", isOpen) );
  }
}) )(AddTransactionDialog);
