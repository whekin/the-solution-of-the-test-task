import React, { Component } from 'react';
import { Prompt } from 'react-router-dom';
import Btn from './Btn';
import { LanguageContext } from '../logic/language-context';

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

class AddTransactionForm extends Component {

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

  handleSubmit = event => {
    event.preventDefault();

    this.props.onSubmit();

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
  };

  render() {
    const { isEditing, type, value, date, time, counterpartId } = this.state;

    return (
      <LanguageContext.Consumer>
        {language => (
          <form
            onSubmit={this.handleSubmit}
            className="AddTransactionForm">
            <Prompt
              when={isEditing}
              message={language.sure_leave_page_text} />
            <ul>
              <li>
                <label>{language.select_type_text}</label>
                <select
                  name="type"
                  value={type}
                  onChange={this.handleChange}>
                  <option value="income">{language.btn_income_text}</option>
                  <option value="expense">{language.btn_expense_text}</option>
                </select>
              </li>
              <li>
                <label>{language.select_value_text}</label>
                <input
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
                <label>{language.select_date_text}</label>
                <input
                  name="date"
                  type="date"
                  min="2000-01-01"
                  max={theDate}
                  value={date}
                  onChange={this.handleChange}
                  required />
              </li>
              <li>
                <label>{language.select_time_text}</label>
                <input
                  name="time"
                  type="time"
                  value={time}
                  onChange={this.handleChange}
                  required />
              </li>
              <li>
                <label>{language.select_counterpart_text}</label>
                <select
                  name="counterpartId"
                  value={counterpartId}
                  onChange={this.handleChange}>
                  {
                    this.props.counterparts.data.map(counterpart => (
                      <option
                        key={counterpart.id}
                        value={counterpart.id}>
                        {counterpart.name}
                      </option>
                    ) )
                  }
                </select>
              </li>
              <li>
                <Btn
                  name="submit"
                  type="submit"
                  value={language.add_transaction_text} />
              </li>
            </ul>
          </form>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default AddTransactionForm;
