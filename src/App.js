import React, { Component } from 'react';
import FiltersGroup from './FiltersGroup';
import TransactionsTable from './TransactionsTable';
import transactions from './transactions';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredTransactions: transactions,
      activedFilters: []
    }
  }

  /**
   * Button handler for click.
   * @param  {object} filter - callback
   * @param  {object} evt
   */
  btnClickHandler = (id, filter, isActive) => {
    let updatedFilteredTransactions = transactions.slice();
    const updatedActivedFilters = this.state.activedFilters.slice();

    if (isActive) {
      updatedActivedFilters.push({id: id, filter: filter});
    } else {
      updatedActivedFilters.forEach((e, index) => {
        if (e.id === id)
          updatedActivedFilters.splice(index, 1);
      });
    }

    updatedActivedFilters.forEach((item) => {
      if (updatedFilteredTransactions.length > 0)
        updatedFilteredTransactions = updatedFilteredTransactions.filter(item.filter);
    });

    this.setState({
      filteredTransactions: updatedFilteredTransactions,
      activedFilters: updatedActivedFilters
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
          <FiltersGroup btnClickHandler={this.btnClickHandler}/>
          {this.state.filteredTransactions.length > 0 ?
            <TransactionsTable filteredTransactions={this.state.filteredTransactions}/>
          : <div className="warning-text">Транзакций, походящих под выбранные фильтры, нет!</div>}
          </div>
        </main>
      </div>
    );
  }
}

export default App;
