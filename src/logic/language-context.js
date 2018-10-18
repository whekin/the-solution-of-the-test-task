import React from 'react';

export const languages = {
  ru: {
    name: "ru",
    loading_text: "Загрузка...",
    header_text: "Транзакции и фильтры. Часть 2",
    cannotBeLoaded_text: "Приложение не может быть загруженно, так как не запущен json-server. Запустите сервер и обновите страницу.",
    night_text: "Ночь",
    link_add_text: "Добавить новую транзакцию",
    there_is_not_transactions_text: "Транзакций, подходящих под выбранные фильтры — нет!",
    table_id_text: "Ай-ди",
    table_value_text: "Сумма",
    table_date_text: "Дата",
    btn_income_text: "Доход",
    btn_expense_text: "Расход",
    btn_more_1000_text: "Более 1000р",
    btn_for_last_month_text: "За последний месяц",
    sure_leave_page_text: "Вы уверены, что хотите покинуть эту страницу? Данные формы не сохранятся.",
    select_type_text: "Выберете тип",
    select_value_text: "Укажите сумму",
    select_date_text: "Выберете дату",
    select_time_text: "Устрановите время",
    placeholder_value_text: "Сумма",
    btn_add_transaction_text: "Добавить новую транзакцию",
    link_to_main_page_text: "Главная",
    notification_text: "Уведомление",
    modal_mess_part_1: "Транзакция",
    modal_mess_part_2: "добавлена!",
    modal_btn_close_text: "Хорошо!",
    other_theme_text: "Другая тема",
  },
  en: {
    name: "en",
    loading_text: "Loading...",
    header_text: "A transations and a filters (part 2)",
    cannotBeLoaded_text: "The app is cannot be loaded, becouse the json-server is not working now. Please, run the json-server and update the page.",
    night_text: "It's Night",
    link_add_text: "Add a new transaction",
    there_is_not_transactions_text: "There is not some transactions that suitable for the actived filters.",
    table_id_text: "Id",
    table_value_text: "Value",
    table_date_text: "Date",
    btn_income_text: "Income",
    btn_expense_text: "Expense",
    btn_more_1000_text: "More 17$",
    btn_for_last_month_text: "For last month",
    sure_leave_page_text: "Do your sure you want to leave the page? The data won't save.",
    select_type_text: "Select the type",
    select_value_text: "Type the value",
    select_date_text: "Select the date",
    select_time_text: "Select the time",
    placeholder_value_text: "Value",
    btn_add_transaction_text: "Add the new transaction",
    link_to_main_page_text: "Main page",
    notification_text: "Notification",
    modal_mess_part_1: "The transaction",
    modal_mess_part_2: "is added!",
    modal_btn_close_text: "Ok!",
    other_theme_text: "Other theme",
  },
};

export const LanguageContext = React.createContext(
  languages.ru
);