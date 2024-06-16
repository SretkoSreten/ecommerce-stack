import { FormikProps, withFormik, Form, Field } from "formik";
import { FormValues, Props } from "../dto/account-edit.dto";
import { InputField } from "../../shared/InputField";
import ErrorMsg from "../../shared/ErrorMsg";
import SuccessMsg from "../../shared/SuccessMsg";
import { PrimaryButton } from "../../shared/PrimaryButton";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
  updated,
}: any) => {
  return (
    <Form className="w-full">
      <div className="md:px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Edit Profile</h2>

        {updated && (
          <SuccessMsg name="Account" content="is updated successfully" />
        )}

        {errors && errors.message && <ErrorMsg content={errors.message} />}

        <div className="w-full space-y-4">
          <div className="col-span-2 gap-4 grid grid-cols-2">
            <div>
              <label
                htmlFor="full name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full name
              </label>
              <Field
                type="text"
                name="fullname"
                id="fullname"
                disabled={updated}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter full name"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone
              </label>
              <Field
                type="text"
                name="phone"
                id="phone"
                disabled={updated}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter phone"
                component={InputField}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              disabled={updated}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="Enter email"
              component={InputField}
            />
          </div>

          <div className="col-span-2 gap-4 grid md:grid-cols-2 grid-cols-1">
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                disabled={updated}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter password"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                disabled={updated}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Confirm password"
                component={InputField}
              />
            </div>
          </div>
        </div>
        <PrimaryButton name="Update Profile" disabled={updated} />
      </div>
    </Form>
  );
};

export const ProfileView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: ({ data }) => ({
    fullname: data.fullname,
    email: data.email,
    phone: data.phone,
    password: "",
    confirmPassword: "",
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
