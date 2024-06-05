import axios from "axios";
import {
  GET_HEADER_REQUEST,
  GET_HEADER_FAILURE,
  GET_HEADER_SUCCESS,
} from "../constants/actions.constants";

// Define action creators
export const getLayoutRequest = () => ({
  type: GET_HEADER_REQUEST,
});

export const getLayoutSuccess = (data: any) => ({
  type: GET_HEADER_SUCCESS,
  payload: data,
});

export const getLayoutFailure = (error: string) => ({
  type: GET_HEADER_FAILURE,
  payload: error,
});

// Async action creator to fetch categories
export const fetchLayout = () => {
  return async (dispatch: any) => {
    dispatch(getLayoutRequest());

    try {
      const token = localStorage.getItem("token");
      // Axios get request to fetch categories
      const { data: response_category } = await axios.get("/api/categories");
      const categories = response_category.data;

      const { data: response_auth } = await axios.post("/api/auth/verify-token", { token });
      const auth = response_auth.data;

      const data = {auth, categories};
      dispatch(getLayoutSuccess(data));
      
    } catch (error:any) {
      dispatch(getLayoutFailure(error.message));
    }
  };
};
