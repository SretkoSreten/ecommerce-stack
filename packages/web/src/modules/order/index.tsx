import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../actions/order.actions";
import { OrderView } from "./ui/OrderView";
import { useSearchParams } from "react-router-dom";

const setParamsFromSearch = (
  params: URLSearchParams,
  keys: string[],
  setters: ((value: string) => void)[]
) => {
  keys.forEach((key, index) => {
    const value = params.get(key);
    if (value) setters[index](value);
  });
};

const OrderConnector: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [address, setAddress] = useState<string | undefined>();
  const [payment, setPayment] = useState<string | undefined>();
  const [shipping, setShipping] = useState<string | undefined>();
  
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state: any) => state.order);

  useEffect(() => {
    dispatch<any>(fetchOrders());
  }, [dispatch]);

  const findDefaultOption = (options: any[]) => {
    const defaultOption = options?.find((option) => option.is_default);
    return defaultOption ? defaultOption.id.toString() : null;
  };

  useEffect(() => {
    if (data) {
      const setParams = () => {
        const existingParams = Object.fromEntries(searchParams.entries());

        const defaultPayment = findDefaultOption(data.payments);
        const defaultAddress = findDefaultOption(data.addresses);
        const defaultShipping = existingParams.shipping;

        const updatedParams = {
          ...existingParams,
          payment: existingParams.payment ? existingParams.payment : defaultPayment,
          address: existingParams.address ? existingParams.address : defaultAddress,
          shipping: defaultShipping
        };

        return new URLSearchParams(updatedParams);
      };

      const params = ['address', 'payment', 'shipping'];
      const setters = [setAddress, setPayment, setShipping];

      setParamsFromSearch(setParams(), params, setters);
    }
    
  }, [searchParams, setAddress, setPayment, setShipping, data]);

  if (!data) return;

  const handleSubmit = async (values: any): Promise<any> => {
    console.log(values)
  };

  const onError = () => {
    const container = document.getElementById("shipping");
    if (container) {
      container.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'start',
    });
    }
  };

  return (
    <div>
      {!loading && (
        <OrderView
          data={data}
          paymentMethodId={payment}
          addressId={address}
          shippingId={shipping}
          submit={handleSubmit}
          onError={onError}
        />
      )}
    </div>
  );
};


export default OrderConnector;
