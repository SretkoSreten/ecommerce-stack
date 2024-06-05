import { useNavigate } from "react-router-dom";

import { CallLogout } from "./CallLogout";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "./actions/logout.actions";

export const LogoutConnector = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = () => {
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutSuccess());
  };

  return <CallLogout logout={logout} onFinish={onFinish} />;
};
