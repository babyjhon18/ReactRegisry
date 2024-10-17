//Links----------------------------------
//Server string
// export const SERVER_LINK = "https://localhost:44388/api";
export const SERVER_LINK = "http://192.168.111.141:8087/api";
//Dictionary
export const TEMPLATE_LINK = "/Dictionary/GetTemplate"
export const NOTIFICATION_LINK = "/Dictionary/SendEmail"
//Acts
export const DELETE_UPDATE_ACT = "/Acts?actId=";
export const CREATE_GET_ACT = "/Acts";
//BlackList
export const CREATE_GET_BLACK_LIST = "/BlackListCompanies";
export const DELETE_UPDATE_BLACK_LIST = "/BlackListCompanies?companyId=";
//Contracts
export const CREATE_GET_CONTRACT = "/Contracts";
export const DELETE_UPDATE_CONTRACT = "/Contracts?contractId="
//Payments
export const CREATE_GET_PAYMENTS = "/Payments";
export const DELETE_UPDATE_PAYMENTS = "/Payments?paymentId="
//Methods--------------------------------
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
//MessagesReduser
export const SET_MESSAGE_STATE = "SET_MESSSAGE_STATE"
//Other constants
export const isExistOnBlackList = "Невозможно добавить клиента, так как он уже в черном списке!";
export const jsonHeaderRegistry = {
    id:1,
    notes:"",
    description:"Наименование договора",
    client:"Заказчик",
    contractNumber:"Договор №",
    contractDate:"Дата",
    clientId:1,
    amount:"Сумма",
    percent:"Оплата %",
    termsOfPaymentId:3,
    signatureMark:"В работе",
    sawContract: "Подпись",
    readyMark:"Готовность",
    deadlineCondition:"Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }

  export const jsonHeaderShouldBePaid = {
    id:1,
    notes:"",
    description:"Наименование договора",
    client:"Заказчик",
    contractNumber:"Договор №",
    contractDate:"Дата",
    clientId:1,
    amount:"Сумма",
    percent:"Оплата %",
    termsOfPaymentId:3,
    signatureMark:"Подпись",
    readyMark:"Готовность",
    deadlineCondition:"Срок оплаты",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }

  export const jsonHeaderWorkPlan = {
    id:1,
    notes:"Заметки",
    description:"Наименование договора",
    deviceType: "Оборудование",
    client:"Заказчик",
    contractNumber:"№",
    contractDate:"Дата",
    deadLineDate: "Отгрузка",
    clientId:1,
    amount:"Сумма",
    percent:"%",
    termsOfPaymentId:"Условия оплаты",
    signatureMark:"Подпись",
    readyMark:"Готовность",
    deadlineCondition:"До",
    deadLineSetted: "Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }

  export const jsonHeaderCommissionWorks = {
    id:1,
    notes:"Заметки",
    description:"Наименование договора",
    deviceType: "Оборудование",
    client:"Заказчик",
    contractNumber:"№",
    contractDate:"Дата",
    deadLineDate: "Срок",
    clientId:1,
    amount:"Сумма",
    percent:"%",
    termsOfPaymentId:"Условия оплаты",
    signatureMark:"Подпись",
    readyMark:"Готовность",
    deadlineCondition:"До",
    deadLineSetted: "Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }

  export const jsonHeaderArchive = {
    id:1,
    notes:"Заметки",
    description:"Наименование договора",
    client:"Заказчик",
    contractNumber:"Договор №",
    contractDate:"Дата",
    clientId:1,
    amount:"Сумма",
    percent:"Оплата %",
    termsOfPaymentId:3,
    signatureMark:"В работе",
    sawContract: "Подпись",
    readyMark:"Готовность",
    deadlineCondition:"Срок поставки",
    ourDelivery:"Доставка",
    comment:null,
    htmlSpecification:null
  }
  