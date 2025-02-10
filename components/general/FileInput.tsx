import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import Button from "./Button";

interface FileInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<FieldValues>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  FileButton?: boolean;
  Filespan?: boolean;
  multiple?: boolean;
  accept?: string;
}

const FileInput = ({
  id,
  label,
  disabled,
  required,
  errors,
  onChange,
  register,
  multiple,
  accept,
  FileButton = true,
  Filespan = true,
}: FileInputProps) => {
  const [fileNames, setFileNames] = useState<string[]>([]);

  // Handle file input changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files).map((file) => file.name);
      // Eğer multiple false ise sadece bir dosya ekle
      if (!multiple) {
        setFileNames([newFiles[0]]);
      } else {
        setFileNames((prev) => [...prev, ...newFiles]);
      }
      onChange(event); // register'dan gelen onChange fonksiyonuna dosya verisini göndermeliyiz.
    }
  };

  // Handle file removal
  const handleFileRemove = (index: number) => {
    setFileNames(fileNames.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className="mb-2 font-semibold text-sm md:text-base text-secondary"
      >
        {label}
      </label>

      {/* File input */}
      <input
        id={id}
        type="file"
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        {...register(id, { required: required && `${label} is required` })}
        //  {t("warningText.requiredText")}
        onChange={handleFileChange}
        className={`w-full my-3 p-2 border outline-none rounded-md text-xs text-center bg-secondary text-mywhite ${
          errors[id] ? "border-red-500" : "border-gray-300"
        }`}
      />

      {fileNames.length > 0 ? (
        fileNames.map((fileName, index) => {
          // Only render the div if at least one of Filespan or FileButton is true
          const shouldRender = Filespan || FileButton;

          // If both Filespan and FileButton are false, don't render the div at all
          if (!shouldRender) return null;

          return (
            <div
              key={index}
              className="flex flex-row justify-between items-center my-2 w-full gap-3"
            >
              {/* Conditionally render the span */}
              {Filespan && (
                <span className="text-xs bg-secondary rounded-md text-mywhite w-full p-3">
                  {fileName}
                </span>
              )}

              {/* Conditionally render the Button */}
              {FileButton && (
                <Button
                  onClick={() => handleFileRemove(index)}
                  animation
                  text="Delete"
                  className="bg-red-500 h-10"
                />
              )}
            </div>
          );
        })
      ) : (
        <span className="text-red-500 text-xs font-semibold text-center my-1">
          No files uploaded
        </span> // Optional: This will show when there are no files.
      )}

      {/* Error message */}
      {errors[id] && typeof errors[id]?.message === "string" && (
        <span className="text-red-500 text-sm mt-1">{errors[id]?.message}</span>
      )}
    </div>
  );
};

export default FileInput;
