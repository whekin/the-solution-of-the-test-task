import React, { Component } from 'react';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/TransactionsTable.css';

export default class TransactionsTable extends Component {
  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <table className="TransactionsTable">
            <thead>
              <tr>
                <th>{language.table_id_text}</th>
                <th>{language.table_value_text}</th>
                <th>{language.table_date_text}</th>
              </tr>
            </thead>
            <tbody>
              {this.props.transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>
                    {transaction.id}
                  </td>
                  <td>
                    {transaction.type === "income" ? "+" : "-"}
                    {
                      language.name === "ru"
                        ? transaction.value
                        : `${(transaction.value / 60).toFixed(2)}$`
                    }
                  </td>
                  <td>
                    {new Date(transaction.date).toDateString()}
                  </td>
                </tr>
              ) )
              }
            </tbody>
          </table>
        )}
      </LanguageContext.Consumer>
    );
  }
}
