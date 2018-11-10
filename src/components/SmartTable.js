import React, { Component } from 'react';
import { LanguageContext } from '../logic/language-context';
import Preloader from './Preloader';
import '../stylesheets/SmartTable.css';

export default class SmartTable extends Component {
  state = {
    activeSort: this.props.defaultSort
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
                        <th
                          className={isHavingSort ? "havingSort" : ""}
                          key={th.name}
                          title={isHavingSort ? language.sort_text : ""}
                          onClick={() => {
                            if (th.sort)
                              this.setState({
                                activeSort: th.sort
                              });
                          }}>
                          {`${th.name} ${isActiveSort ? "▼" : ""}`}
                        </th>
                      );
                    })
                }
              </tr>
            </thead>
            {
              this.isDataLoaded(this.props.data) ?
                this.props.tbody(language, this.state.activeSort, this.props.data) :
                <tbody>
                  <tr colSpan="4">
                    <td>
                      <Preloader />
                    </td>
                  </tr>
                </tbody>
            }
          </table>
        )}
      </LanguageContext.Consumer>
    );
  }
}
