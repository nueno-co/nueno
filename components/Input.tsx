import React from "react";

interface InputProps {
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  autoComplete?: string;
  required: boolean;
  clasName?: string;
  onChange: (e: { target: { name: string; value: string | boolean } }) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  clasName,
}) => {
  return (
    <input
      name={name}
      type={type}
      autoComplete={autoComplete}
      required={required}
      value={value}
      onChange={onChange}
      className={`relative block w-full h-12 px-3 py-2 my-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${clasName}`}
      placeholder={placeholder}
    />
  );
};

export default Input;
