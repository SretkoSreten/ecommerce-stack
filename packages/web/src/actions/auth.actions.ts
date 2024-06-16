
import axios from "axios";
import { Dispatch } from "redux";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../constants/actions.constants";
import { normalizeErrors } from "../utils/normalizeErrors";
import { FormValues } from "../modules/login/dto/login.dto";

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (data: any) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error: any) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const login = (values: FormValues) => async (dispatch: Dispatch) => {
  dispatch(loginRequest());
  try {
    const {
      data: { message, isSuccess, errorCode, data },
    }: any = await axios.post("/api/auth/login", values);

    if (!isSuccess) {
      return dispatch(loginFailure(normalizeErrors({ message, errorCode })))
        .payload;
    }

    const { accessToken } = data;

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      dispatch(loginSuccess(data));
      return;
    }
  } catch (error) {
    dispatch(loginFailure("An error occurred during login. Please try again."));
  }
};
