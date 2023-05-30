import React from "react";

const CustomInput = (props) => {
  const {
    type,
    name,
    placeholder,
    classname,
    onChange,
    value,
    onBlur,
    disabled,
  } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
