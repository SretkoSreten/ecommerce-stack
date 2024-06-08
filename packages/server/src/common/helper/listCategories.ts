interface Categories {
  categories: string[];
  subcategories: { [key: string]: string[] };
}

export function collectCategories(categoriesObj: Categories): string[] {
  if (!categoriesObj) return [];
  const { categories, subcategories } = categoriesObj;
  const allCategories: string[] = [];
  categories.forEach((category) => {
    allCategories.push(category);
    const subcats = subcategories[category];
    if (subcats) {
      subcats.forEach((subcategory) => {
        allCategories.push(subcategory);
      });
    }
  });

  return allCategories;
}
