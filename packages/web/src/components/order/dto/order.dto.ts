export interface OrderBottomProps {
  data: any;
  creating: boolean;
  shippingMethods: { id: string; price: number }[];
}

export interface AddressProps {
  id: number;
  is_default: boolean;
  address: {
    address_line1: string;
    address_line2: string;
    city: string;
    postal_code: string;
    region: string;
    street_number: string;
    unit_number: string;
  };
}
