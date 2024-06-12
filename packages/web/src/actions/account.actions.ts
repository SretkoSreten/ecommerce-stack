// src/store/authActions.ts

import axios from "axios";
import { Dispatch } from "redux";

import { normalizeErrors } from "../utils/normalizeErrors";
import {
  GET_ACCOUNT_FAILURE,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
} from "../constants/actions.constants";
import { FormValues } from "../modules/addresses/edit/dto/address-edit.dto";

export const getAccountRequest = () => ({
  type: GET_ACCOUNT_REQUEST,
});

export const getAccountSuccess = (data: any) => ({
  type: GET_ACCOUNT_SUCCESS,
  payload: data,
});

export const getAccountFailure = (error: any) => ({
  type: GET_ACCOUNT_FAILURE,
  payload: error,
});

export const updateAccountSuccess = () => ({
  type: UPDATE_ACCOUNT_SUCCESS,
});

export const fetchAccount = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getAccountRequest());

    try {
      const token = localStorage.getItem("token");

      const [userResponse] = await Promise.all([
        token
          ? axios.get("/api/users/auth", {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const user = userResponse.data.data;

      const data = { user };
      dispatch(getAccountSuccess(data));
    } catch (error) {}
  };
};

export const deleteAccount = async () => {
  const token = localStorage.getItem("token");

  const [deleteResponse] = await Promise.all([
    token
      ? axios.delete(`/api/users/delete`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      : Promise.resolve({ data: null }),
  ]);

  const response = deleteResponse.data;
  if (response.isSuccess) {
    return true;
  }

  return false;
};

export const updateAccount = (values: FormValues) => async (
  dispatch: Dispatch
) => {
  try {
    const token = localStorage.getItem("token");

    const {
      data: { isSuccess, errors, errorCode },
    }: any = await axios.patch("/api/users/update", values, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!isSuccess) {
      return dispatch(
        getAccountFailure(normalizeErrors({ message: errors[0], errorCode }))
      ).payload;
    }

    dispatch(updateAccountSuccess());
    return;
  } catch (error) {
    dispatch(
      getAccountFailure("An error occurred during login. Please try again.")
    );
  }
};
