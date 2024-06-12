import axios from "axios";

import { Dispatch } from "redux";
import {
  DELETE_PAYMENT_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  SET_DELIVERY_SUCCESS,
} from "../constants/actions.constants";
import { normalizeErrors } from "../utils/normalizeErrors";

// Define action creators
export const getOrderRequest = () => ({
  type: GET_ORDER_REQUEST,
});

export const getOrderSuccess = (data: any) => ({
  type: GET_ORDER_SUCCESS,
  payload: data,
});

export const getOrderFailure = (error: string) => ({
  type: GET_ORDER_FAILURE,
  payload: error,
});

export const deletePaymentSuccess = (data: any) => ({
  type: DELETE_PAYMENT_SUCCESS,
  payload: data,
});

export const deletePayment = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const [deletePaymentResponse, paymentsResponse] = await Promise.all([
        token
          ? axios.delete(`/api/payments/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        token
          ? axios.get("/api/payments/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const deletePayment = deletePaymentResponse.data;

      if (!deletePayment.isSuccess) {
        dispatch(getOrderFailure(deletePayment.data));
      }

      const payments = paymentsResponse.data.data;

      const data = { payments };
      dispatch(deletePaymentSuccess(data));
    } catch (error) {}
  };
};

export const createOrder = (values: any) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");

    values.addressId = parseInt(values.addressId)
    values.paymentMethodId = parseInt(values.paymentMethodId)
    values.shipMethodId = parseInt(values.shipMethodId)

    console.log(values);
    
    const {
      data: { message, isSuccess, errorCode, data },
    }: any = await axios.post("/api/orders/create", values, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isSuccess) {
      return normalizeErrors({ message, errorCode })
    }

    console.log(data);
  };
};

export const fetchOrders = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getOrderRequest());

    try {
      const token = localStorage.getItem("token");

      const [
        paymentsResponse,
        addressResponse,
        shippingResponse,
        cartResponse,
      ] = await Promise.all([
        token
          ? axios.get("/api/payments/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        token
          ? axios.get("/api/address/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        axios.get("/api/shipping"),
        token
          ? axios.get("/api/carts/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const payments = paymentsResponse.data.data;
      const addresses = addressResponse.data.data;
      const shippingMethods = shippingResponse.data.data;
      const cartData = cartResponse.data.data;

      const data = { payments, addresses, shippingMethods, cartData };
      dispatch(getOrderSuccess(data));
    } catch (error) {}
  };
};
