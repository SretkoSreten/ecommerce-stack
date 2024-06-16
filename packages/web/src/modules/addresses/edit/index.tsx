import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormValues } from "./dto/address-edit.dto";
import { EditView } from "./ui/EditView";
import { editAddress, fetchAddress } from "../../../actions/addresses.actions";
import { useParams } from "react-router-dom";

const EditAddressConnector: React.FC = () => {
  const { loading, data, updated } = useSelector((state: any) => state.address);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch<any>(fetchAddress(id));
  }, []);

  if (!data) return;

  const handleSubmit = async (values: FormValues): Promise<any> => {
    if (!id) return;
    return await dispatch<any>(editAddress(id, values));
  };

  return (
    <>
      {!loading && (
        <EditView
          data={data.address}
          updated={updated}
          countries={data.countries}
          submit={handleSubmit}
        />
      )}
    </>
  );
};

export default EditAddressConnector;
