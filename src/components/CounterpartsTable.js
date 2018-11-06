import React from 'react';

const CounterpartsTable = ({ counterparts }) => (
  <table className="">
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {counterparts.map(counterpart => (
        <tr key={counterpart.id}>
          <td>{counterpart.id}</td>
          <td>{counterpart.name}</td>
        </tr>
      ) )
      }
    </tbody>
  </table>
);
export default CounterpartsTable;
