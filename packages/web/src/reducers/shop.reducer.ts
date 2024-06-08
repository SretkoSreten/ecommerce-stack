import {
  GET_SHOP_REQUEST,
  GET_SHOP_SUCCESS,
  GET_SHOP_FAILURE,
  GET_SHOP_PRODUCTS_SUCCESS,
} from "../constants/actions.constants";

interface State {
  data: any;
  products: any;
  loading: boolean;
  error: string | null;
}

const initialState: State = {
  data: [],
  loading: false,
  products: [],
  error: null,
};

const shopReducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case GET_SHOP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_SHOP_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case GET_SHOP_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_SHOP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
