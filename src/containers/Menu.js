import { connect } from 'react-redux';
import Menu from '../components/Menu';
import { toggleDialog } from '../actions';

export default connect(null, dispatch => ({
  toggleDialog: (...args) => {
    dispatch(toggleDialog(...args) );
  }
}) )(Menu);
