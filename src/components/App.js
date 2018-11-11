import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FilterBtnGroup from './FilterBtnGroup';
import TransactionsTable from '../containers/TransactionsTable';
import CounterpartsTable from '../containers/CounterpartsTable';
import AddTransactionDialog from '../containers/AddTransactionDialog';
import AddCounterpartDialog from '../containers/AddCounterpartDialog';
import BtnTogggle from './BtnToggle';
import NightFeaturePresentDialog from '../containers/NightFeaturePresentDialog';
import Menu from '../containers/Menu';
import { LanguageContext, languages } from '../logic/language-context';
import colorThemes, { DARK_THEME, theme, nightTheme } from '../logic/colorThemes';
import { setColorTheme } from '../logic/setColorTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import '../stylesheets/App.css';


const DEFAULT_LANGUAGE_CODE = "ru";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();
    const { getData } = this.props;

    getData('transactions', 'http://localhost:3001/transactions');
    getData('counterparts', 'http://localhost:3002/counterparts');
  }

  state = {
    language: localStorage.getItem("language")
      ? localStorage.getItem("language")
      : DEFAULT_LANGUAGE_CODE,
    anchorEl: null,
    isActiveFeatureNightTheme: localStorage.getItem("isActiveFeatureNightTheme") || false,
    stripeHandler: window.StripeCheckout.configure({
      key: 'pk_test_s2ySk94pjLiU9giOAhAhAvOT',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: () => {
        this.setState({
          isActiveFeatureNightTheme: true
        });

        localStorage.setItem("isActiveFeatureNightTheme", true);

        this.props.toggleTheme();
      }
    })
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
        <Route render={({ location, history }) => (
          <LanguageContext.Provider
            value={languages[this.state.language]}>
            <LanguageContext.Consumer>
              {language => (
                <MuiThemeProvider
                  theme={this.props.currentTheme === 'LIGHT_THEME' ? theme : nightTheme}>
                  <div
                    className="App"
                    ref={app => {
                      if (app)
                        setColorTheme(app, colorThemes[this.props.currentTheme]);
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
                          color="secondary"
                          onClick={() => {
                            if (this.state.isActiveFeatureNightTheme)
                              this.props.toggleTheme();
                            else
                              this.props.toggleDialog("NightFeaturePresentDialog", true);
                          }} />
                        <BtnTogggle
                          className="LanguageToggle"
                          value="En"
                          actived={this.state.language === "en"}
                          color="secondary"
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
                              <Route
                                render={() => <Redirect to="/transactions" /> } />
                            </Switch>
                            <Switch location={location}>
                              <Route
                                path="/:something/addTransaction"
                                render={() => <AddTransactionDialog history={history} /> } />
                              <Route
                                path="/:something/addCounterpart"
                                render={() => <AddCounterpartDialog history={history} /> } />
                            </Switch>
                          </div>
                        </CSSTransition>
                      </TransitionGroup>
                    </main>
                    <NightFeaturePresentDialog stripeHandler={this.state.stripeHandler}/>
                  </div>
                </MuiThemeProvider>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )} />
      </Router>
    );
  }
}
