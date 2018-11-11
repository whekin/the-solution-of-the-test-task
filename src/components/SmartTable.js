import React, { Component } from 'react';
import { LanguageContext } from '../logic/language-context';
import Preloader from './Preloader';
import { Tooltip } from '@material-ui/core';
import '../stylesheets/SmartTable.css';

export default class SmartTable extends Component {
  state = {
    activeSort: this.props.defaultSort,
    isReverse: false
  }

  isDataLoaded(data) {
    let
      count = 0,
      loadedCount = 0;

    Object.keys(data).forEach(key => {
      count += 1;
      if (data[key].loadingState === "success")
        loadedCount += 1;
    });

    return count === loadedCount;
  }

  isDataCantBeLoaded(data) {
    let count = 0;

    Object.keys(data).forEach(key => {
      if (data[key].loadingState === "fail")
        count += 1;
    });

    return count > 0;
  }

  tbodyTemplate = language => {
    if (this.isDataLoaded(this.props.data) )
      return this.props.tbody({
        language,
        sort: this.state.activeSort,
        isReverse: this.state.isReverse,
        data: this.props.data
      });
    else if (this.isDataCantBeLoaded(this.props.data) )
      return (
        <tbody>
          <tr >
            <td colSpan="4">
              <center>No data was loaded...</center>
            </td>
          </tr>
        </tbody>
      );
    else
      return (
        <tbody>
          <tr>
            <td colSpan="4">
              <Preloader />
            </td>
          </tr>
        </tbody>
      );
  };

  render() {
    return (
      <LanguageContext.Consumer>
        {language => (
          <table>
            <thead>
              <tr>
                {
                  this.props.ths(language)
                    .map(th => {
                      const isActiveSort = th.sort === this.state.activeSort;
                      const isHavingSort = th.sort !== null;

                      return (
                        <Tooltip
                          key={th.name}
                          title={isHavingSort ? language.sort_text : ""}>
                          <th
                            className={isHavingSort ? "havingSort" : ""}
                            onClick={() => {
                              if (th.sort === this.state.activeSort)
                                this.setState(state => ({
                                  isReverse: !state.isReverse
                                }) );
                              else if (this.state.isReverse)
                                this.setState({
                                  isReverse: false
                                });

                              if (th.sort)
                                this.setState({
                                  activeSort: th.sort
                                });
                            }}>
                            {`${th.name} ${isActiveSort
                              ? this.state.isReverse ? "▼" : "▲"
                              : ""}`}
                          </th>
                        </Tooltip>
                      );
                    })
                }
              </tr>
            </thead>
            {
              this.tbodyTemplate(language)
            }
          </table>
        )}
      </LanguageContext.Consumer>
    );
  }
}
