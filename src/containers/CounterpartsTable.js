import { connect } from 'react-redux';
import CounterpartsTable from '../components/CounterpartsTable';

export default connect(state => ({
  counterparts: state.loadingData.counterparts
}) )(CounterpartsTable);
