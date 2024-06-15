export interface FormValues {
  account_name: string;
  card_number: string;
  expiry_date: string;
}

export interface Props {
  created: boolean;
  creating: boolean;
  onFinish: () => void;
  submit: (values: any) => Promise<any>;
}
