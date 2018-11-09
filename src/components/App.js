import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FilterBtnGroup from './FilterBtnGroup';
import SortBtnGroup from './SortBtnGroup';
import TransactionsTable from '../containers/TransactionsTable';
import CounterpartsTable from '../containers/CounterpartsTable';
import AddTransactionForm from '../containers/AddTransactionForm';
import BtnTogggle from './BtnToggle';
import Menu from './Menu';
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
                      <Menu />
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
                        <Switch location={location}>
                          <Route
                            exact path="/"
                            render={() => (
                              <div className="wrapper">
                                <FilterBtnGroup />
                                <SortBtnGroup />
                                <TransactionsTable />
                              </div>
                            )} />
                          <Route
                            path="/add"
                            render={() => <AddTransactionForm /> } />
                          <Route
                            path="/counterparts"
                            render={() => <CounterpartsTable />} />
                          <Route render={() => <Redirect to="/" /> } />
                        </Switch>
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
