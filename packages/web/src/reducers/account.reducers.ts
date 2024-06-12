import {
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
} from "../constants/actions.constants";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
  updated: boolean;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
  updated: false
};

const accountReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ACCOUNT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        updated: true,
        loading: false,
        error: null,
      };
    case GET_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default accountReducer;
