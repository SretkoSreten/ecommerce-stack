import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import NavTitle from './NavTitle'; // Adjust the import according to your project structure

interface PriceProps {
  priceList: { _id: number; min: number; max: number }[];
}

const Price: React.FC<PriceProps> = ({ priceList }) => {
  const [prices, setPrices] = useState<{ _id: number; min: number; max: number; checked: boolean }[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!priceList) return;

    // Initialize prices with checked property
    const initialPrices = priceList.map(price => ({
      ...price,
      checked: false,
    }));

    // Parse selected prices from search params
    const selectedPrices = searchParams.get('prices');
    if (selectedPrices) {
      const parsedPrices = JSON.parse(selectedPrices);
      const updatedPrices = initialPrices.map(price => ({
        ...price,
        checked: parsedPrices.includes(price._id),
      }));
      setPrices(updatedPrices);
    } else {
      setPrices(initialPrices);
    }
  }, [priceList, searchParams]);

  const handlePriceChange = (id: number) => {
    const updatedPrices = prices.map(price =>
      price._id === id ? { ...price, checked: !price.checked } : price
    );
    setPrices(updatedPrices);

    const selectedPriceIds = updatedPrices
      .filter(price => price.checked)
      .map(price => price._id);

    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('prices', JSON.stringify(selectedPriceIds));
    setSearchParams(newSearchParams);
  };

  return (
    <div className="cursor-pointer">
      <NavTitle title="Shop by Price" icons={false} />
      <div className="font-titleFont">
        <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
          {prices.map(({ _id, min, max, checked }) => (
            <li
              key={_id}
              className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center gap-2 hover:text-primeColor hover:border-gray-400 duration-300"
            >
              <input
                id={`price-checkbox-${_id}`}
                type="checkbox"
                checked={checked}
                onChange={() => handlePriceChange(_id)}
                className="w-4 h-4 border-gray-300 rounded bg-gray-700"
              />
              ${min.toFixed(2)} - ${max.toFixed(2)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Price;