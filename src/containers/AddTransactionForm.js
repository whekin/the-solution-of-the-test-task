import { connect } from 'react-redux';
import AddTransactionForm from '../components/AddTransactionForm';
import { addTransaction } from '../actions';

export default connect(state => ({
  lastTransactionId: state.transactions.length,
  conterparts: state.conterparts
}), dispatch => ({
  addTransaction: (...args) => {
    dispatch(addTransaction(...args) );
  }
}) )(AddTransactionForm);
