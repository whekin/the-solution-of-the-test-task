import { connect } from 'react-redux';
import App from '../components/App';
import { getTransactions, changeTheme, setTheme } from '../actions';

export default connect(state => ({
  loadingState: state.loadingState,
  currentTheme: state.currentTheme
}), dispatch => ({
  getTransactions: dispatch(getTransactions() ),
  changeTheme: () => {
    dispatch(changeTheme() );
  },
  setTheme: theme => {
    dispatch(setTheme(theme) );
  }
}) )(App);
