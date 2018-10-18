import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import FiltersBtnGroup from './FilterBtnGroup';
import TransactionsTable from './TransactionsTable';
import AddTransactionForm from './AddTransactionForm';
import CannotBeLoaded from './CannotBeLoaded';
import Modal from './Modal';
import BtnTogggle from './BtnToggle';
import Waves from '../frameworks/waves/';
import { LanguageContext, languages} from '../logic/language-context';
import colorThemes from '../data/colorThemes';
import { appAnimationDuration, animationDuration } from '../data/consts';
import '../stylesheets/App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.appRef = React.createRef();

    Waves.init({
      duration: 1000,
    });
  }

  state = {
    language: localStorage.getItem("language") ? localStorage.getItem("language") : "ru",
    transactions: [],
    filteredTransactions: [],
    activedFilters: [],
    isLoadingData: true,
    isCannotBeLoaded: false,
    isModalOpen: false,
    animation: false,
    currentColorTheme: localStorage.getItem("theme") ? +localStorage.getItem("theme") : 0,
  };

  componentDidMount() {
    axios.get("http://localhost:3001/transactions").then(res => {
      const transactions = res.data;

      this.setState({
        isLoadingData: false,
        transactions: transactions,
        filteredTransactions: transactions,
      });

      const theme = localStorage.getItem("theme");

      if (theme)
        this.changeColorTheme(colorThemes[theme]);
    })
    .catch(req => {
      this.setState({
        isCannotBeLoaded: true,
      })
    });
  }

  handleFilterBtnClick = (id, filter, isActive) => {
    let updatedFilteredTransactions = this.state.transactions;
    const updatedActivedFilters = this.state.activedFilters;

    if (isActive) {
      updatedActivedFilters.push({ id, filter });
    } else {
      updatedActivedFilters.forEach(( e, index ) => {
        if (e.id === id)
          updatedActivedFilters.splice(index, 1);
      });
    }

    updatedActivedFilters.forEach(( item ) => {
      if (updatedFilteredTransactions.length > 0)
        updatedFilteredTransactions = updatedFilteredTransactions.filter(item.filter);
    });

    this.setState({
      filteredTransactions: updatedFilteredTransactions,
      activedFilters: updatedActivedFilters,
    });
  };

  handleAddTransaction = ({ id, type, value, date }) => {
    const updatedTransactions = this.state.transactions;

    updatedTransactions.push({
      id, type, value, date,
    });

    this.setState({
      transactions: updatedTransactions,
      filteredTransactions: updatedTransactions,
      activedFilters: [],
    })
  };

  transactionTableUpdate = () => {
    this.setState({
      activedFilters: [],
      filteredTransactions: this.state.transactions,
    });
  };

  onModalClose = () => {
    this.setState({
      isModalOpen: false,
    });
  };

  onModalOpen = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleEnter = () => {
    this.setState({
      animation: true,
    });
  };

  handleExit = () => {
    setTimeout(() => {
      this.setState({
        animation: false,
      })
    }, animationDuration - appAnimationDuration);
  };

  handleLanguageToggle = ( isActive ) => {
    this.setState(state => ({
      language:
        state.language === "ru"
        ? "en"
        : "ru"
    }), () => {
      localStorage.setItem("language", this.state.language);
    });
  };

  changeColorTheme(
    {
      mainColor,
      appBackgroundColor,
      appTextColor,
      btnColor,
      btnColorHover,
      btnBackgroundColor,
      btnBackgroundColorHover,
      btnToggleColor,
      btnToggleColorHover,
      btnToggleColorActive,
      btnToggleBackgroundColor,
      btnToggleBackgroundColorHover,
      btnToggleBackgroundColorActive,
      modalHeaderColor,
      modalHeaderBackgroundColor,
      modalWindowColor,
      modalWindowBackgroundColor,
      modalFooterColor,
      modalFooterBackgroundColor,
      tableTrEvenBackgroundColor,
      easeTransparent,
      selectionColor,
      selectionBackgroundColor,
    }) {
    const app = this.appRef.current;

    app.style.setProperty("--app-color-main", mainColor);
    app.style.setProperty("--app-background-color", appBackgroundColor);
    app.style.setProperty("--app-text-color", appTextColor);
    app.style.setProperty("--btn-color", btnColor);
    app.style.setProperty("--btn-color-hover", btnColorHover);
    app.style.setProperty("--btn-background-color", btnBackgroundColor);
    app.style.setProperty("--btn-background-color-hover", btnBackgroundColorHover);
    app.style.setProperty("--btn-toggle-color", btnToggleColor);
    app.style.setProperty("--btn-toggle-color-hover", btnToggleColorHover);
    app.style.setProperty("--btn-toggle-color-active", btnToggleColorActive);
    app.style.setProperty("--btn-toggle-background-color", btnToggleBackgroundColor);
    app.style.setProperty("--btn-toggle-background-color-hover", btnToggleBackgroundColorHover);
    app.style.setProperty("--btn-toggle-background-color-active", btnToggleBackgroundColorActive);
    app.style.setProperty("--modal-header-color", modalHeaderColor);
    app.style.setProperty("--modal-header-background-color", modalHeaderBackgroundColor);
    app.style.setProperty("--modal-window-color", modalWindowColor);
    app.style.setProperty("--modal-window-background-color", modalWindowBackgroundColor);
    app.style.setProperty("--modal-footer-color", modalFooterColor);
    app.style.setProperty("--modal-footer-background-color", modalFooterBackgroundColor);
    app.style.setProperty("--table-tr-even-background-color", tableTrEvenBackgroundColor);
    app.style.setProperty("--ease-transparent", easeTransparent);
    app.style.setProperty("--selection-color", selectionColor);
    app.style.setProperty("--selection-background-color", selectionBackgroundColor);
  }

  handleThemeNightToggle = ( isActive ) => {
    const to = isActive ? 1 : 0;
    this.changeColorTheme(colorThemes[to]);
    this.setState({
      currentColorTheme: to,
    }, () => {
      this.changeColorTheme(colorThemes[this.state.currentColorTheme]);
      localStorage.setItem("theme", this.state.currentColorTheme);
    });
  };

  render() {
    return (
      <Router>
        <Route render={({ location }) => (
          <LanguageContext.Provider value={this.state.language === "ru" ? languages.ru : languages.en}>
            <LanguageContext.Consumer>
              {language => (
                <div>
                  {this.state.isLoadingData && !this.state.isCannotBeLoaded
                  ? <div className="loading">
                      <div className="loading__preload"></div>
                      <div className="loading__text">
                        {language.loading_text}
                      </div>
                    </div>
                  : this.state.isCannotBeLoaded
                    ? <CannotBeLoaded/>
                    : ""
                  }
                  {!this.state.isLoadingData
                  ?
                  <div
                    className={
                      `App ${!this.state.isLoadingData
                        ? `loaded ${this.state.animation ? "anim-enter" : "anim-exit"}`
                        : ""}`}
                    ref={this.appRef}>
                    <header className="App__header">
                      <div className="App__header_text">
                        <span>{language.header_text}</span>
                      </div>
                      <div className="App__header_ins_panel">
                      {/*
                        <Btn
                          className=""
                          value={language.other_theme_text}
                          onClick={this.nextColorTheme}/>
                      */}
                        <BtnTogggle
                          className="ThemeToggle"
                          value={language.night_text}
                          actived={this.state.currentColorTheme === 1}
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
                                <FiltersBtnGroup handleFilterBtnClick={this.handleFilterBtnClick}/>
                                  <TransactionsTable
                                    update={this.transactionTableUpdate}
                                    filteredTransactions={this.state.filteredTransactions}/>
                                  {this.state.filteredTransactions.length === 0
                                    ? <div className="warning-text">
                                        {language.there_is_not_transactions_text}
                                      </div>
                                    : ""}
                              </div>
                            )} />
                            <Route
                              path="/add"
                              render={() => (
                              <AddTransactionForm
                                modalOpen={this.onModalOpen}
                                isModalOpen={this.state.isModalOpen}
                                lastTransactionId={this.state.transactions.length}
                                onSubmit={this.handleAddTransaction}/>
                            )} />
                            <Route render={() => (
                              <Redirect to="/"/>
                            )} />
                          </Switch>
                        </CSSTransition>
                      </TransitionGroup>
                    </main>
                    <Modal
                      onModalClose={this.onModalClose}
                      isOpen={this.state.isModalOpen}
                      header={language.notification_text}
                      message={`${language.modal_mess_part_1} №${this.state.transactions.length - 1} ${language.modal_mess_part_2}`} />
                  </div>
                  : ""}
                </div>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )}/>
      </Router>
    );
  }
}
