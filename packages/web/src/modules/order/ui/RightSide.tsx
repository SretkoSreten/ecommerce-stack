import { OrderBottom } from "../../../components/order/OrderBottom";
import { OrderItem } from "../../../components/order/OrderItem";

export const RightSide = ({ data, shippingMethods }: any) => {
  return (
    <div>
      <table className="text-left font-medium text-gray-900">
        <tbody className="divide-y divide-gray-200">
          {data.items &&
            data.items.map((item: any) => {
              return <OrderItem key={item.id} {...item} />;
            })}
        </tbody>
      </table>
      <OrderBottom data={data} shippingMethods={shippingMethods} />
    </div>
  );
};
