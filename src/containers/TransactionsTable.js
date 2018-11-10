import { connect } from 'react-redux';
import TransacitonsTable from '../components/TransactionsTable';

export default connect(state => {
  let transactions = state.transactions.data.slice();

  state.activedFilters.forEach(item => {
    transactions = transactions.filter(item.filter);
  });

  return {
    transactions: {
      ...state.transactions,
      data: transactions
    },
    counterparts: state.counterparts
  };
})(TransacitonsTable);
