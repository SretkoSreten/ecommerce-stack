import { 
    GET_PRODUCTS_REQUEST, 
    GET_PRODUCTS_SUCCESS, 
    GET_PRODUCTS_FAILURE 
  } from '../constants/actions.constants';
  
  interface State {
    products: any[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: State = {
    products: [],
    loading: false,
    error: null,
  };
  
  const homeReducer = (state = initialState, action: any): State => {
    switch (action.type) {
      case GET_PRODUCTS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case GET_PRODUCTS_SUCCESS:
        return {
          ...state,
          products: action.payload,
          loading: false,
          error: null,
        };
      case GET_PRODUCTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default homeReducer;
  