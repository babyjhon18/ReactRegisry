//Contracts
export const VIEW_CTC = "VIEW_CTC";
export const UPDATE_CTC_VIEW = "UPDATE_CTC_VIEW"
export const EDIT_CTC = "EDIT_CTC"; 
export const DELETE_CTC = "DELETE_CTC";
export const SEARCH_CTC = "SEARCH_CTC";
export const SORT_CTC = "SORT_CTC";
export const SORT_BY_DATE = "SORT_BY_DATE"; 
//Payments
export const VIEW_PAYM = "VIEW_PAYM";
export const ADD_PAYM = "ADD_PAYM"; 
export const EDIT_PAYM = "EDIT_PAYM";
export const DELETE_PAYM = "DELETE_PAYM";
//Acts
export const VIEW_ACT = "VIEW_ACT";
export const ADD_ACT = "ADD_ACT"; 
export const EDIT_ACT = "EDIT_ACT";
export const DELETE_ACT = "DELETE_ACT";
//Black List of clients 
export const ADD_CLIENT_TO_BLACK_LIST = "ADD_CLIENT_TO_BLACK_LIST";
export const DELETE_CLIENT_FROM_BLACK_LIST = "DELETE_CLIENT_FROM_BLACK_LIST";
//Other constants
export const isExistOnBlackList = "Невозможно добавить клиента, так как он уже в черном списке!";
export const jsonHeaderRegistry = {
    id:1,
    notes:"",
    description:"Наименование договора",
    client:"Заказчик",
    contractNumber:"Номер",
    contractDate:"Дата",
    clientId:1,
    amount:"Сумма",
    percent:"Оплата %",
    termsOfPaymentId:3,
    signatureMark:"Подпись",
    readyMark:"Готовность",
    deadlineCondition:"Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }

  export const jsonHeaderWorkPlan = {
    id:1,
    notes:"",
    description:"Наименование договора",
    client:"Заказчик",
    contractNumber:"Номер",
    contractDate:"Дата",
    clientId:1,
    amount:"Сумма",
    percent:"Оплата %",
    termsOfPaymentId:3,
    signatureMark:"Подпись",
    readyMark:"Готовность",
    deadlineCondition:"Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }