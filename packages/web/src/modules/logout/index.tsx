import { CallLogout } from "./CallLogout";

export const LogoutConnector = () => {
  
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return <CallLogout logout={logout} />;
};
