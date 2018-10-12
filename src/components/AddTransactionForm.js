import React, { Component } from 'react';
import './AddTransactionForm.css';

export default class AddTransactionForm extends Component {
  constructor(props) {
    super(props);
    const now = new Date();
    this.lastTransactionId = this.props.lastTransactionId;
    this.state = {
      type: "income",
      value: 0,
      date: `${now.getFullYear()}-${now.getMonth() < 10? `0${now.getMonth()}` : now.getMonth()}-${now.getDate() < 10? `0${now.getDate()}` : now.getDate()}`,
      time: `${now.getHours() < 10? `0${now.getHours()}` : now.getHours()}:${now.getMinutes() < 10? `0${now.getMinutes()}` : now.getMinutes()}`
    };
  }

  hundleChangeType = (event) => {
    this.setState({ type: event.target.value });
  };

  hundleChangeValue = (event) => {
    this.setState({ value: event.target.value });
  };

  hundleChangeDate = (event) => {
    this.setState({ date: event.target.value });
  };

  hundleChangeTime = (event) => {
    this.setState({ time: event.target.value });
  };

  hundleSubmit = (event) => {
    event.preventDefault();

    this.props.onSubmit({
      id: ++this.lastTransactionId,
      type: this.state.type,
      value: this.state.value,
      date: `${this.state.date}T${this.state.time}:00Z`
    });
  };

  render() {
    return (
      <form onSubmit={this.hundleSubmit}>
        <ul>
          <li>
            <label>Выберите тип</label>
            <select value={this.state.type} onChange={this.hundleChangeType}>
              <option value="income">Доход</option>
              <option value="expense">Расход</option>
            </select>
          </li>
          <li>
            <label>Введите сумму</label>
            <input type="number" value={this.state.value} placeholder="Сумма" onChange={this.hundleChangeValue} required/>
          </li>
          <li>
            <label>Выберите дату</label>
            <input type="date" value={this.state.date} onChange={this.hundleChangeDate} required/>
          </li>
          <li>
            <label>Введите время</label>
            <input type="time" value={this.state.time} onChange={this.hundleChangeTime} required/>
          </li>
          <li>
            <input type="submit" value="Добавить транзакцию"/>
          </li>
        </ul>
      </form>
    );
  }
}
