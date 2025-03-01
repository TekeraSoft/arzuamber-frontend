"use client";

import { useForm, FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../general/Button";
import Input from "../../general/Input";
import FileInput from "../../general/FileInput";
import Heading from "../../general/Heading";
import Image from "next/image";

function CategoryCreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      image: "",
      subcategories: [],
    },
  });

  const [image, setImage] = useState<string | null>(null);
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [subcategoryInput, setSubcategoryInput] = useState("");

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const base64 = await convertBase64(file);
    setImage(base64 as string);
    setValue("image", base64, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const convertBase64 = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAddSubcategory = () => {
    if (subcategoryInput.trim() === "") return;
    const updatedSubcategories = [...subcategories, subcategoryInput.trim()];
    setSubcategories(updatedSubcategories);
    setSubcategoryInput("");
    setValue("subcategories", updatedSubcategories, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleRemoveSubcategory = (index: number) => {
    const updatedSubcategories = subcategories.filter((_, i) => i !== index);
    setSubcategories(updatedSubcategories);
    setValue("subcategories", updatedSubcategories, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const onSubmit = (data: FieldValues) => {
    if (!image) {
      toast.error("Please upload an image.");
      return;
    }
    if (subcategories.length === 0) {
      toast.error("Please add at least one subcategory.");
      return;
    }

    try {
      const formData = { ...data, image, subcategories };
      toast.success("Category Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create category.");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center h-full">
      <form
        className="w-[90%] bg-gray-100 p-6 rounded-lg shadow-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading text="Create Category" textSize="2xl" center />

        {/* Category Name */}
        <div>
          <Input
            type="text"
            id="name"
            placeholder="Category Name"
            register={register}
            errors={errors}
          />
        </div>

        {/* Image Upload */}
        <div>
          {image && (
            <div className="flex justify-center mt-2">
              <Image
                src={image}
                alt="Category Preview"
                width={100}
                height={100}
                className="w-full h-[70px] object-contain bg-center bg-cover"
              />
            </div>
          )}
          <FileInput
            id="image"
            label="Upload Category Image"
            onChange={handleImageChange}
            errors={errors}
            register={register}
            FileButton={true}
            Filespan={false}
          />
        </div>

        {/* Subcategories */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Subcategory Name"
              id="subcategories"
              type="text"
              errors={errors}
              register={register}
            />
            <Button
              text="Add"
              size="small"
              onClick={handleAddSubcategory}
              color="primary"
              type="button"
            />
          </div>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            {subcategories.map((sub, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-sm gap-2"
              >
                <span className="w-full">{sub}</span>
                <Button
                  text="Remove"
                  size="small"
                  onClick={() => handleRemoveSubcategory(index)}
                  color="secondary"
                  type="button"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center mt-4">
          <Button
            text="Create Category"
            size="large"
            type="submit"
            color="secondary"
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
}

export default CategoryCreateForm;
