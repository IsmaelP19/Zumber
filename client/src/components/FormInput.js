import React from "react";

const FormInput = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  component = "input",
}) => {
  const InputComponent = component === "textarea" ? "textarea" : "input";

  return (
    <div className="flex flex-col md:flex-row my-3">
      <label className="flex text-light-gray w-44 items-center text-lg">
        {label}
      </label>
      <InputComponent
        className={`border-2 p-2 border-light-gray rounded-md w-80 ${
          component === "textarea" ? "h-36" : ""
        }  ${type === "file" ? "bg-white" : ""}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        {...(type === "file" && { maxlength: 200000 })}
        {...(type === "file" && { accept: ".jpeg, .png, .jpg" })}
      />
    </div>
  );
};

export default FormInput