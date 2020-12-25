import React, { useState } from "react";

const Select = (props) => {
  const [selectedValue, setSelectedValue] = useState("monument");

  const onSelectValue = (e) => {
    setSelectedValue(e.target.value);
    props.onSelect(e.target.value);
  };

  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      <select value={selectedValue} onChange={onSelectValue}>
        {props.options.map((opt) => {
          return (
            <option key={opt} value={opt.toLowerCase()}>
              {opt}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
