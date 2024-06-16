import { OrderBottom } from "../../../components/order/OrderBottom";
import { OrderItem } from "../../../components/order/OrderItem";
import ErrorMsg from "../../shared/ErrorMsg";

export const RightSide = ({ data, errors, shippingMethods, creating }: any) => {
  return (
    <div>
      {errors.message && <ErrorMsg content={errors.message} />}
      <table className="text-left font-medium text-gray-900">
        <tbody className="divide-y divide-gray-200">
          {data &&
            data.items &&
            data.items.map((item: any) => {
              return <OrderItem key={item.id} {...item} />;
            })}
        </tbody>
      </table>
      <OrderBottom
        data={data}
        creating={creating}
        shippingMethods={shippingMethods}
      />
    </div>
  );
};
