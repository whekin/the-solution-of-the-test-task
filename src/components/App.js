import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Loading from './Loading';
import FilterBtnGroup from './FilterBtnGroup';
import SortBtnGroup from './SortBtnGroup';
import TransactionsTable from '../containers/TransactionsTable';
import CounterpartsTable from '../containers/CounterpartsTable';
import AddTransactionForm from '../containers/AddTransactionForm';
import CannotBeLoaded from './CannotBeLoaded';
import BtnTogggle from './BtnToggle';
import Waves from 'node-waves';
import { LanguageContext, languages } from '../logic/language-context';
import colorThemes, { DARK_THEME } from '../logic/colorThemes';
import { changeColorTheme } from '../logic/changeColorTheme';
import 'normalize.css';
import '../stylesheets/App.css';

const DEFAULT_LANGUAGE_CODE = "ru";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();

    this.props.getData('TRANSACTIONS', 'http://localhost:3001/transactions');
    this.props.getData('COUNTERPARTS', 'http://localhost:3002/counterparts');

    Waves.init({ duration: 1000 });
  }

  state = {
    language: localStorage.getItem("language")
      ? localStorage.getItem("language")
      : DEFAULT_LANGUAGE_CODE
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

  renderTemplate(location, language) {
    if (this.props.loadingState === "loading_data")
      return (
        <Loading />
      );
    else if (this.props.loadingState === "fail")
      return (
        <CannotBeLoaded />
      );
    else if (this.props.loadingState === "loaded")
      return (
        <div
          className="App"
          ref={app => {
            if (app)
              changeColorTheme(app, colorThemes[this.props.currentTheme]);
          }}>
          <header className="App__header">
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
                        <Link to="/add">{language.link_add_text}</Link>
                        <FilterBtnGroup />
                        <SortBtnGroup />
                        <TransactionsTable />
                        <CounterpartsTable />
                      </div>
                    )} />
                  <Route
                    path="/add"
                    render={() => <AddTransactionForm /> } />
                  <Route render={() => <Redirect to="/" /> } />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </main>
        </div>
      );
    return <div></div>;
  }

  render() {
    return (
      <Router>
        <Route render={({ location }) => (
          <LanguageContext.Provider
            value={languages[this.state.language]}>
            <LanguageContext.Consumer>
              {language => (
                <div>
                  {this.renderTemplate(location, language)}
                </div>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )} />
      </Router>
    );
  }
}
