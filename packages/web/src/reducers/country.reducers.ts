import {
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
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
  updated: false,
};

const countryReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_COUNTRIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default countryReducer;
