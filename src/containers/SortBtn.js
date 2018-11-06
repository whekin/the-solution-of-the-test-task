import { connect } from 'react-redux';
import SortBtn from '../components/SortBtn';
import { activeSortBtn } from '../actions';

export default connect(store => ({
  activedId: store.activedSort.id
}), dispatch => ({
  activeSortBtn: (...args) => {
    dispatch(activeSortBtn(...args) );
  }
}) )(SortBtn);
