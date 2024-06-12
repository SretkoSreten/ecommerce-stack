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
  fullname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface Props {
  data: FormValues;
  updated: boolean;
  onFinish: () => void;
  submit: (values: any) => Promise<any>;
}
