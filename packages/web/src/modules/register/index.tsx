import React from "react";
import { RegisterView } from "./ui/RegisterView";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { Credentials, LoginResponse } from "./dto/register.dto";

const RegisterConnector: React.FC = () => {
  const navigate = useNavigate();
  // Define the submit handler function
  const handleSubmit = async (values: Credentials): Promise<any> => {
    const { data: dataResponse }: any = await axios.post<LoginResponse>(
      "/api/auth/register",
      values
    );

    if (!dataResponse.isSuccess) {
      return normalizeErrors(dataResponse);
    }
  };

  const onFinish = () => {
    return navigate("/login");
  };

  return <RegisterView submit={handleSubmit} onFinish={onFinish} />;
};

export default RegisterConnector;
