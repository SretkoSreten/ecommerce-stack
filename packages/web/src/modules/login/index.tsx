import React from "react";
import { LoginView } from "./ui/LoginView";
import { useNavigate } from "react-router-dom";
import { FormValues } from "./dto/login.dto";
import { useDispatch } from "react-redux";
import { login } from "./actions";

const LoginConnector: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Define the submit handler function
  const handleSubmit = async (values: FormValues): Promise<any> => {
    return await dispatch<any>(login(values));
  };

  const onFinish = () => {
    navigate("/account/edit");
    window.location.reload();
  };

  return <LoginView submit={handleSubmit} onFinish={onFinish} />;
};

export default LoginConnector;
