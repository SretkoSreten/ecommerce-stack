import React from "react";

interface Props {
  name: string;
  disabled?: boolean;
}

export const PrimaryButton: React.FC<Props> = ({ name, disabled }) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex sm:w-auto w-full items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-black rounded-lg"
    >
      {name}
    </button>
  );
};
