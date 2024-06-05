import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREASE_QUANTITY,
  GET_CART_FAILURE,
  GET_CART_ITEMS,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
  INCREASE_QUANTITY,
} from "../constants/actions.constants";

const initialState = {
  loading: true,
  items: [], // Array of items in the cart
};

// Reducer Function
const cartReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_CART_REQUEST:
      return { ...state };
    case GET_CART_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case GET_CART_FAILURE:
      return { ...state, loading: false, items: action.payload };
    case ADD_TO_CART:
      return { ...state, items: action.payload };

    case DECREASE_QUANTITY:
      return { ...state, items: action.payload };

    case INCREASE_QUANTITY:
      return { ...state, items: action.payload };

    case CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

export default cartReducer;
