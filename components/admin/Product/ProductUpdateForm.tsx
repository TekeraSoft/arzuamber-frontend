"use client";

import React, { useEffect, useState } from "react";

import Button from "../../general/Button";
import Input from "../../general/Input";
import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AiOutlineDelete } from "react-icons/ai";
import RichTextBox from "../../general/RichTextBox";
import Heading from "../../general/Heading";
import CheckBox from "../../general/CheckBox";
import Image from "next/image";
import FileInput from "../../general/FileInput";
import { Product } from "@/types/Props";

type ProductUpdateFormProps = {
  product: Product;
};

function ProductUpdateForm({ product }: ProductUpdateFormProps) {
  const [images, setImages] = useState<string[]>(product.images);
  const [sizes, setSizes] = useState<string[]>(product.sizes);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      category: product.category,
      images: product.images,
      inStock: product.inStock,
      isNewSeason: product.isNewSeason,
      discountPercent: product.discountPercent,
      price: product.price,
      sizes: product.sizes,
    },
  });

  useEffect(() => {
    setValue("name", product.name);
    setValue("description", product.description);
    setValue("category", product.category);
    setValue("images", product.images);
    setValue("inStock", product.inStock);
    setValue("isNewSeason", product.isNewSeason);
    setValue("discountPercent", product.discountPercent);
    setValue("price", product.price);
    setValue("sizes", product.sizes);
  }, [product, setValue]);

  const onSubmit: SubmitErrorHandler<FieldValues> = async (data) => {
    try {
      const formData = { ...data, images, sizes };

      toast.success("Product Updated Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Product Could Not Be Updated!");
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const addSize = () => {
    setSizes((prevSizes) => [...prevSizes, ""]);
  };

  const handleSizeChange = (index: number, value: string) => {
    setSizes((prevSizes) => {
      const updatedSizes = [...prevSizes];
      updatedSizes[index] = value;
      return updatedSizes;
    });
  };

  const removeSize = (index: number) => {
    setSizes((prevSizes) => prevSizes.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-4 h-full shadow-xl py-4 bg-gray-100 rounded-lg  flex items-center justify-start flex-col"
      >
        <Heading text="Product Update" center color="black" textSize="3xl" />
        <div className="w-full h-full space-y-4">
          <div className="grid items-center grid-cols-4 gap-3">
            <Input
              label="Product Name"
              type="text"
              id="name"
              placeholder="Product Name"
              required
              errors={errors}
              register={register}
            />

            <Input
              label="Price"
              type="number"
              min={1}
              id="price"
              placeholder="Product Price"
              required
              errors={errors}
              register={register}
            />

            <Input
              label="Discount Percent"
              type="number"
              min={1}
              id="discountPercent"
              placeholder="Discount Percent"
              required
              errors={errors}
              register={register}
            />

            <div className="flex w-full justify-evenly items-center gap-5">
              <CheckBox
                id="isNewSeason"
                label="New Season?"
                register={register}
              />
              <CheckBox id="isActive" label="Active" register={register} />
            </div>
          </div>

          <div className="flex w-full h-full  gap-4">
            <div className=" grid grid-cols-6 w-full gap-4  h-full justify-center items-center ">
              {sizes.map((size, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-2 w-full  justify-center"
                >
                  <Input
                    label="Size"
                    type="text"
                    value={size}
                    onChange={(e) => handleSizeChange(i, e.target.value)}
                    id={`size-${i}`}
                    placeholder="Size"
                    required
                    errors={errors}
                    register={register}
                  />

                  <Button
                    size="icon"
                    icon={AiOutlineDelete}
                    onClick={() => removeSize(i)}
                  />
                </div>
              ))}

              <Button
                onClick={addSize}
                text="Add Size"
                size="small"
                type="button"
              />
            </div>

            <div className="flex flex-wrap gap-4 w-full">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 text-red-500"
                  >
                    X
                  </button>
                </div>
              ))}

              <FileInput
                label="Images"
                onChange={handleImageChange}
                id="images"
                accept="image/"
                multiple
                required
                Filespan={false}
                FileButton={false}
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <RichTextBox
            label="Description"
            id="description"
            placeholder="Product Description"
            required
            errors={errors}
            register={register}
          />
          <div className="w-full flex items-center justify-center">
            <Button
              text="Submit"
              type="submit"
              color="primary"
              size="medium"
              animation
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProductUpdateForm;
