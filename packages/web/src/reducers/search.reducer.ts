import { GET_SEARCH_FAILURE, GET_SEARCH_REQUEST, GET_SEARCH_SUCCESS } from "../constants/actions.constants";

// Define State interface for search
interface SearchState {
  searchItems: any;
  loading: boolean;
  error: string | null;
}

// Initial state for search
const initialSearchState: SearchState = {
  searchItems: [],
  loading: false,
  error: null,
};

// Search reducer function
const searchReducer = (state = initialSearchState, action: any): SearchState => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default searchReducer;