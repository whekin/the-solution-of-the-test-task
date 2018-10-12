import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import FiltersGroup from './FilterBtnGroup';
import TransactionsTable from './TransactionsTable';
import AddTransactionForm from './AddTransactionForm';
import './App.css';

export default class App extends Component {
  state = {
    transactions: [],
    filteredTransactions: [],
    activedFilters: []
  }

  isLoadingData = true;

  componentDidMount() {
    axios.get("http://localhost:3001/transactions").then(res => {
      const transactions = res.data;
      const filteredTransactions = res.data.slice();
      this.isLoadingData = false;
      this.setState({ transactions, filteredTransactions });
    })
  }

  handlerFilterBtnClick = (id, filter, isActive) => {
    let updatedFilteredTransactions = this.state.transactions.slice();
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
  };

  hundleAddTransaction = ({id, type, value, date}) => {
    const updatedTransactions = this.state.transactions.slice();
    updatedTransactions.push({
      id, type, value, date
    });

    this.setState({
      transactions: updatedTransactions,
      filteredTransactions: updatedTransactions,
      activedFilters: []
    })
  };

  transactionTableUpdate = () => {
    this.setState({
      activedFilters: [],
      filteredTransactions: this.state.transactions.slice()
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <span className="App-logo">Тестовое веб-приложение</span>
          </header>
          <main className="App-main">
            {this.isLoadingData ?
              <div>Loading...</div>
            :
            <Switch>
              <Route exact path="/" render={() => (
                <div className="wrapper">
                  <Link to="/add">Добавить новую транзакцию</Link>
                  <FiltersGroup handlerFilterBtnClick={this.handlerFilterBtnClick}/>
                  {this.state.filteredTransactions.length > 0 ?
                    <TransactionsTable update={this.transactionTableUpdate} filteredTransactions={this.state.filteredTransactions}/>
                  : <div className="warning-text">Транзакций, походящих под выбранные фильтры, нет!</div>}
                </div>
              )} />
              <Route path="/add" render={() => (
                <AddTransactionForm lastTransactionId={this.state.transactions.length - 1} onSubmit={this.hundleAddTransaction}/>
              )} />
              <Route render={() => (
                <Redirect to="/"/>
              )} />
            </Switch>
          }
          </main>
        </div>
      </Router>
    );
  }
}
