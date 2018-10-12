import React, { Component } from 'react';
import FilterBtn from './FilterBtn';


export default class FiltersGroup extends Component {
  handlerFilterBtnClick = (...args) => {
    this.props.handlerFilterBtnClick(...args);
  }

  Btns = [
    {
      filter: (transaction) => transaction.type === "income",
      value: "Доход"
    },
    {
      filter: (transaction) => transaction.type === "expense",
      value: "Расход"
    },
    {
      filter: (transaction) => new Date().getMonth() === new Date(transaction.date).getMonth(),
      value: "За последний месяц"
    },
    {
      filter: (transaction) => transaction.value > 1000,
      value: "Более 1000р"
    }
  ];

  render() {
    return(
      <div className="filters-group">
        {
          this.Btns.map(( btn, index ) => (
            <FilterBtn
              key={index}
              id={index}
              onClick={this.handlerFilterBtnClick}
              filter={btn.filter}
              value={btn.value} />
          ))
        }
      </div>
    );
  }
}
