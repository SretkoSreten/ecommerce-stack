import axios from "axios";
import {
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_REQUEST,
} from "../../constants/actions.constants";
// Define action creators
export const getProductsRequest = () => ({
  type: GET_PRODUCTS_REQUEST,
});

export const getProductsSuccess = (products: any[]) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const getProductsFailure = (error: string) => ({
  type: GET_PRODUCTS_FAILURE,
  payload: error,
});

// Async action creator to fetch products
export const fetchProducts = () => {
  return async (dispatch: any) => {
    dispatch(getProductsRequest());
    try {
      // Axios get request to fetch products
      const response = await axios.get("/api/products/arrivals");
      dispatch(getProductsSuccess(response.data));
    } catch (error:any) {
      dispatch(getProductsFailure(error.message));
    }
  };
};
