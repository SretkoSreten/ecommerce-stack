// Define the shape of the credentials object
export interface Credentials {
  fullname: string;
  email: string;
  phone: string;
  password: string;
}

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
  email: string;
  password: string;
}

export interface Props {
  onFinish: () => void;
  submit: (values: any) => Promise<any>;
}
