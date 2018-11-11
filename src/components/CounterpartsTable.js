import React from 'react';
import SmartTable from './SmartTable';
import '../stylesheets/CounterpartsTable.css';

const sorts = [
  (prev, next) => prev.id - next.id,
  (prev, next) => {
    if (prev.name < next.name)
      return -1;
    return 1;
  }
];

const ths = language => [
  {
    name: language.table_id_text,
    sort: sorts[0]
  },
  {
    name: language.table_name_text,
    sort: sorts[1]
  }
];

const tbody = ({ sort, isReverse, data }) => {
  let { data: counterpartData } = data.counterparts;

  if (sort)
    counterpartData = counterpartData.sort(sort);
  if (isReverse)
    counterpartData = counterpartData.reverse();

  return (
    <tbody>
      {
        counterpartData.map(counterpart => (
          <tr key={counterpart.id}>
            <td>{counterpart.id}</td>
            <td>{counterpart.name}</td>
          </tr>
        ) )
      }
    </tbody>
  );
};

const CounterpartsTable = ({ counterparts }) => (
  <SmartTable
    ths={ths}
    defaultSort={sorts[0]}
    data={{
      counterparts
    }}
    tbody={tbody} />
);

export default CounterpartsTable;
