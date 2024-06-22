import { Dispatch } from "redux";
import axios from "axios";
import { normalizeErrors } from "../utils/normalizeErrors";
import {
  SET_COUPON_FAILURE,
  SET_COUPON_SUCCESS,
} from "../constants/actions.constants";

export const setCouponSuccess = (data: any) => ({
  type: SET_COUPON_SUCCESS,
  payload: data,
});

export const setCouponFailure = (error: any) => ({
  type: SET_COUPON_FAILURE,
  payload: error,
});

const API_URL = import.meta.env.VITE_BACKEND_URL;


export const applyCoupon = (code: string, total: number) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const response: any = await axios.post(
        `${API_URL}/api/carts/apply-coupon`,
        { code, total },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const responseData = response.data;

      const { isSuccess, message, errorCode } = responseData;

      if (!isSuccess) {
        return dispatch(
          setCouponFailure(normalizeErrors({ message, errorCode }))
        ).payload;
      }
    } catch (error) {}
  };
};
