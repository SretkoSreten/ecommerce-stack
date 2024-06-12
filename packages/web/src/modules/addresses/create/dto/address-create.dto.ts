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
  countries: any;
  submit: (values: any) => Promise<any>;
  onFinish: () => void;
}
