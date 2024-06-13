import axios from "axios";

import { Dispatch } from "redux";
import {
  DELETE_PAYMENT_SUCCESS,
  GET_ACC_ORDERS_FAILURE,
  GET_ACC_ORDERS_REQUEST,
  GET_ACC_ORDERS_SUCCESS,
  GET_ORDER_DETAILS_FAILURE,
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_FAILURE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
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

export const getAccOrdersRequest = () => ({
  type: GET_ACC_ORDERS_REQUEST,
});

export const getAccOrdersSuccess = (data: any) => ({
  type: GET_ACC_ORDERS_SUCCESS,
  payload: data,
});

export const getAccOrdersFailure = (error: string) => ({
  type: GET_ACC_ORDERS_FAILURE,
  payload: error,
});

export const getOrderDetailsRequest = () => ({
  type: GET_ORDER_DETAILS_REQUEST,
});

export const getOrderDetailsSuccess = (data: any) => ({
  type: GET_ORDER_DETAILS_SUCCESS,
  payload: data,
});

export const getOrderDetailsFailure = (error: string) => ({
  type: GET_ORDER_DETAILS_FAILURE,
  payload: error,
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

    values.addressId = parseInt(values.addressId);
    values.paymentMethodId = parseInt(values.paymentMethodId);
    values.shipMethodId = parseInt(values.shipMethodId);

    const {
      data: { message, isSuccess, errorCode, data },
    }: any = await axios.post("/api/orders/create", values, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isSuccess) {
      return normalizeErrors({ message, errorCode });
    }
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

export const fetchAccOrders = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getAccOrdersRequest());

    try {
      const token = localStorage.getItem("token");

      const [ordersResponse, statusResponse] = await Promise.all([
        token
          ? axios.get(`/api/orders/user/${window.location.search}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        axios.get(`/api/status`),
      ]);

      const orders = ordersResponse.data.data;
      const status = statusResponse.data.data;
      const data = { orders, status };
      dispatch(getAccOrdersSuccess(data));
    } catch (error) {
      // dispatch(getAccOrdersFailure(error.message));
    }
  };
};

export const cancelOrder = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const [
        cancelOrderResponse,
        ordersResponse,
        statusResponse,
      ] = await Promise.all([
        token
          ? axios.get(`/api/orders/cancel/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        token
          ? axios.get("/api/orders/user", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        axios.get(`/api/status`),
      ]);

      const cancelOrder = cancelOrderResponse.data;
      const orders = ordersResponse.data.data;
      const status = statusResponse.data.data;

      const data = { orders, status };
      if (cancelOrder.isSuccess) {
        dispatch(getAccOrdersSuccess(data));
      }

      return;
    } catch (error) {}
  };
};


export const fetchOrder = (id: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getOrderDetailsRequest());

    try {
      const token = localStorage.getItem("token");

      const [orderResponse] = await Promise.all([
        token
          ? axios.get(`/api/orders/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const order = orderResponse.data.data;

      dispatch(getOrderDetailsSuccess(order));
    } catch (error) {
      // dispatch(getAccOrdersFailure(error.message));
    }
  };
};