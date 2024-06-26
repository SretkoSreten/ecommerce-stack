import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import NavTitle from "./NavTitle"; // Adjust the import according to your project structure
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../../../actions/shop.actions";

interface VariationProps {
  options: { id: number; value: string }[];
  name: string;
}

const Variation: React.FC<VariationProps> = ({ options, name }) => {
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!options) return;

    const selectedVariations = searchParams.get("variations");
    if (selectedVariations) {
      const parsedVariations = JSON.parse(selectedVariations);
      setVariations(parsedVariations);
    }
  }, [options, searchParams]);

  const handleVariationChange = (value: string) => {
    const updatedOptions = [...variations];
    const index = updatedOptions.indexOf(value);

    if (index !== -1) {
      updatedOptions.splice(index, 1);
    } else {
      updatedOptions.push(value);
    }

    setVariations(updatedOptions);

    const existingParams = Object.fromEntries(searchParams.entries());
    existingParams["variations"] = JSON.stringify(updatedOptions);
    existingParams["page"] = "0";
    setSearchParams(existingParams);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch<any>(fetchProducts());
  };

  return (
    <div>
      <div
        onClick={() => setShowOptions(!showOptions)}
        className="cursor-pointer"
      >
        <NavTitle title={name} icons={true} />
      </div>
      {showOptions && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {options.map(({ id, value }) => (
              <li
                key={id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2"
              >
                <input
                  id={`variation-checkbox-${id}`}
                  type="checkbox"
                  checked={variations.includes(value)}
                  onChange={() => handleVariationChange(value)}
                  className="w-4 h-4 border-gray-300 rounded bg-gray-700"
                />
                {value}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default Variation;
