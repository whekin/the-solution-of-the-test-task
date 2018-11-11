import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import { LanguageContext } from '../logic/language-context';
import { Dialog, DialogTitle, DialogActions, Button, Select, Input, InputLabel, MenuItem } from '@material-ui/core';

const now = new Date();
const nowWithZero = {
  year: now.getFullYear(),
  month: now.getMonth() + 1 < 10
    ? `0${now.getMonth() + 1}`
    : now.getMonth() + 1,
  day: now.getDate() < 10 ? `0${now.getDate()}` : now.getDate(),
  hour: now.getHours() < 10 ? `0${now.getHours()}` : now.getHours(),
  minute: now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes()
};
const theDate = `${nowWithZero.year}-${nowWithZero.month}-${nowWithZero.day}`;
const theTime = `${nowWithZero.hour}:${nowWithZero.minute}`;

export default class AddTransactionDialog extends Component {
  state = {
    isEditing: false,
    type: "income",
    value: 10,
    counterpartId: 0,
    date: theDate,
    time: theTime
  };

  handleChange = event => {
    this.setState({
      isEditing: true,
      sended: false,
      [event.target.name]: event.target.value
    });
  }

  handleClose = isSended => () => {
    if (isSended) {
      this.props.addTransaction({
        id: this.props.lastTransactionId,
        type: this.state.type,
        value: this.state.value,
        counterpartId: parseInt(this.state.counterpartId, 10),
        date: `${this.state.date}T${this.state.time}:00Z`
      });

      this.setState({
        isEditing: false
      });
    }

    this.props.toggleDialog(false);
    this.props.history.goBack();
  };

  componentDidMount() {
    this.props.toggleDialog(true);
  }

  render() {
    const { isEditing, type, value, date, time, counterpartId } = this.state;

    return (
      <LanguageContext.Consumer>
        {language => (
          <Dialog
            open={this.props.isOpen}
            onClose={this.handleClose(false)}>
            <DialogTitle>{language.dialog_title_add_transaction}</DialogTitle>
            <form
              onSubmit={this.handleSubmit}
              className="AddTransactionForm">
              <Prompt
                when={isEditing}
                message={language.sure_leave_page_text} />
              <ul>
                <li>
                  <InputLabel>{language.select_type_text}</InputLabel>
                  <Select
                    name="type"
                    value={type}
                    onChange={this.handleChange}>
                    <MenuItem value="income">{language.btn_income_text}</MenuItem>
                    <MenuItem value="expense">{language.btn_expense_text}</MenuItem>
                  </Select>
                </li>
                <li>
                  <InputLabel>{language.select_value_text}</InputLabel>
                  <Input
                    min="10"
                    max="1000000000"
                    name="value"
                    type="number"
                    value={value}
                    placeholder={language.placeholder_value_text}
                    onChange={this.handleChange}
                    required />
                </li>
                <li>
                  <InputLabel>{language.select_date_text}</InputLabel>
                  <Input
                    name="date"
                    type="date"
                    min="2000-01-01"
                    max={theDate}
                    value={date}
                    onChange={this.handleChange}
                    required />
                </li>
                <li>
                  <InputLabel>
                    {language.select_time_text}</InputLabel>
                  <Input
                    name="time"
                    type="time"
                    value={time}
                    onChange={this.handleChange}
                    required />
                </li>
                <li>
                  <InputLabel>{language.select_counterpart_text}</InputLabel>
                  <Select
                    name="counterpartId"
                    value={counterpartId}
                    onChange={this.handleChange}>
                    {
                      this.props.counterparts.data.map(counterpart => (
                        <MenuItem
                          key={counterpart.id}
                          value={counterpart.id}>
                          {counterpart.name}
                        </MenuItem>
                      ) )
                    }
                  </Select>
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
