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
  creating: boolean;
}

const C: React.FC<OrderViewProps & FormikProps<any>> = ({
  data,
  errors,
  handleSubmit,
  onFinish,
  creating
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
          <RightSide
            data={data.cartData}
            errors={errors}
            creating={creating}
            shippingMethods={data.shippingMethods}
          />
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
    const errorsObj: Record<string, string> = {};

    // Validate shippingId
    if (values.shipMethodId === "null" || values.shipMethodId === "undefined") {
      errorsObj.shipMethodId = "Shipping option is required";
    }

    // Validate paymentMethodId
    if (
      values.paymentMethodId === "null" ||
      values.paymentMethodId === "undefined"
    ) {
      errorsObj.paymentMethodId = "Payment method is required";
    }

    // Validate addressId
    if (values.addressId === "null" || values.addressId === "undefined") {
      errorsObj.addressId = "Address is required";
    }

    if (Object.keys(errorsObj).length > 0) {
      setErrors(errorsObj);
    } else {
      const errors = await props.submit(values);
      if (errors) {
        setErrors(errors);
      } else {
        props.onFinish();
      }
    }
  },
})(C);
