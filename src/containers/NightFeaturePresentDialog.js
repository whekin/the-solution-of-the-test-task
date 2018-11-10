import { connect } from 'react-redux';
import NightFeaturePresentDialog from '../components/NightFeaturePresentDialog';
import { toggleDialog } from '../actions';

export default connect(state => ({
  isOpen: state.dialogsState.NightFeaturePresentDialog.isOpen
}), dispatch => ({
  toggleDialog: isOpen => {
    dispatch(toggleDialog("NightFeaturePresentDialog", isOpen) );
  }
}) )(NightFeaturePresentDialog);
