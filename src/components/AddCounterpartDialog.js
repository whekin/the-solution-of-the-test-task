import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCounterpartForm from '../containers/AddCounterpartForm';
import { LanguageContext } from '../logic/language-context';

export default class AddCounterpartDialog extends Component {
  handleClose = () => {
    this.props.toggleDialog(false);
  };

  componentDidMount() {
    this.props.toggleDialog(true);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <Dialog
            open={this.props.isOpen}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{language.dialog_titile_add_counterpart}</DialogTitle>
            <AddCounterpartForm onSubmit={this.handleClose}/>
          </Dialog>
        )}
      </LanguageContext.Consumer>
    );
  }
}
