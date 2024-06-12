import { useNavigate } from "react-router-dom";
import { CallDelete } from "./AccountDelete";
import { deleteAccount } from "../../actions/account.actions";

export const DeleteAccountConnector = () => {

  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/login");
  };

  const deleteAccountBtn = async () => {
    const response = await deleteAccount();
    if (response){
        onFinish();
        localStorage.removeItem("token");
    }
  };

  return <CallDelete deleteAccount={deleteAccountBtn} />;
};
