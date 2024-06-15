import { useDispatch, useSelector } from "react-redux";
import { PaymentsView } from "./ui/PaymentsView";
import { useEffect } from "react";
import { fetchPayments } from "../../actions/payments.actions";

export const AccountPayments = () => {
  const { loading, data, created } = useSelector(
    (state: any) => state.payments
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch<any>(fetchPayments());
  }, []);

  if (!data) return;

  console.log(loading, data);

  return <>{!loading && <PaymentsView created={created} {...data} />}</>;
};
