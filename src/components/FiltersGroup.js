import React, { Component } from 'react';
import FilterBtn from '../FilterBtn/FilterBtn';

export default class FiltersGroup extends Component {
  state = {
    btns: [
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
      },
    ]
  };

  handlerFilterBtnClick = (...args) => {
    this.props.handlerFilterBtnClick(...args);
  };

  render() {
    const { btns } = this.state;
    return(
      <div className="filters-group">
        {
          btns.map(( btn, index ) => (
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
