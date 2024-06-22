import { Dispatch } from "redux";
import axios from "axios";
import {
  GET_ADDRESSES_FAILURE,
  GET_ADDRESSES_REQUEST,
  GET_ADDRESSES_SUCCESS,
  GET_ADDRESS_REQUEST,
  GET_ADDRESS_SUCCESS,
  GET_COUNTRIES_FAILURE,
  GET_COUNTRIES_REQUEST,
  GET_COUNTRIES_SUCCESS,
  UPDATE_ADDRESS_SUCCESS,
} from "../constants/actions.constants";
import { normalizeErrors } from "../utils/normalizeErrors";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const getAddressesRequest = () => ({
  type: GET_ADDRESSES_REQUEST,
});

export const getAddressesSuccess = (data: any) => ({
  type: GET_ADDRESSES_SUCCESS,
  payload: data,
});

export const getAddressesFailure = (error: any) => ({
  type: GET_ADDRESSES_FAILURE,
  payload: error,
});

export const getAddressRequest = () => ({
  type: GET_ADDRESS_REQUEST,
});

export const getAddressSuccess = (data: any) => ({
  type: GET_ADDRESS_SUCCESS,
  payload: data,
});

export const getAddressFailure = (error: any) => ({
  type: GET_ADDRESSES_FAILURE,
  payload: error,
});

export const updateAddressSuccess = () => ({
  type: UPDATE_ADDRESS_SUCCESS,
});

export const getCountriesRequest = () => ({
  type: GET_COUNTRIES_REQUEST,
});

export const getCountriesSuccess = (data: any) => ({
  type: GET_COUNTRIES_SUCCESS,
  payload: data,
});

export const getCountriesFailure = (error: any) => ({
  type: GET_COUNTRIES_FAILURE,
  payload: error,
});

export const editAddress = (addressId: string, values: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const {
        data: { isSuccess, errors, errorCode },
      }: any = await axios.patch(`${API_URL}/api/address/${addressId}`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!isSuccess) {
        return dispatch(
          getAddressFailure(normalizeErrors({ message: errors[0], errorCode }))
        ).payload;
      }

      dispatch(updateAddressSuccess());
      return;
    } catch (error) {
      dispatch(
        getAddressFailure("An error occurred during login. Please try again.")
      );
    }
  };
};

export const createAddress = (values: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");

      const {
        data: { isSuccess, errors, errorCode },
      }: any = await axios.post(`${API_URL}/api/address/create`, values, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!isSuccess) {
        return dispatch(
          getAddressFailure(normalizeErrors({ message: errors[0], errorCode }))
        ).payload;
      }

      dispatch(updateAddressSuccess());
      return;
    } catch (error) {
      dispatch(
        getAddressFailure("An error occurred during login. Please try again.")
      );
    }
  };
};

export const fetchCountries = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getCountriesRequest());

    try {
      const [countryResponse] = await Promise.all([
        axios.get(`${API_URL}/api/countries`),
      ]);

      const countries = countryResponse.data.data;
      const data = { countries };
      dispatch(getCountriesSuccess(data));
    } catch (error) {
      dispatch(getCountriesFailure(error));
    }
  };
};

export const fetchAddress = (addressId: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(getAddressRequest());

    try {
      const token = localStorage.getItem("token");

      const [addressResponse, countryResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/address/${addressId}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
        axios.get(`/api/countries`),
      ]);

      const address = addressResponse.data.data;
      const countries = countryResponse.data.data;
      const data = { address, countries };
      dispatch(getAddressSuccess(data));
    } catch (error) {
      dispatch(getAddressFailure(error));
    }
  };
};

export const selectAddress = (addressId: number) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");

    const [selectResponse] = await Promise.all([
      token
        ? axios.get(`${API_URL}/api/address/select/${addressId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve({ data: null }),
    ]);

    const response = selectResponse.data;

    if (response.isSuccess) {
      const [addressResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/address/user`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);

      const addressData = addressResponse.data.data;

      dispatch(getAddressesSuccess(addressData));
    }
  };
};

export const deleteAddress = (addressId: number) => {
  return async (dispatch: Dispatch) => {
    const token = localStorage.getItem("token");

    const [deleteResponse, addressResponse] = await Promise.all([
      token
        ? axios.delete(`${API_URL}/api/address/${addressId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve({ data: null }),
      token
        ? axios.get(`${API_URL}/api/address/user`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        : Promise.resolve({ data: null }),
    ]);

    const response = deleteResponse.data;
    const addressData = addressResponse.data.data;
    if (response.isSuccess) {
      dispatch(getAddressesSuccess(addressData));
    }
  };
};

export const fetchAddresses = () => {
  return async (dispatch: Dispatch) => {
    dispatch(getAddressesRequest());

    try {
      const token = localStorage.getItem("token");

      const [addressResponse] = await Promise.all([
        token
          ? axios.get(`${API_URL}/api/address/user`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve({ data: null }),
      ]);
      const addresses = addressResponse.data.data;
      dispatch(getAddressesSuccess(addresses));
    } catch (error) {
      dispatch(getAddressesFailure(error));
    }
  };
};
