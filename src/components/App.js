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
import NightFeaturePresentDialog from '../containers/NightFeaturePresentDialog';
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
    anchorEl: null,
    isActiveFeatureNightTheme: localStorage.getItem("isActiveFeatureNightTheme") || false,
    handler: window.StripeCheckout.configure({
      key: 'pk_test_s2ySk94pjLiU9giOAhAhAvOT',
      image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
      locale: 'auto',
      token: () => {
        this.setState({
          isActiveFeatureNightTheme: true
        });

        localStorage.setItem("isActiveFeatureNightTheme", true);
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
        <Route render={({ location }) => (
          <LanguageContext.Provider
            value={languages[this.state.language]}>
            <LanguageContext.Consumer>
              {language => (
<<<<<<< HEAD
                <div>
                  {
                    showIf(
                      this.state.isLoadingData && !this.state.isCannotBeLoaded,
                      <Loading />,
                      showIf(
                        this.state.isCannotBeLoaded,
                        <CannotBeLoaded />
                      )
                    )
                  }
                  {
                    showIf(
                      !this.state.isLoadingData,
                      <div
                        className={
                          `App ${this.state.animation ? "anim-enter" : "anim-exit"}`}
                        ref={this.appRef}>
                        <header className="App__header">
                          <div className="App__header_text">
                            <span>{language.header_text}</span>
                          </div>
                          <div className="App__header_ins_panel">
                            <BtnTogggle
                              className="ThemeToggle"
                              value={language.night_text}
                              actived={this.state.currentColorTheme === "1"}
                              onClick={this.handleThemeNightToggle} />
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
                              timeout={animationDuration}
                              onEnter={this.handleEnter}
                              onExit={this.handleExit}>
                              <Switch location={location}>
                                <Route
                                  exact path="/"
                                  render={() => (
                                    <div className="wrapper">
                                      <Link to="/add">{language.link_add_text}</Link>
                                      <FilterBtnGroup
                                        handleFilterBtnClick={this.handleFilterBtnClick} />
                                      <SortBtnGroup
                                        actived={this.state.activedSortBtn}
                                        handleSortBtnClick={this.handleSortBtnClick} />
                                      <TransactionsTable
                                        update={this.transactionTableUpdate}
                                        filteredTransactions={this.state.filteredTransactions} />
                                      {
                                        showIf(
                                          !this.state.filteredTransactions.length,
                                          <div className="warning-text">
                                            {language.there_is_not_transactions_text}
                                          </div>
                                        )
                                      }
                                    </div>
                                  )} />
                                <Route
                                  path="/add"
                                  render={() => (
                                    <AddTransactionForm
                                      modalOpen={this.onModalOpen}
                                      isModalOpen={this.state.isModalOpen}
                                      lastTransactionId={this.state.transactions.length}
                                      onSubmit={this.handleAddTransaction} />
                                  )} />
                                <Route render={() => <Redirect to="/" /> } />
                              </Switch>
                            </CSSTransition>
                          </TransitionGroup>
                        </main>
                        <Modal
                          onModalClose={this.onModalClose}
                          isOpen={this.state.isModalOpen}
                          header={language.notification_text}
                          message={
                            `${language.modal_mess_part_1}
                            №${this.state.transactions.length - 1}
                            ${language.modal_mess_part_2}`} />
                      </div>
                    )
                  }
=======
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
                          if (this.state.isActiveFeatureNightTheme)
                            this.props.changeTheme();
                          else
                            this.props.toggleDialog("NightFeaturePresentDialog", true);
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
                              path="/:something/addTransaction"
                              render={() => <AddTransactionDialog /> } />
                            <Route
                              path="/:something/addCounterpart"
                              render={() => <AddCounterpartDialog /> } />
                          </Switch>
                        </div>
                      </CSSTransition>
                    </TransitionGroup>
                  </main>
                  <NightFeaturePresentDialog handler={this.state.handler}/>
>>>>>>> part3
                </div>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )} />
      </Router>
    );
  }
}
