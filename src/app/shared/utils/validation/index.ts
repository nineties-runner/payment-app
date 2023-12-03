import { Validation } from "../types";

const VALIDATION: Validation = {
  CARD_NUMBER: {
    required: "Укажите действительные данные карты",
    pattern: {
      value: /[0-9|\s]{19}/,
      message: "Неверный формат номера карты",
    },
  },
  CARD_DATE: {
    required: "Укажите дату",
    inputFormat: "mm/yy",
    pattern: {
      value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      message: "Неверный формат даты экспирации",
    },
  },
  CARD_CVC: {
    required: "Укажите номер CVC",
    pattern: {
      value: /[0-9]{3}/,
      message: "Неверный формат номера CVC",
    },
  },
  PHONE_NUMBER: {
    required: "Укажите номер телефона",
    pattern: {
      value: /.7 .[0-9]{3}. [0-9]{3} [0-9]{2}-[0-9]{2}/,
      message: "Неверный формат номера телефона",
    },
  },
  PAYMENT_SUM: {
    required: "Укажите сумму, макс. 1000р.",
    pattern: {
      value: /^(1000|[0-9]{1,3}) руб./,
      message: "Укажите сумму, макс. 1000р. ",
    },
  },
};

export default VALIDATION;
