import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavTitle from './NavTitle'; // Adjust the import according to your project structure
import { ImMinus, ImPlus } from 'react-icons/im';

interface CategoryProps {
  categories: { id: number; category_name: string; subcategories?: { id: number; category_name: string }[] }[];
}

const Category: React.FC<CategoryProps> = ({ categories }) => {
  const [categoriesProps, setCategoriesProps] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showSubCat, setShowSubCat] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    if (!categories) return;

    // Initialize categories with checked property
    const cat = categories.map((c: any) => ({
      ...c,
      checked: false,
      subcategories: c.subcategories
        ? c.subcategories.map((sub: any) => ({ ...sub, checked: false }))
        : [],
    }));

    // Parse selected categories from search params
    const selectedCategories = searchParams.get("categories");
    if (selectedCategories) {
      const parsedCategories = JSON.parse(selectedCategories);
      const updatedCategories = cat.map((c) => ({
        ...c,
        checked: parsedCategories.categories.includes(c.category_name),
        subcategories: c.subcategories.map((sub: any) => ({
          ...sub,
          checked:
            parsedCategories.subcategories[c.category_name]?.includes(
              sub.category_name
            ) || false,
        })),
      }));
      setCategoriesProps(updatedCategories);
    } else {
      setCategoriesProps(cat);
    }
  }, [categories, searchParams]);

  const toggleSubCat = (id: number) => {
    setShowSubCat((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCategory = (name: string, parentName: string | null = null) => {
    const selectedCategories = searchParams.get("categories");
    let updatedCategories = selectedCategories
      ? JSON.parse(selectedCategories)
      : { categories: [], subcategories: {} };

    if (parentName) {
      // Handle subcategory
      if (!updatedCategories.subcategories[parentName]) {
        updatedCategories.subcategories[parentName] = [];
      }
      if (updatedCategories.subcategories[parentName].includes(name)) {
        updatedCategories.subcategories[
          parentName
        ] = updatedCategories.subcategories[parentName].filter(
          (subcategory:any) => subcategory !== name
        );
      } else {
        updatedCategories.subcategories[parentName].push(name);
      }
      if (updatedCategories.subcategories[parentName].length === 0) {
        delete updatedCategories.subcategories[parentName];
      }
    } else {
      // Handle category
      if (updatedCategories.categories.includes(name)) {
        updatedCategories.categories = updatedCategories.categories.filter(
          (category:any) => category !== name
        );
        if (updatedCategories.subcategories[name]) {
          delete updatedCategories.subcategories[name];
        }
      } else {
        updatedCategories.categories.push(name);
        const subcategoryNames =
          categoriesProps
            .find((cat) => cat.category_name === name)
            ?.subcategories.map((sub: any) => sub.category_name) || [];
        updatedCategories.subcategories[name] = subcategoryNames;
      }
    }

    // Include existing query parameters along with updated categories
    const existingParams = Object.fromEntries(searchParams.entries());
    const newParams = { ...existingParams, categories: JSON.stringify(updatedCategories) };
    setSearchParams(newParams);

    const updatedCategoriesProps = categoriesProps.map((category) => {
      if (category.category_name === name && !parentName) {
        return {
          ...category,
          checked: !category.checked,
          subcategories: category.subcategories.map((sub: any) => ({
            ...sub,
            checked: !category.checked, // Set all subcategories to the same checked state as the parent category
          })),
        };
      }
      if (category.category_name === parentName) {
        return {
          ...category,
          subcategories: category.subcategories.map((sub: any) =>
            sub.category_name === name ? { ...sub, checked: !sub.checked } : sub
          ),
        };
      }
      return category;
    });
    setCategoriesProps(updatedCategoriesProps);
  };

  return (
    <div className="w-full">
      <NavTitle title="Shop by Category" icons={false} />
      <div>
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {categoriesProps.map(
            ({ id, category_name, subcategories, checked }: any) => (
              <li
                key={id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      id={`checkbox-${id}`}
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleCategory(category_name)}
                      className="w-4 h-4 border-gray-300 rounded bg-gray-700"
                    />
                    {category_name}
                  </div>
                  {subcategories && (
                    <span
                      onClick={() => toggleSubCat(id)}
                      className="text-[10px] lg:text-xs cursor-pointer text-gray-400 hover:text-primeColor duration-300"
                    >
                      {showSubCat[id] ? <ImMinus /> : <ImPlus />}
                    </span>
                  )}
                </div>
                {subcategories && showSubCat[id] && (
                  <ul className="ml-4 mt-4 flex flex-col gap-2">
                    {subcategories.map(
                      ({
                        id: subId,
                        category_name: subCategoryName,
                        checked: subChecked,
                      }: any) => (
                        <li
                          key={subId}
                          className="text-gray-500 flex items-center gap-2"
                        >
                          <input
                            id={`subcheckbox-${subId}`}
                            type="checkbox"
                            checked={subChecked}
                            onChange={() =>
                              handleCategory(subCategoryName, category_name)
                            }
                            className="w-4 h-4 border-gray-300 rounded bg-gray-700"
                          />
                          {subCategoryName}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Category;
