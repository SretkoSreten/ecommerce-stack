import React, { useEffect } from "react";
import { ProfileView } from "./ui/ProfileView";
import { useDispatch, useSelector } from "react-redux";
import { FormValues } from "./dto/account-edit.dto";
import { fetchAccount, updateAccount } from "../../actions/account.actions";

const ProfileConnector: React.FC = () => {
  const { loading, data, updated } = useSelector((state: any) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch<any>(fetchAccount());
  }, []);

  if (!data) return;

  const handleSubmit = async (values: FormValues): Promise<any> => {
    return await dispatch<any>(updateAccount(values));
  };

  const onFinish = () => {
    dispatch<any>(fetchAccount());
  };
  
  return (
    <>
      {!loading && (
        <ProfileView
          data={data.user}
          updated={updated}
          submit={handleSubmit}
          onFinish={onFinish}
        />
      )}
    </>
  );
};

export default ProfileConnector;
