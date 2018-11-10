import { connect } from 'react-redux';
import FilterBtn from '../components/FilterBtn';
import { toggleFilterBtn } from '../actions';

export default connect(null, dispatch => ({
  toggleFilterBtn: (...args) => {
    dispatch(toggleFilterBtn(...args) );
  }
}) )(FilterBtn);
