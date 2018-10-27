import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Loading from './Loading';
import FilterBtnGroup from './FilterBtnGroup';
import SortBtnGroup, { sortBtns } from './SortBtnGroup';
import TransactionsTable from './TransactionsTable';
import AddTransactionForm from './AddTransactionForm';
import CannotBeLoaded from './CannotBeLoaded';
import Modal from './Modal';
import BtnTogggle from './BtnToggle';
import Waves from 'node-waves';
import { LanguageContext, languages } from '../logic/language-context';
import showIf from '../logic/showIf';
import colorThemes from '../data/colorThemes';
import { appAnimationDuration, animationDuration } from '../data/consts';
import 'normalize.css';
import '../stylesheets/App.css';

const LIGHT_THEME_INDEX = 0;
const DEFAULT_LANGUAGE_CODE = "ru";
const DEFAULT_SORT_BTN_INDEX = 0;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.appRef = React.createRef();

    Waves.init({
      duration: 1000
    });
  }

  state = {
    language: localStorage.getItem("language")
      ? localStorage.getItem("language")
      : DEFAULT_LANGUAGE_CODE,
    transactions: [],
    filteredTransactions: [],
    activedFilters: [],
    activedSortBtn: DEFAULT_SORT_BTN_INDEX,
    currentSort: sortBtns[DEFAULT_SORT_BTN_INDEX].sort,
    isLoadingData: true,
    isCannotBeLoaded: false,
    isModalOpen: false,
    animation: false,
    currentColorTheme: localStorage.getItem("theme") || LIGHT_THEME_INDEX
  };

  componentDidMount() {
    axios.get("http://localhost:3001/transactions").then(res => {
      const transactions = res.data;

      this.setState({
        isLoadingData: false,
        transactions,
        filteredTransactions: transactions
      });

      const theme = localStorage.getItem("theme");

      if (theme) this.changeColorTheme(colorThemes[theme]);
    })
      .catch( () => {
        this.setState({
          isCannotBeLoaded: true
        });
      });
  }

  /**
   * Handle FilterBtnGroup
   * @param  {number}  id
   * @param  {Function} filter
   * @param  {boolean} isActive
   */
  handleFilterBtnClick = (id, filter, isActive) => {
    let updatedFilteredTransactions = this.state.transactions;
    const updatedActivedFilters = this.state.activedFilters;

    if (isActive)
      updatedActivedFilters.push({
        id,
        filter
      });
    else
      updatedActivedFilters.forEach( (e, index) => {
        if (e.id === id) updatedActivedFilters.splice(index, 1);
      });

    updatedActivedFilters.forEach(item => {
      if (updatedFilteredTransactions.length > 0)
        updatedFilteredTransactions = updatedFilteredTransactions.filter(item.filter);
    });

    updatedFilteredTransactions = updatedFilteredTransactions.sort(this.state.currentSort);

    this.setState({
      filteredTransactions: updatedFilteredTransactions,
      activedFilters: updatedActivedFilters
    });
  };

  /**
   * Handle SortBtnClick
   * @param  {number} id
   * @param  {Function} sort
   */
  handleSortBtnClick = (id, sort) => {
    const { filteredTransactions } = this.state;

    this.setState({
      currentSort: sort,
      activedSortBtn: id,
      filteredTransactions: filteredTransactions.sort(sort)
    });
  };

  /**
   * Hande addTransaction AddTransactionForm
   * @param  {number} id
   * @param  {string} type
   * @param  {number} value
   * @param  {string} date
   */
  handleAddTransaction = ({ id, type, value, date }) => {
    const updatedTransactions = this.state.transactions;

    updatedTransactions.push({
      id,
      type,
      value,
      date
    });

    this.setState({
      transactions: updatedTransactions,
      filteredTransactions: updatedTransactions,
      activedFilters: []
    });
  };

  transactionTableUpdate = () => {
    this.setState({
      activedFilters: [],
      filteredTransactions: this.state.transactions
    });
  };

  onModalClose = () => {
    this.setState({
      isModalOpen: false
    });
  };

  onModalOpen = () => {
    this.setState({
      isModalOpen: true
    });
  };

  handleEnter = () => {
    this.setState({
      animation: true
    });
  };

  handleExit = () => {
    window.setTimeout( () => {
      this.setState({
        animation: false
      });
    }, animationDuration - appAnimationDuration);
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

  /**
   * Change color theme of the app
   * @param {Object} theme
   * @param {string} theme.mainColor
   * @param {string} theme.appBackgroundColor
   * @param {string} theme.appTextColor
   * @param {string} theme.btnColor
   * @param {string} theme.btnColorHover
   * @param {string} theme.btnBackgroundColor
   * @param {string} theme.btnBackgroundColorHover
   * @param {string} theme.btnToggleColor
   * @param {string} theme.btnToggleColorHover
   * @param {string} theme.btnToggleColorActive
   * @param {string} theme.btnToggleBackgroundColor
   * @param {string} theme.btnToggleBackgroundColorHover
   * @param {string} theme.btnToggleBackgroundColorActive
   * @param {string} theme.modalHeaderColor
   * @param {string} theme.modalHeaderBackgroundColor
   * @param {string} theme.modalWindowColor
   * @param {string} theme.modalWindowBackgroundColor
   * @param {string} theme.modalFooterColor
   * @param {string} theme.modalFooterBackgroundColor
   * @param {string} theme.tableTrEvenBackgroundColor
   * @param {string} theme.easeTransparent
   * @param {string} theme.selectionColor
   * @param {string} theme.selectionBackgroundColor
   */
  changeColorTheme(theme) {
    const app = this.appRef.current;

    app.style.setProperty("--app-color-main", theme.mainColor);
    app.style.setProperty("--app-background-color", theme.appBackgroundColor);
    app.style.setProperty("--app-text-color", theme.appTextColor);
    app.style.setProperty("--btn-color", theme.btnColor);
    app.style.setProperty("--btn-color-hover", theme.btnColorHover);
    app.style.setProperty("--btn-background-color", theme.btnBackgroundColor);
    app.style.setProperty("--btn-background-color-hover", theme.btnBackgroundColorHover);
    app.style.setProperty("--btn-toggle-color", theme.btnToggleColor);
    app.style.setProperty("--btn-toggle-color-hover", theme.btnToggleColorHover);
    app.style.setProperty("--btn-toggle-color-active", theme.btnToggleColorActive);
    app.style.setProperty("--btn-toggle-background-color", theme.btnToggleBackgroundColor);
    app.style.setProperty("--btn-toggle-background-color-hover", theme.btnToggleBackgroundColorHover);
    app.style.setProperty("--btn-toggle-background-color-active", theme.btnToggleBackgroundColorActive);
    app.style.setProperty("--modal-header-color", theme.modalHeaderColor);
    app.style.setProperty("--modal-header-background-color", theme.modalHeaderBackgroundColor);
    app.style.setProperty("--modal-window-color", theme.modalWindowColor);
    app.style.setProperty("--modal-window-background-color", theme.modalWindowBackgroundColor);
    app.style.setProperty("--modal-footer-color", theme.modalFooterColor);
    app.style.setProperty("--modal-footer-background-color", theme.modalFooterBackgroundColor);
    app.style.setProperty("--table-tr-even-background-color", theme.tableTrEvenBackgroundColor);
    app.style.setProperty("--ease-transparent", theme.easeTransparent);
    app.style.setProperty("--selection-color", theme.selectionColor);
    app.style.setProperty("--selection-background-color", theme.selectionBackgroundColor);
  }

  handleThemeNightToggle = isActive => {
    const themeIndex = isActive ? 1 : 0;
    this.changeColorTheme(colorThemes[themeIndex]);
    this.setState({
      currentColorTheme: themeIndex
    }, () => {
      this.changeColorTheme(colorThemes[this.state.currentColorTheme]);
      localStorage.setItem("theme", this.state.currentColorTheme);
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
                </div>
              )}
            </LanguageContext.Consumer>
          </LanguageContext.Provider>
        )} />
      </Router>
    );
  }
}
