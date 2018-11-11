import { connect } from 'react-redux';
import AddTransactionForm from '../components/AddTransactionForm';
import { addTransaction } from '../actions';

export default connect(state => ({
  lastTransactionId: state.loadingData.transactions.data.length,
  counterparts: state.loadingData.counterparts
}), dispatch => ({
  addTransaction: (...args) => {
    dispatch(addTransaction(...args) );
  }
}) )(AddTransactionForm);
