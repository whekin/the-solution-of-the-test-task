import React, { Component } from 'react';
import { Link, Prompt } from 'react-router-dom';
import Btn from './Btn';
import Waves from 'waves';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/AddTransactionForm.css';

const now = new Date();
const theDate = `${now.getFullYear()}-${(now.getMonth() + 1) < 10? `0${now.getMonth() + 1}` : now.getMonth() + 1}-${now.getDate() < 10? `0${now.getDate()}` : now.getDate()}`;
const theTime = `${now.getHours() < 10? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10? `0${now.getMinutes()}` : now.getMinutes()}`

export default class AddTransactionForm extends Component {
  constructor(props) {
    super(props);

    Waves.init({
      duration: 1000,
    });
  }

  state = {
    isEditing: false,
    lastTransactionId: this.props.lastTransactionId,
    type: "income",
    value: 10,
    date: theDate,
    time: theTime,
  };

  handleChange = (event) => {
    this.setState({
      isEditing: true,
      sended: false,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit({
      id: this.state.lastTransactionId,
      type: this.state.type,
      value: this.state.value,
      date: `${this.state.date}T${this.state.time}:00Z`,
    });

    this.setState(( state ) => ({
      lastTransactionId: state.lastTransactionId + 1,
      isEditing: false,
    }));

    this.props.modalOpen();
  };

  render() {
    return (
      <LanguageContext.Consumer>
      {language => (
        <div
          className="AddTransactionForm"
          style={
            this.props.isModalOpen? {
              filter: "blur(7px)"
            } : {}}>
          <Link className="we" to="/">{language.link_to_main_page_text}</Link>
          <Prompt
            when={this.state.isEditing}
            message={language.sure_leave_page_text}/>
          <form onSubmit={this.handleSubmit}>
            <ul>
              <li>
                <label>{language.select_type_text}</label>
                <select
                  name="type"
                  value={this.state.type}
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
                  value={this.state.value}
                  placeholder={language.placeholder_value_text}
                  onChange={this.handleChange}
                  required/>
              </li>
              <li>
                <label>{language.select_date_text}</label>
                <input
                  name="date"
                  type="date"
                  min="2000-01-01"
                  max={theDate}
                  value={this.state.date}
                  onChange={this.handleChange}
                  required/>
              </li>
              <li>
                <label>{language.select_time_text}</label>
                <input
                  name="time"
                  type="time"
                  value={this.state.time}
                  onChange={this.handleChange}
                  required/>
              </li>
              <li>
                <Btn
                  name="submit"
                  type="submit"
                  value={language.btn_add_transaction_text}/>
              </li>
            </ul>
          </form>
        </div>
      )}
      </LanguageContext.Consumer>
    );
  }
}
