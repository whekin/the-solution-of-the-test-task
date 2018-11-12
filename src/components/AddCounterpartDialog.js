import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { LanguageContext } from '../logic/language-context';
import { Dialog, DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';

export default class AddCounterpartDialog extends Component {
  state = {
    isEditing: false,
    sended: false,
    name: ""
  }

  handleChange = event => {
    this.setState({
      isEditing: true,
      sended: false,
      [event.target.name]: event.target.value
    });
  }

  isThereDialogInURL () {
    return window.location.pathname.indexOf("addCounterpart") !== -1;
  }

  componentDidMount() {
    if (this.isThereDialogInURL() )
      this.props.toggleDialog(true);
  }

  handleClose = isSended => () => {
    if (isSended) {
      this.setState({
        isEditing: false,
        sended: true
      });

      this.props.addCounterpart({
        id: this.props.lastCounterpartId,
        name: this.state.name
      });
    }

    this.props.toggleDialog(false);

    if (this.isThereDialogInURL() )
      window.history.back();
  };

  render() {
    const { isEditing, name } = this.state;

    return (
      <LanguageContext.Consumer>
        {language => (
          <Dialog
            open={this.props.isOpen}
            onClose={this.handleClose(false)}>
            <DialogTitle>{language.dialog_titile_add_counterpart}</DialogTitle>
            <form
              onSubmit={this.handleSubmit}
              className="AddCounterpartForm">
              <Prompt
                when={isEditing}
                message={language.sure_leave_page_text} />
              <ul>
                <li>
                  <TextField
                    label="Name"
                    name="name"
                    value={name}
                    minLength="3"
                    onChange={this.handleChange}/>
                </li>
              </ul>
            </form>
            <DialogActions>
              <Button onClick={this.handleClose(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose(true)} color="primary">
                Ok
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </LanguageContext.Consumer>
    );
  }
}
