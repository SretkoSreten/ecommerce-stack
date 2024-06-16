import React from "react";
import { withFormik, Field, Form, FormikProps } from "formik";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";
import { FormValues, Props } from "../dto/register.dto";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
}: any) => {
  return (
    <div className="flex flex-col items-center md:bg-primaryBg bg-white justify-center mx-auto">
      <div className="w-full rounded-lg md:shadow bg-white md:max-w-md md:my-10 my-4 xl:p-0">
        <div className="md:px-6 px-10 py-6 space-y-4">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign up
          </h1>
          <Form className="space-y-4">
            {errors.message && (
              <div className="text-sm pt-2 rounded-lg text-red-400">
                <span className="font-medium">{errors.message}</span>
              </div>
            )}
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium"
              >
                Full name
              </label>
              <Field
                name="fullname"
                type="text"
                placeholder="eg. John Doe"
                component={InputField}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Your email
              </label>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                component={InputField}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-sm font-medium">
                Phone
              </label>
              <Field
                name="phone"
                type="text"
                placeholder="00283223823"
                component={InputField}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium"
              >
                Password
              </label>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                component={InputField}
                className="text-sm rounded-lg block w-full p-2.5 bg-gray-100 placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              className="w-full text-white bg-primeColor font-medium text-sm uppercase px-5 py-2.5 text-center"
            >
              Sign up
            </button>
            <p className="text-sm font-light text-gray-400">
              You already have an account yet?{" "}
              <Link
                to="/login"
                className="font-medium hover:underline text-primary-500"
              >
                Sign in
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const RegisterView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    fullname: "",
    phone: "",
    email: "",
    password: "",
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  },
})(C);
