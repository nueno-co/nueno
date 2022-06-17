import React, { useState } from "react";

const TagInput = () => {
  const [tag, setTag] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTag([...tag, value]);
    e.target.value = "";
  };

  const removeTag = (index) => {
    setTag(tag.filter((el, i) => i !== index));
  };
  return (
    <div className="flex items-center flex-wrap gap-1 w-80 p-1  border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
      {tag.map((tag, index) => (
        // eslint-disable-next-line react/jsx-key
        <div key={index} className="bg-gray-200 inline-block py-1 px-2 rounded-full">
          <span>{tag}</span>
          <span
            onClick={() => removeTag(index)}
            className="h-4 w-4 hover:cursor-pointer bg-black text-white mx-1 rounded-full inline-flex justify-center items-center">
            x
          </span>
        </div>
      ))}
      <input
        onKeyDown={handleKeyDown}
        type="text"
        className="grow border-none outline-none py-1 text-md text-semibold"
      />
    </div>
  );
};

export default TagInput;
