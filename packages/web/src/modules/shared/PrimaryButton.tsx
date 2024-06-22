import React from "react";

interface Props {
  name: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<Props> = ({ name, disabled, onClick }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className="inline-flex sm:w-auto w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg"
    >
      {name}
    </button>
  );
};
