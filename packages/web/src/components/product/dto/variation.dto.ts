export interface Variation {
  id: string;
  value: string;
  variation: {
    name: string;
  };
}

export interface ProductSpecsProps {
  variations: Variation[];
}
