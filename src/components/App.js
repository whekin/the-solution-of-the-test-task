import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FilterBtnGroup from './FilterBtnGroup';
import TransactionsTable from '../containers/TransactionsTable';
import CounterpartsTable from '../containers/CounterpartsTable';
import AddTransactionDialog from '../containers/AddTransactionDialog';
import AddCounterpartDialog from '../containers/AddCounterpartDialog';
import BtnTogggle from './BtnToggle';
import Menu from '../containers/Menu';
import Waves from 'node-waves';
import { LanguageContext, languages } from '../logic/language-context';
import colorThemes, { DARK_THEME } from '../logic/colorThemes';
import { changeColorTheme } from '../logic/changeColorTheme';
import '../stylesheets/App.css';

const DEFAULT_LANGUAGE_CODE = "ru";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();
    const { getData } = this.props;

    getData('transactions', 'http://localhost:3001/transactions');
    getData('counterparts', 'http://localhost:3002/counterparts');

    Waves.init({ duration: 1000 });
  }

  state = {
    language: localStorage.getItem("language")
      ? localStorage.getItem("language")
      : DEFAULT_LANGUAGE_CODE,
    anchorEl: null
  };

  handleLanguageToggle = () => {
    this.setState(state => ({
      language:
        state.language === "ru"
          ? "en"
          : "ru"
    }), () => {
      localStorage.setItem("language", this.state.language);
    });
  };

  render() {
    return (
      <Router>
        <Route render={({ location }) => (
          <LanguageContext.Provider
            value={languages[this.state.language]}>
            <LanguageContext.Consumer>
              {language => (
                <div
                  className="App"
                  ref={app => {
                    if (app)
                      changeColorTheme(app, colorThemes[this.props.currentTheme]);
                  }}>
                  <header className="App__header">
                    <div className="App__header_menu">
                      <Menu location={location}/>
                    </div>
                    <div className="App__header_text">
                      <span>{language.header_text}</span>
                    </div>
                    <div className="App__header_ins_panel">
                      <BtnTogggle
                        className="ThemeToggle"
                        value={language.night_text}
                        actived={this.props.currentTheme === DARK_THEME}
                        onClick={() => {
                          this.props.changeTheme();
                        }} />
                      <BtnTogggle
                        className="LanguageToggle"
                        value="En"
                        actived={this.state.language === "en"}
                        onClick={this.handleLanguageToggle} />
                    </div>
                  </header>
                  <main className="App__main">
                    <TransitionGroup>
                      <CSSTransition
                        key={location.key}
                        classNames="fade"
                        timeout={1000}>
                        <div>
                          <Switch location={location}>
                            <Route
                              path="/transactions"
                              render={() => (
                                <div className="wrapper">
                                  <FilterBtnGroup />
                                  <TransactionsTable />
                                </div>
                              )} />
                            <Route
                              path="/counterparts"
                              render={() => (
                                <div className="wrapper">
                                  <CounterpartsTable />
                                </div>
                              )} />
                          </Switch>
                          <Switch location={location}>
                            <Route
                              path="/transactions/add"
                              render={() => <AddTransactionDialog /> } />
                            <Route
                              path="/counterparts/add"
                              render={() => <AddCounterpartDialog /> } />
                          </Switch>
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  </main>
                </div>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )} />
      </Router>
    );
  }
}
