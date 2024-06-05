import {
  GET_LAYOUT_REQUEST,
  GET_LAYOUT_SUCCESS,
  GET_LAYOUT_FAILURE,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_FAILURE,
  CLEAR_SEARCH_ITEMS,
} from "../constants/actions.constants";

interface State {
  data: any;
  loading: boolean;
  error: string | null;
  searchItems: any;
}

const initialState: State = {
  data: null,
  loading: false,
  error: null,
  searchItems: [],
};

const layoutReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_LAYOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LAYOUT_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_LAYOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case GET_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SEARCH_SUCCESS:
      return {
        ...state,
        searchItems: action.payload,
        loading: false,
        error: null,
      };
    case GET_SEARCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_SEARCH_ITEMS:
      return {
        ...state,
        loading: false,
        searchItems: [],
      };
    default:
      return state;
  }
};

export default layoutReducer;
