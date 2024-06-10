import { Field, withFormik, Form } from "formik";
import React from "react";
import { InputField } from "../../modules/shared/InputField";

export const C: React.FC<any> = (props) => {
  const { errors, data } = props;

  if (!data) return;

  return (
    <Form className="md:max-w-96 w-full flex flex-col gap-4">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        {data.coupon && (
          <div
            className="pt-2 text-sm text-green-400 rounded-lg dark:text-green-400"
            role="alert"
          >
            <span className="font-medium">Coupon applied successfully</span>
          </div>
        )}
        {errors.message && (
          <div className="text-sm pt-2 rounded-lg text-red-400">
            <span className="font-medium">{errors.message}</span>
          </div>
        )}
        <div>
          <label
            htmlFor="voucher"
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Do you have a voucher or gift card?
          </label>
          <Field
            type="text"
            id="coupon"
            name="coupon"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
            placeholder=""
            disabled={data.coupon ? true : false}
            component={InputField}
          />
        </div>
        <button
          type="submit"
          disabled={data.coupon ? true : false}
          className="flex w-full uppercase items-center justify-center rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
        >
          Apply Code
        </button>
      </div>
    </Form>
  );
};

export const CouponForm = withFormik<any, any>({
  mapPropsToValues: ({ data }) => ({
    coupon: data.coupon ? data.coupon.code : "",
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }else {
      props.onFinish();
    }
  },
})(C);
