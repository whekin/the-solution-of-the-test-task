import React, { Component } from 'react';
import SortBtn from './SortBtn';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/FilterBtnGroup.css';

export const sortBtns = [
  {
    sort: (prev, next) => prev.id - next.id,
    langTextCode: "sort_for_id_text"
  },
  {
    sort: (prev, next) => prev.value - next.value,
    langTextCode: "sort_for_value_text"
  },
  {
    sort: (prev, next) => Date.parse(prev.date) - Date.parse(next.date),
    langTextCode: "sort_for_date_text"
  }
];

export default class SortBtnGroup extends Component {
  handleSortBtnClick = (...args) => {
    this.props.handleSortBtnClick(...args);
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <div className="FilterBtnGroup">
            {
              sortBtns.map( (btn, index) => (
                <SortBtn
                  key={index}
                  id={index}
                  actived={this.props.actived === index}
                  onClick={this.handleSortBtnClick}
                  sort={btn.sort}
                  value={language[btn.langTextCode]} />
              ) )
            }
          </div>
        )}
      </LanguageContext.Consumer>
    );
  }
}
