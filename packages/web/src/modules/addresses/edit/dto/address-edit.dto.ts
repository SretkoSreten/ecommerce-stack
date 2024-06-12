// Define the shape of the response data
export interface LoginResponse {
  isSuccess: boolean;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
  message?: string;
}

export interface FormValues {
  unit_number: number;
  street_number: number;
  address_line1: string;
  address_line2: string;
  city: string;
  region: string;
  postal_code: string;
  country: any;
}

export interface Props {
  data: FormValues;
  updated: boolean;
  countries: any;
  submit: (values: any) => Promise<any>;
}
