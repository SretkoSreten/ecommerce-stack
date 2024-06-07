import { Dispatch } from "redux";
import {
  GET_SHOP_FAILURE,
  GET_SHOP_REQUEST,
  GET_SHOP_SUCCESS,
} from "../constants/actions.constants";
import axios from "axios";

export const getShopRequest = () => ({
  type: GET_SHOP_REQUEST,
});

export const getShopSuccess = (data: any) => ({
  type: GET_SHOP_SUCCESS,
  payload: data,
});

export const getShopFailure = (error: string) => ({
  type: GET_SHOP_FAILURE,
  payload: error,
});

export const fetchSideNav = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getShopRequest());

    try {
      const token = localStorage.getItem("token");

      const query = new URLSearchParams(window.location.search);

      const c = query.get('category')

      const [categoryResponse, variationResponse, authResponse] = await Promise.all([
        axios.get("/api/categories/shop"),
        axios.get(`/api/variations/shop/${c}`),
        token
          ? axios.post("/api/auth/verify-token", { token })
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
