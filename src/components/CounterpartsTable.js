import React from 'react';
import SmartTable from './SmartTable';
import '../stylesheets/CounterpartsTable.css';

const sorts = [
  (prev, next) => prev.id - next.id,
  (prev, next) => prev.name < next.name ? -1 : 1
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

const tbody = (language, sort, { counterparts }) => {
  let { data } = counterparts;

  if (sort)
    data = data.sort(sort);

  return (
    <tbody>
      {
        data.map(counterpart => (
          <tr key={counterpart.id}>
            <td>{counterpart.id}</td>
            <td>{counterpart.name}</td>
          </tr>
        ) )
      }
    </tbody>
  );
}

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
