import {
  GET_ADDRESSES_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESS_FAILURE,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
} from "../constants/actions.constants";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
  updated?: boolean;
}

const initialStateAddresses: State = {
  data: null,
  loading: false,
  error: null,
};

const initialStateAddress: State = {
  data: null,
  loading: false,
  error: null,
  updated: false,
};

const addressesReducer = (
  state = initialStateAddresses,
  action: any
): State => {
  switch (action.type) {
    case GET_ADDRESSES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_ADDRESSES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

const addressReducer = (state = initialStateAddress, action: any): State => {
  switch (action.type) {
    case GET_ADDRESS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ADDRESS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_ADDRESS_SUCCESS:
      return {
        ...state,
        updated: true,
        loading: false,
        error: null,
      };
    case GET_ADDRESS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export { addressesReducer, addressReducer };
