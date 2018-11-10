import React from 'react';
import SmartTable from './SmartTable';

const sorts = [
  (prev, next) => prev.id - next.id,
  (prev, next) => prev.value - next.value,
  (prev, next) => Date.parse(prev.date) - Date.parse(next.date)
];

const ths = language => [
  {
    name: language.table_id_text,
    sort: sorts[0]
  },
  {
    name: language.table_value_text,
    sort: sorts[1]
  },
  {
    name: language.table_date_text,
    sort: sorts[2]
  },
  {
    name: language.table_counterpart_text,
    sort: null
  }
];

const tbody = (language, sort, { transactions, counterparts }) => {
  let { data } = transactions;

  if (sort)
    data = transactions.data.sort(sort);

  return (
    <tbody>
      {
        data.map(transaction => (
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
}

const TransactionsTable = ({ transactions, counterparts }) => (
  <SmartTable
    ths={ths}
    defaultSort={sorts[0]}
    data={{
      transactions,
      counterparts
    }}
    tbody={tbody} />
);

export default TransactionsTable;
