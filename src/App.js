import React, { Component } from 'react';
import transactions from './transactions';
import './Btn.css';
import './App.css';

/**
 * Array of the filters that is actived
 * @type {Array.<{id: number, filter: object}>}
 */
const activedFilters = [];

class FilterBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false
    }
  }

  btnClickHandler = () => {
    if (!this.state.isActive) {
      activedFilters.push({id: this.props.id, filter: this.props.filter});
    } else {
      activedFilters.forEach((e, index) => {
        if (e.id === this.props.id)
          activedFilters.splice(index, 1);
      });
    }

    this.setState({
      isActive: !this.state.isActive
    });
    this.props.onClick();
  }

  render() {
    return (
      <button className={this.state.isActive ? "btn-toggle active" : "btn-toggle"} onClick={this.btnClickHandler}>{this.props.value}</button>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredTransactions: transactions
    };
  }

  /**
   * Button handler for click.
   * @param  {object} filter - callback
   * @param  {object} evt
   */
  btnClickHandler = (filter, evt) => {
    let filteredTransactions = transactions.slice();

    activedFilters.forEach((item) => {
      filteredTransactions = filteredTransactions.filter(item.filter);
    });

    this.setState({
      filteredTransactions: filteredTransactions
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <span className="App-logo">Тестовое веб-приложение</span>
        </header>
        <main className="App-main">
          <div className="wrapper">
            <div className="filters-group">
              <FilterBtn
                id={1}
                onClick={this.btnClickHandler}
                filter={(tran) => tran.type === "income"}
                value="Доход" />
              <FilterBtn
                id={2}
                onClick={this.btnClickHandler}
                filter={(tran) => tran.type === "expense"}
                value="Расход" />
              <FilterBtn
                id={3}
                onClick={this.btnClickHandler}
                filter={(tran) => new Date().getMonth() === new Date(tran.date).getMonth()}
                value="За последний месяц" />
              <FilterBtn
                id={4}
                onClick={this.btnClickHandler}
                filter={(tran) => tran.value > 1000}
                value="Более 1000р" />
            </div>
            {this.state.filteredTransactions.length > 0 ?
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Сумма</th>
                  <th>Дата</th>
                </tr>
              </thead>
              <tbody>
                {this.state.filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>
                      {transaction.id}
                    </td>
                    <td>
                      {transaction.type === "income" ? "+" : "-"}{transaction.value}
                    </td>
                    <td>
                      {new Date(transaction.date).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          : <div className="warning-text">Транзакций, походящих под выбранные фильтры, нет!</div>}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
