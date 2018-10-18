import React, { Component } from 'react';
import SortBtn from './SortBtn';
import { LanguageContext } from '../logic/language-context';
import '../stylesheets/FilterBtnGroup.css';

const btns = [
  {
    sort: ( a, b ) => ( a.id - b.id ),
    lang_text_code: "sort_for_id_text",
  },
  {
    sort: ( a, b ) => ( a.value - b.value ),
    lang_text_code: "sort_for_value_text"
  },
  {
    sort: ( a, b ) => ( Date.parse(a.date) - Date.parse(b.date) ),
    lang_text_code: "sort_for_date_text",
  },
];

export default class SortBtnGroup extends Component {
  handleSortBtnClick = (...args) => {
    this.props.handleSortBtnClick(...args);
  }

  render() {
    return(
      <LanguageContext.Consumer>
      {language => (
        <div className="FilterBtnGroup">
          {
            btns.map(( btn, index ) => (
              <SortBtn
                key={index}
                id={index}
                actived={this.props.actived === index}
                onClick={this.handleSortBtnClick}
                sort={btn.sort}
                value={language[btn.lang_text_code]} />
            ))
          }
        </div>
      )}
      </LanguageContext.Consumer>
    );
  }
}
