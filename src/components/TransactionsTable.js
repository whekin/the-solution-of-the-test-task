import React, { Component } from 'react';

export default class TransactionsTable extends Component {
  componentDidMount() {
    this.props.update();
  }

  render() {
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Сумма</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {this.props.filteredTransactions.map(( transaction ) => (
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
    );
  }
}
