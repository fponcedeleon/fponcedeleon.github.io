import React, { useState } from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";

export const MultiSelect = ({ options, onChange, placeholder }) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const animatedComponents = makeAnimated();
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        placeholder={placeholder}
        onChange={(items) => onChange(items)}
      />
    </div>
  );
};
