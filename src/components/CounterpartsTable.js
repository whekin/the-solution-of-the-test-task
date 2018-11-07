import React, { Component } from 'react';
import Preloader from './Preloader';
import { LanguageContext } from '../logic/language-context';

export default class CounterpartsTable extends Component {
  tbodyRender = () => {
    const { counterparts } = this.props;

    if (counterparts.loadingState === "request")
      return (
        <tbody>
          <tr>
            <td colSpan="2">
              <Preloader />
            </td>
          </tr>
        </tbody>
      );
    else if (counterparts.loadingState === "success")
      return (
        <tbody>
          {counterparts.data.map(counterpart => (
            <tr key={counterpart.id}>
              <td>{counterpart.id}</td>
              <td>{counterpart.name}</td>
            </tr>
          ) )
          }
        </tbody>
      );
    else
      return <tbody></tbody>;
  }

  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <table>
            <thead>
              <tr>
                <th>{language.table_id_text}</th>
                <th>{language.table_name_text}</th>
              </tr>
            </thead>
            {this.tbodyRender()}
          </table>
        )}
      </LanguageContext.Consumer>
    );
  }
}
