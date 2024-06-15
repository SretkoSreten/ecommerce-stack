import React from "react";
import { FormValues } from "../dto/create.dto";
import { useDispatch, useSelector } from "react-redux";
import { CreateView } from "./ui/CreateView";
import {
  createPayment,
  createPaymentSuccess,
} from "../../../actions/payments.actions";

export const CreatePayment: React.FC = () => {
  const { loading, created, creating } = useSelector((state: any) => state.payments);
  const dispatch = useDispatch();

  const handleSubmit = async (values: FormValues): Promise<any> => {
    return await dispatch<any>(createPayment(values));
  };

  const onFinish = () => {
    dispatch(createPaymentSuccess());
  };

  return (
    <>
      {!loading && (
        <CreateView
          created={created}
          creating={creating}
          submit={handleSubmit}
          onFinish={onFinish}
        />
      )}
    </>
  );
};
