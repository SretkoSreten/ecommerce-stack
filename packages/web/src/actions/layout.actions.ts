import axios from "axios";
import {
  CLEAR_SEARCH_ITEMS,
  GET_LAYOUT_FAILURE,
  GET_LAYOUT_REQUEST,
  GET_LAYOUT_SUCCESS,
  GET_SEARCH_REQUEST,
  GET_SEARCH_SUCCESS,
} from "../constants/actions.constants";
import { Dispatch } from "redux";

// Define action creators
export const getLayoutRequest = () => ({
  type: GET_LAYOUT_REQUEST,
});

export const getLayoutSuccess = (data: any) => ({
  type: GET_LAYOUT_SUCCESS,
  payload: data,
});

export const getLayoutFailure = (error: string) => ({
  type: GET_LAYOUT_FAILURE,
  payload: error,
});

export const getSearchRequest = () => ({
  type: GET_SEARCH_REQUEST
});

export const getSearchSuccess = (products: any[]) => ({
  type: GET_SEARCH_SUCCESS,
  payload: products,
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH_ITEMS
})


export const searchProducts = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post("/api/products/search", { name });
      dispatch(getSearchSuccess(data.data));
    } catch (error) {}
  };
};

export const fetchLayout = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getLayoutRequest());

    try {
      const token = localStorage.getItem("token");

      const [categoryResponse, authResponse, cartResponse] = await Promise.all([
        axios.get("/api/categories/shop"),
        token
          ? axios.post("/api/auth/verify-token", { token })
          : Promise.resolve({ data: null }),
        token
          ? axios.get("/api/carts/user/items", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const categories = categoryResponse.data.data;
      const auth = authResponse.data;
      const cart = cartResponse.data;

      const data = { auth, categories, cart };
      dispatch(getLayoutSuccess(data));
    } catch (error) {}
  };
};
