import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormValues } from "./dto/address-create.dto";
import { CreateView } from "./ui/CreateView";
import {
  createAddress,
  fetchCountries,
} from "../../../actions/addresses.actions";
import { useNavigate } from "react-router-dom";

const CreateAddressConnector: React.FC = () => {
  const { loading, data } = useSelector((state: any) => state.country);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch<any>(fetchCountries());
  }, []);

  if (!data) return;

  const handleSubmit = async (values: FormValues): Promise<any> => {
    return await dispatch<any>(createAddress(values));
  };

  const onFinish = () => {
    navigate(-1);
  };

  return (
    <>
      {!loading && (
        <CreateView
          countries={data.countries}
          submit={handleSubmit}
          onFinish={onFinish}
        />
      )}
    </>
  );
};

export default CreateAddressConnector;
