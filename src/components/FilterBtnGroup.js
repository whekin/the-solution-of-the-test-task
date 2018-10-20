import React, { Component } from 'react';
import FilterBtn from './FilterBtn';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/FilterBtnGroup.css';

export const filterBtns = [
  {
    filter: transaction => transaction.type === "income",
    langTextCode: "btn_income_text"
  },
  {
    filter: transaction => transaction.type === "expense",
    langTextCode: "btn_expense_text"
  },
  {
    filter: transaction => new Date().getMonth() === new Date(transaction.date).getMonth(),
    langTextCode: "btn_for_last_month_text"
  },
  {
    filter: transaction => transaction.value > 1000,
    langTextCode: "btn_more_1000_text"
  }
];

export default class FiltersGroup extends Component {
  handleFilterBtnClick = (...args) => {
    this.props.handleFilterBtnClick(...args);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <div className="FilterBtnGroup">
            {
              filterBtns.map( (btn, index) => (
                <FilterBtn
                  key={index}
                  id={index}
                  onClick={this.handleFilterBtnClick}
                  filter={btn.filter}
                  value={language[btn.langTextCode]} />
              ) )
            }
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}
