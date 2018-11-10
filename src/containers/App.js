import { connect } from 'react-redux';
import App from '../components/App';
import { getData, changeTheme, setTheme, toggleDialog } from '../actions';

export default connect(state => ({
  transactions: state.transactions,
  counterparts: state.counterparts,
  currentTheme: state.currentTheme
}), dispatch => ({
  getData: (...args) => {
    dispatch(getData(...args) );
  },
  changeTheme: () => {
    dispatch(changeTheme() );
  },
  setTheme: theme => {
    dispatch(setTheme(theme) );
  },
  toggleDialog: (...args) => {
    dispatch(toggleDialog(...args) );
  }
}) )(App);