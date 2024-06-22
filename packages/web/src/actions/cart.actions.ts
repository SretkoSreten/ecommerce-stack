import { Dispatch } from "redux";
import {
  GET_CART_FAILURE,
  GET_CART_REQUEST,
  GET_CART_SUCCESS,
} from "../constants/actions.constants";
import axios from "axios";
import { fetchLayout } from "./layout.actions";

export const getItemsRequest = () => ({
  type: GET_CART_REQUEST,
});

export const getItemsSuccess = (data: any) => ({
  type: GET_CART_SUCCESS,
  payload: data,
});

export const getItemsFailure = (error: string) => ({
  type: GET_CART_FAILURE,
  payload: error,
});

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const clearCart = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/carts/clear`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: {data} } = await axios.get("/api/carts/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getItemsSuccess(data));
      dispatch<any>(fetchLayout())

    } catch (error) {}
  };
};

export const removeItemFromCart = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/api/carts/item/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { data: {data} } = await axios.get("/api/carts/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getItemsSuccess(data));
      dispatch<any>(fetchLayout())

    } catch (error) {}
  };
};

export const increaseQuantity = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `/api/carts/add/${id}`,
        { qty: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { data: {data} } = await axios.get(`${API_URL}/api/carts/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(getItemsSuccess(data));
      dispatch<any>(fetchLayout())

    } catch (error) {}
  };
};

export const decreaseQuantity = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    try {
      const token = localStorage.getItem("token");

      await axios.get(`/api/carts/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const response = await axios.get(`${API_URL}/api/carts/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const {data} = response.data;

      dispatch(getItemsSuccess(data));
      dispatch<any>(fetchLayout())

    } catch (error) {}
  };
};

export const fetchCart = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getItemsRequest());

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${API_URL}/api/carts/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const {data} = response.data;

      dispatch(getItemsSuccess(data));
      dispatch<any>(fetchLayout())

    } catch (error) {}
  };
};
