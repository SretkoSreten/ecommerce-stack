import React from "react";
import { withFormik, Field, Form, FormikProps } from "formik";
import { InputField } from "../../shared/InputField";
import { Link } from "react-router-dom";
import { FormValues, Props } from "../dto/login.dto";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
}: any) => {
  return (
    <div className="flex flex-col items-center bg-[#F5F5F3] justify-center mx-auto">
      <div className="w-full rounded-lg shadow bg-white sm:max-w-md my-10 xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Sign in to your account
          </h1>
          <Form className="space-y-4">
            {errors.message && (
              <div className="text-sm pt-2 rounded-lg text-red-400">
                <span className="font-medium">{errors.message}</span>
              </div>
            )}
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
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
            >
              Sign in
            </button>
            <p className="text-sm font-light text-gray-400">
              Don’t have an account yet?{" "}
              <Link
                to="/register"
                className="font-medium hover:underline text-primary-500"
              >
                Sign up
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export const LoginView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({ email: "", password: "" }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    } else {
      props.onFinish();
    }
  },
})(C);
