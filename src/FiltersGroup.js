import React, { Component } from 'react';
import FilterBtn from './FilterBtn';

class FiltersGroup extends Component {

  btnClickHandler = (...args) => {
    this.props.btnClickHandler(...args);
  }

  render() {
    return(
      <div className="filters-group">
        <FilterBtn
          id={1}
          onClick={this.btnClickHandler}
          filter={(tran) => tran.type === "income"}
          value="Доход" />
        <FilterBtn
          id={2}
          onClick={this.btnClickHandler}
          filter={(tran) => tran.type === "expense"}
          value="Расход" />
        <FilterBtn
          id={3}
          onClick={this.btnClickHandler}
          filter={(tran) => new Date().getMonth() === new Date(tran.date).getMonth()}
          value="За последний месяц" />
        <FilterBtn
          id={4}
          onClick={this.btnClickHandler}
          filter={(tran) => tran.value > 1000}
          value="Более 1000р" />
      </div>

    );
  }
}

export default FiltersGroup;
