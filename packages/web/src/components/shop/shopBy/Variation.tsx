import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavTitle from './NavTitle'; // Adjust the import according to your project structure
import { motion } from 'framer-motion';

interface VariationProps {
  options: { id: number; value: string }[];
  name: string;
}

const Variation: React.FC<VariationProps> = ({ options, name }) => {
  const [showOptions, setShowOptions] = useState(true);
  const [variations, setVariations] = useState<{ id: number; value: string; checked: boolean }[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!options) return;

    // Initialize variations with checked property
    const initialVariations = options.map(option => ({
      ...option,
      checked: false,
    }));

    // Parse selected variations from search params
    const selectedVariations = searchParams.get(name);
    if (selectedVariations) {
      const parsedVariations = JSON.parse(selectedVariations);
      const updatedVariations = initialVariations.map(variation => ({
        ...variation,
        checked: parsedVariations.includes(variation.value),
      }));
      setVariations(updatedVariations);
    } else {
      setVariations(initialVariations);
    }
  }, [options, searchParams, name]);

  const handleVariationChange = (value: string) => {
    const updatedVariations = variations.map(variation =>
      variation.value === value ? { ...variation, checked: !variation.checked } : variation
    );
    setVariations(updatedVariations);

    const selectedVariationValues = updatedVariations
      .filter(variation => variation.checked)
      .map(variation => variation.value);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set(name, JSON.stringify(selectedVariationValues));
    setSearchParams(newSearchParams);
  };

  return (
    <div>
      <div onClick={() => setShowOptions(!showOptions)} className="cursor-pointer">
        <NavTitle title={name} icons={true} />
      </div>
      {showOptions && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
            {variations.map(({ id, value, checked }) => (
              <li
                key={id}
                className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2"
              >
                <input
                  id={`variation-checkbox-${id}`}
                  type="checkbox"
                  checked={checked}
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