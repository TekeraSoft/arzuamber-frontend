"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface RichTextBoxProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  value?: string;
  label?: string;
}

function RichTextBox({
  id,
  placeholder,
  disabled,
  required,
  label,
  value,
  errors,
  register,
}: RichTextBoxProps) {
  return (
    <div className="flex flex-col h-full w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1 ">
          {label}
        </label>
      )}
      <textarea
        id={id}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={value}
        {...register(id, {
          required: required && `${placeholder} is required`,
        })}
        className={`min-h-20 h-full my-3 p-3 border outline-none rounded-md text-xs resize-none  ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />
      {errors[id] && typeof errors[id]?.message === "string" && (
        <span className="text-red-500 text-sm mt-1">{errors[id]?.message}</span>
      )}
    </div>
  );
}

export default RichTextBox;
