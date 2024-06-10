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
