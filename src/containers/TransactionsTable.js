import { connect } from 'react-redux';
import TransacitonsTable from '../components/TransactionsTable';

export default connect(state => {
  let transactions = state.transactions.slice();

  state.activedFilters.forEach(item => {
    transactions = transactions.filter(item.filter);
  });

  transactions.sort(state.activedSort.sort);

  return {
    transactions,
    counterparts: state.counterparts
  };
})(TransacitonsTable);
