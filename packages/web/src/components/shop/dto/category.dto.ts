// types.ts
export interface SubCategory {
  id: number;
  category_name: string;
}

export interface Category {
  id: number;
  category_name: string;
  subcategories?: SubCategory[];
}

export interface CategoryProps {
  categories: {
    id: number;
    category_name: string;
    subcategories?: { id: number; category_name: string }[];
  }[];
}
