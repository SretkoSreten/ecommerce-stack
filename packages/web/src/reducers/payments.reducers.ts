import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  SELECT_PAYMENT_SUCCESS,
} from "../constants/actions.constants";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
  created?: boolean;
  creating?: boolean;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
  created: false,
};

const paymentsReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_PAYMENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_PAYMENT_REQUEST:
      return {
        ...state,
        created: false,
        creating: true,
      };
    case CREATE_PAYMENT_SUCCESS:
      return {
        ...state,
        created: true,
        creating: false,
      };
    case GET_PAYMENTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case SELECT_PAYMENT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_PAYMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        creating: false,
      };

    default:
      return state;
  }
};

export default paymentsReducer;
