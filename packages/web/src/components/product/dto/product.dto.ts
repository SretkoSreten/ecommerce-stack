export interface ProductDto {
  id: string;
  price: number;
  product_image: string;
  product: {
    name: string;
    category: {
      category_name: string;
    };
    description: string;
  };
}

export interface NewArrivalsProps {
  products: ProductDto[];
}
