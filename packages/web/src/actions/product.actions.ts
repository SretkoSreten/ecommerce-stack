// actions.ts
import axios from "axios";
import { Dispatch } from "redux";
import {
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
} from "../constants/actions.constants";

export const fetchProductRequest = () => ({
  type: FETCH_PRODUCT_REQUEST,
});

export const fetchProductSuccess = (data: any) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: data,
});

export const fetchProductFailure = (error: string) => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: error,
});

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const fetchProduct = (productId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchProductRequest());

    Promise.all([
      axios.get(`${API_URL}/api/products/${productId}`),
      axios.get(`${API_URL}/api/products/sale`),
    ])
      .then(([productResponse, saleResponse]) => {
        const product = productResponse.data.data;
        const sale = saleResponse.data.data;
        const data = { product, sale };
        dispatch(fetchProductSuccess(data));
      })
      .catch((error: any) => {
        dispatch(fetchProductFailure(error.message));
      });
  };
};
