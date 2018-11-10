import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddTransactionForm from '../containers/AddTransactionForm';
import { LanguageContext } from '../logic/language-context';

export default class AddTransactionDialog extends Component {
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
            <DialogTitle id="alert-dialog-title">{language.dialog_title_add_transaction}</DialogTitle>
            <AddTransactionForm onSubmit={this.handleClose}/>
          </Dialog>
        )}
      </LanguageContext.Consumer>
    );
  }
}
