import React from 'react';
import { LanguageContext } from '../logic/language-context';

const TransactionsTable = ({ transactions, counterparts }) => (
  <LanguageContext.Consumer>
    {language => (
      <table className="TransactionsTable">
        <thead>
          <tr>
            <th>{language.table_id_text}</th>
            <th>{language.table_value_text}</th>
            <th>{language.table_date_text}</th>
            <th>Контрагент</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
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
              <td>
                {counterparts[transaction.counterpartId].name}
              </td>
            </tr>
          ) )
          }
        </tbody>
      </table>
    )}
  </LanguageContext.Consumer>
);

export default TransactionsTable;
