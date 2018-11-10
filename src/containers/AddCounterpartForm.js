import { connect } from 'react-redux';
import AddCounterpartForm from '../components/AddCounterpartForm';
import { addCounterpart } from '../actions';

export default connect(state => ({
  lastCounterpartId: state.counterparts.data.length,
  counterparts: state.counterparts
}), dispatch => ({
  addCounterpart: (...args) => {
    dispatch(addCounterpart(...args) );
  }
}) )(AddCounterpartForm);
