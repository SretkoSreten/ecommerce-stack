import { Dispatch } from "redux";
import {
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_SUCCESS,
  GET_PAYMENTS_FAILURE,
  GET_PAYMENTS_REQUEST,
  GET_PAYMENTS_SUCCESS,
  SELECT_PAYMENT_SUCCESS,
} from "../constants/actions.constants";
import axios from "axios";
import { normalizeErrors } from "../utils/normalizeErrors";

export const getPaymentsRequest = () => ({
  type: GET_PAYMENTS_REQUEST,
});

export const getPaymentsSuccess = (data: any) => ({
  type: GET_PAYMENTS_SUCCESS,
  payload: data,
});

export const getPaymentsFailure = (error: any) => ({
  type: GET_PAYMENTS_FAILURE,
  payload: error,
});

export const selectPaymentSuccess = (data: any) => ({
  type: SELECT_PAYMENT_SUCCESS,
  payload: data,
});

export const deletePaymentSuccess = (data: any) => ({
  type: GET_PAYMENTS_SUCCESS,
  payload: data,
});

export const createPaymentSuccess = () => ({
  type: CREATE_PAYMENT_SUCCESS,
});

export const createPaymentRequest = () => ({
  type: CREATE_PAYMENT_REQUEST,
});

const API_URL = import.meta.env.VITE_BACKEND_URL;


export const fetchPayments = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getPaymentsRequest());

    try {
      const token = localStorage.getItem("token");

      const [paymentsResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/payments/user`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const payments = paymentsResponse.data.data;

      const data = { payments };
      dispatch(getPaymentsSuccess(data));
    } catch (error) {}
  };
};

export const selectPayment = (id: number) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");

    const [selectResponse] = await Promise.all([
      token
        ? axios.get(`${API_URL}/api/payments/select/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve({ data: null }),
    ]);

    const response = selectResponse.data;

    if (response.isSuccess) {
      const [paymentResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/payments/user`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const payments = paymentResponse.data.data;

      const data = { payments };

      dispatch(getPaymentsSuccess(data));
    }
  };
};

export const deletePayment = (id: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const [deletePaymentResponse] = await Promise.all([
        token
          ? axios.delete(`${API_URL}/api/payments/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const deletePayment = deletePaymentResponse.data;

      if (deletePayment.isSuccess) {
        const [paymentsResponse] = await Promise.all([
          token
            ? axios.get(`${API_URL}/api/payments/user`, {
                headers: { Authorization: `Bearer ${token}` },
              })
            : Promise.resolve({ data: null }),
        ]);

        const payments = paymentsResponse.data.data;

        const data = { payments };
        dispatch(deletePaymentSuccess(data));
      }
    } catch (error) {}
  };
};

export const createPayment = (values: any) => {
  return async (dispatch: Dispatch) => {
    dispatch(createPaymentRequest());
    try {
      const token = localStorage.getItem("token");

      const {
        data: { isSuccess, errors, errorCode },
      }: any = await axios.post(`${API_URL}/api/payments/create`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!isSuccess) {
        return dispatch(
          getPaymentsFailure(normalizeErrors({ message: errors[0], errorCode }))
        ).payload;
      }

      const [paymentsResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/payments/user`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const payments = paymentsResponse.data.data;

      const data = { payments };
      dispatch(getPaymentsSuccess(data));
    } catch (error) {
      dispatch(
        getPaymentsFailure("An error occurred during login. Please try again.")
      );
    }
  };
};
