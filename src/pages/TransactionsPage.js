import React from 'react';
import TransactionsTable from '../containers/TransactionsTable';
import FilterBtnGroup from '../components/FilterBtnGroup';

const TransactionsPage = () => (
  <div className="wrapper">
    <FilterBtnGroup />
    <TransactionsTable />
  </div>
);

export default TransactionsPage;
