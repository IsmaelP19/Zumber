import React from "react";

export default function FormInput ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  component = "input",
  required = false
})  {
  const InputComponent = component === "textarea" ? "textarea" : "input";

  return (
    <div className="flex flex-col md:flex-row my-3">
      <label className="flex text-light-gray w-44 items-center text-lg">
        {label} 
        {required && <span className="text-red-500 pl-1">*</span>}
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
        {...(type === "file" && { accept: ".jpeg, .png, .jpg" })}
      />
    </div>
  );
};
