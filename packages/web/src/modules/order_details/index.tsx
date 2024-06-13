import { useDispatch, useSelector } from "react-redux";
import { OrderView } from "./ui/OrderView";
import { useEffect } from "react";
import { fetchOrder } from "../../actions/order.actions";
import { useParams } from "react-router-dom";

export const OrderDetailsConnector = () => {
  const { loading, data } = useSelector((state: any) => state.orderDetails);
  const dispatch = useDispatch();
  const {id} = useParams();

  useEffect(() => {
    if (!id) return;
    dispatch<any>(fetchOrder(id))
  }, [])

  if (!data) return;

  return <div>{!loading && <OrderView {...data}/>}</div>;
};
