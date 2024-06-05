import {
  GET_HEADER_FAILURE,
  GET_HEADER_SUCCESS,
  GET_HEADER_REQUEST,
} from "../constants/actions.constants";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
};

const layoutReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_HEADER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_HEADER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_HEADER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
