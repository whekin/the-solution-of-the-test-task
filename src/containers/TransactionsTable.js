import { connect } from 'react-redux';
import TransacitonsTable from '../components/TransactionsTable';

export default connect(state => {
  let transactions = state.loadingData.transactions.data.slice();

  state.filterBtns.activedFilters.forEach(item => {
    transactions = transactions.filter(item.filter);
  });

  return {
    transactions: {
      ...state.loadingData.transactions,
      data: transactions
    },
    counterparts: state.loadingData.counterparts
  };
})(TransacitonsTable);
