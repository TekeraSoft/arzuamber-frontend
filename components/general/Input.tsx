"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  placeholder: string;
  disabled?: boolean;
  type: string;
  required?: boolean;
  errors: FieldErrors;
  register: UseFormRegister<FieldValues>;
  min?: number;
  max?: number;
  value?: string | number;
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

function Input({
  placeholder,
  disabled,
  type,
  required,
  errors,
  value,
  register,
  id,
  min = 0,
  max,
  label,
  name,
}: InputProps) {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <input
        id={id}
        placeholder={placeholder}
        min={min}
        max={max}
        disabled={disabled}
        value={value}
        name={name}
        type={type}
        {...register(id, {
          required: required && `${placeholder} is required`,
        })}
        className={`w-full h-12 my-3 p-3 border outline-none rounded-md text-xs ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />

      {errors[id] && (
        <span className="text-red-500 text-xs my-2">
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  );
}

export default Input;
