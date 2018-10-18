import React, { Component } from 'react';
import FilterBtn from './FilterBtn';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/FilterBtnGroup.css';

const btns = [
  {
    filter: (transaction) => transaction.type === "income",
    lang_text_code: "btn_income_text",
  },
  {
    filter: (transaction) => transaction.type === "expense",
    lang_text_code: "btn_expense_text",
  },
  {
    filter: (transaction) => new Date().getMonth() === new Date(transaction.date).getMonth(),
    lang_text_code: "btn_for_last_month_text",
  },
  {
    filter: (transaction) => transaction.value > 1000,
    lang_text_code: "btn_more_1000_text",
  },
];

export default class FiltersGroup extends Component {
  handleFilterBtnClick = (...args) => {
    this.props.handleFilterBtnClick(...args);
  }

  render() {
    return(
      <LanguageContext.Consumer>
      {language => (
        <div className="FilterBtnGroup">
          {
            btns.map(( btn, index ) => (
              <FilterBtn
                key={index}
                id={index}
                onClick={this.handleFilterBtnClick}
                filter={btn.filter}
                value={language[btn.lang_text_code]} />
            ))
          }
        </div>
      )}
      </LanguageContext.Consumer>
    );
  }
}
