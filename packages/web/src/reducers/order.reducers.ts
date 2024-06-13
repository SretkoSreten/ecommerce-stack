// productReducer.ts

import {
  DELETE_PAYMENT_SUCCESS,
  GET_ACC_ORDERS_FAILURE,
  GET_ACC_ORDERS_REQUEST,
  GET_ACC_ORDERS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS
} from "../constants/actions.constants";

interface OrderState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: OrderState = {
  loading: false,
  data: null,
  error: null
};


const accInitialState: OrderState = {
  loading: false,
  data: null,
  error: null
};


const orderDetailsState: OrderState = {
  loading: false,
  data: null,
  error: null
};

const orderReducer = (state = initialState, action: any): OrderState => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const accOrdersReducer = (state = accInitialState, action: any): OrderState => {
  switch (action.type) {
    case GET_ACC_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ACC_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ACC_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const orderDetailsReducer = (state = orderDetailsState, action: any): OrderState => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case GET_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export { orderReducer, accOrdersReducer, orderDetailsReducer };
