import { FormikProps, withFormik, Form, Field } from "formik";
import { FormValues, Props } from "../dto/address-create.dto";
import { InputField } from "../../../shared/InputField";
import ErrorMsg from "../../../shared/ErrorMsg";
import { SelectField } from "../../../shared/SelectField";
import { PrimaryButton } from "../../../shared/PrimaryButton";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
  countries,
}: any) => {
  return (
    <Form className="w-full">
      <div className="md:px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Create Address</h2>
        {errors && errors.message && <ErrorMsg content={errors.message} />}

        <div className="w-full space-y-4">
          <div className="col-span-2 gap-4 grid md:grid-cols-2 grid-cols-1">
            <div>
              <label
                htmlFor="address_line1"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address line 1
              </label>
              <Field
                type="text"
                name="address_line1"
                id="address_line1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter address 1"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="address_line2"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address line 2
              </label>
              <Field
                type="text"
                name="address_line2"
                id="address_line2"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter address 2"
                component={InputField}
              />
            </div>
          </div>
          <div className="col-span-2 gap-4 grid md:grid-cols-3 grid-cols-1">
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                City
              </label>
              <Field
                type="text"
                name="city"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter city"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="region"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Region
              </label>
              <Field
                type="text"
                name="region"
                id="region"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter region"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Country
              </label>
              <Field
                type="text"
                name="country"
                id="country"
                options={countries}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter country"
                component={SelectField}
              />
            </div>
          </div>

          <div className="col-span-2 gap-4 grid grid-cols-3">
            <div>
              <label
                htmlFor="postal_code"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Postal code
              </label>
              <Field
                type="text"
                name="postal_code"
                id="postal_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter postal code"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="street_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                St.
              </label>
              <Field
                type="text"
                name="street_number"
                id="street_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter street number"
                component={InputField}
              />
            </div>
            <div>
              <label
                htmlFor="unit_number"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Unit number
              </label>
              <Field
                type="text"
                name="unit_number"
                id="unit_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter unit number"
                component={InputField}
              />
            </div>
          </div>
        </div>
        <PrimaryButton name="Create Address" />
      </div>
    </Form>
  );
};

export const CreateView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: () => ({
    unit_number: 0,
    street_number: 0,
    address_line1: "",
    address_line2: "",
    city: "",
    region: "",
    postal_code: "",
    country: "",
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
