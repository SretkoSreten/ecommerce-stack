import { FormikProps, withFormik, Form, Field } from "formik";
import { FormValues, Props } from "../dto/address-edit.dto";
import { InputField } from "../../../shared/InputField";
import ErrorMsg from "../../../shared/ErrorMsg";
import SuccessMsg from "../../../shared/SuccessMsg";
import { SelectField } from "../../../shared/SelectField";
import { PrimaryButton } from "../../../shared/PrimaryButton";

export const C: React.FC<FormikProps<FormValues> & Props> = ({
  errors,
  updated,
  countries
}: any) => {

  return (
    <Form className="w-full">
      <div className="md:px-4">
        <h2 className="mb-4 text-xl font-bold text-gray-900">Edit Address</h2>

        {updated && (
          <SuccessMsg name="Address" content="is updated successfully" />
        )}

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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
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
                disabled={updated}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter unit number"
                component={InputField}
              />
            </div>
          </div>
        </div>
        <PrimaryButton name="Update Address" disabled={updated} />
      </div>
    </Form>
  );
};

export const EditView = withFormik<Props, FormValues>({
  validateOnChange: false,
  validateOnBlur: false,
  mapPropsToValues: ({ data }) => ({
    unit_number: data.unit_number ? data.unit_number : 0,
    street_number: data.street_number ? data.street_number : 0,
    address_line1: data.address_line1 ? data.address_line1 : "",
    address_line2: data.address_line2 ? data.address_line2 : "",
    city: data.city ? data.city : "",
    region: data.region ? data.region : "",
    postal_code: data.postal_code ? data.postal_code : "",
    country: data.country ? data.country.name : ""
  }),
  handleSubmit: async (values, { props, setErrors }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(C);
