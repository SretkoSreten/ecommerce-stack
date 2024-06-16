import { Field, Form, FormikProps, withFormik } from "formik";
import { FormValues, Props } from "../../dto/create.dto";
import { InputField } from "../../../shared/InputField";
import ErrorMsg from "../../../shared/ErrorMsg";
import { LoadingButton } from "../../../shared/LoadingButton";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
  creating,
}: any) => {
  return (
    <Form className="mx-auto w-full">
      {errors && errors.message && <ErrorMsg content={errors.message} />}
      <div className="lg:flex w-full lg:items-start lg:gap-12">
        <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="mb-6 grid w-full grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="fullname"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Full name*
              </label>
              <Field
                type="text"
                id="account_name"
                name="account_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Bonnie Green"
                component={InputField}
              />
            </div>

            <div>
              <label
                htmlFor="card-expiration-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Card expiration*
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                  <svg
                    className="h-4 w-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <Field
                  datepicker-format="mm/yy"
                  id="expiry_date"
                  name="expiry_date"
                  type="text"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="12/23"
                  component={InputField}
                />
              </div>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="card-number-input"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Card number*
              </label>
              <Field
                type="text"
                id="card_number"
                name="card_number"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pe-10 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                component={InputField}
              />
            </div>
          </div>
          <LoadingButton name="Create payment" creating={creating} />
        </div>
      </div>
    </Form>
  );
};

export const CreateView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    account_name: "",
    card_number: "",
    expiry_date: "",
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      console.log(errors);
      setErrors(errors);
    } else {
      props.onFinish();
    }
  },
})(C);
