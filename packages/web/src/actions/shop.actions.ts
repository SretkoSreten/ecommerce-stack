import { Dispatch } from "redux";
import {
  GET_SHOP_FAILURE,
  GET_SHOP_PRODUCTS_SUCCESS,
  GET_SHOP_REQUEST,
  GET_SHOP_SUCCESS,
} from "../constants/actions.constants";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getShopRequest = () => ({
  type: GET_SHOP_REQUEST,
});

export const getShopSuccess = (data: any) => ({
  type: GET_SHOP_SUCCESS,
  payload: data,
});

export const getShopProductsSuccess = (data: any) => ({
  type: GET_SHOP_PRODUCTS_SUCCESS,
  payload: data,
});

export const getShopFailure = (error: string) => ({
  type: GET_SHOP_FAILURE,
  payload: error,
});

export const fetchProducts = () => {
  return async (dispatch: Dispatch) => {
    try {
      const [productResponse] = await Promise.all([
        axios.get(`${API_URL}/api/products/${window.location.search}`),
      ]);
      const { data } = productResponse.data;
      dispatch(getShopProductsSuccess(data));
    } catch (error) {}
  };
};


export const fetchSideNav = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const [
        categoryResponse,
        variationResponse,
        authResponse,
      ] = await Promise.all([
        axios.get(`${API_URL}/api/categories/shop`),
        axios.get(`${API_URL}/api/variations/shop/${window.location.search}`),
        token
          ? axios.post(`${API_URL}/api/auth/verify-token`, { token })
          : Promise.resolve({ data: null }),
      ]);

      const variations = variationResponse.data.data;
      const categories = categoryResponse.data.data;
      const auth = authResponse.data;
      const data = { auth, categories, variations };
      dispatch(getShopSuccess(data));
    } catch (error) {}
  };
};
