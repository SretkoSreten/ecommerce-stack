import React from "react";
import { withFormik, Form, FormikProps } from "formik";
import { LeftSide } from "./LeftSide";
import { RightSide } from "./RightSide";

interface OrderViewProps {
  addressId: string;
  paymentMethodId: string;
  shippingId: string; // Add shippingId to the props interface
  submit: (values: any) => Promise<any>;
  onFinish: () => void;
}

const C: React.FC<OrderViewProps & FormikProps<any>> = ({
  data,
  errors,
  handleSubmit,
  onFinish,
}: any) => {
  if (!data) return null;

  return (
    <section className="max-w-container px-10 bg-white py-8 mx-auto">
      <div className="pb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Delivery Details
        </h2>
      </div>
      <Form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
          <LeftSide
            onFinish={onFinish}
            submit={handleSubmit}
            payments={data.payments}
            addresses={data.addresses}
            errors={errors}
            shippingMethods={data.shippingMethods}
          />
          <RightSide data={data.cartData} />
        </div>
      </Form>
    </section>
  );
};

export const OrderView = withFormik<any, any>({
  validateOnChange: true,
  validateOnBlur: true,
  enableReinitialize: true,
  mapPropsToValues: ({ addressId, paymentMethodId, shippingId }) => ({
    addressId: addressId,
    paymentMethodId: paymentMethodId,
    shipMethodId: shippingId,
  }),

  handleSubmit: async (values, { props, setErrors }) => {
    const errors: any = {};

    // Validate shippingId
    if (values.shipMethodId == "undefined") {
      errors.shipMethodId = "Shipping option is required";
    }

    if (Object.keys(errors).length > 0) {
      props.onError();
      setErrors(errors);
    } else {
      await props.submit(values);
    }
  },
})(C);
