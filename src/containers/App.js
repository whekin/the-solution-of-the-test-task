import { connect } from 'react-redux';
import App from '../components/App';
import { getData, changeTheme, setTheme } from '../actions';

export default connect(state => ({
  loadingState: state.loadingState,
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
  }
}) )(App);
