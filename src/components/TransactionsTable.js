import React, { Component } from 'react';
import { LanguageContext } from '../logic/language-context';
import Preloader from './Preloader';

export default class TransactionsTable extends Component {
  tbodyRender = language => {
    const { transactions, counterparts } = this.props;

    if (transactions.loadingState === "request"
      || counterparts.loadingState === "request")
      return (
        <tbody>
          <tr>
            <td colSpan="4">
              <Preloader />
            </td>
          </tr>
        </tbody>
      );
    else if (transactions.loadingState === "success"
      && counterparts.loadingState === "success")
      return (
        <tbody>
          {transactions.data.map(transaction => (
            <tr key={transaction.id}>
              <td>
                {transaction.id}
              </td>
              <td>
                {transaction.type === "income" ? "" : "- "}
                {
                  language.name === "ru"
                    ? transaction.value
                    : `$${(transaction.value / 60).toFixed(2)}`
                }
              </td>
              <td>
                {new Date(transaction.date).toDateString()}
              </td>
              <td>
                {counterparts.data[transaction.counterpartId].name}
              </td>
            </tr>
          ) )
          }
        </tbody>
      );
    else
      return <tbody></tbody>;
  }

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
                <th>{language.table_counterpart_text}</th>
              </tr>
            </thead>
            {this.tbodyRender(language)}
          </table>
        )}
      </LanguageContext.Consumer>
    );
  }
}

