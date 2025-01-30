"use client";

import { FieldValues, SubmitErrorHandler, useForm } from "react-hook-form";
import Heading from "../../general/Heading";
import Input from "../../general/Input";
import CheckBox from "../../general/CheckBox";
import Button from "../../general/Button";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import FileInput from "../../general/FileInput";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Dropdown from "../../general/DropDown";
import Image from "next/image";
import { sizeList } from "@/constans/Sizes";
import RichTextBox from "../../general/RichTextBox";

function ProductCreateForm() {
  const { categories } = useSelector((state: RootState) => state.categories);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      description: "",
      category: "",
      subcategories: "",
      images: [],
      inStock: false,
      isNewSeason: false,
      discountPercent: 0,
      price: 1,
      sizes: [],
    },
  });

  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedSizeCategory, setSelectedSizeCategory] = useState<
    string | null
  >(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = [...images];
    for (let i = 0; i < files.length; i++) {
      newImages.push(files[i]);
    }
    setImages(newImages);

    setValue("images", newImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleImageRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  // Category Select
  const handleCategorySelect = (option: string) => {
    setSelectedCategory(option);
    setSelectedSubcategory(null);

    setValue("category", option, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  // SubCategory Select
  const handleSubcategorySelect = (option: string) => {
    setSelectedSubcategory(option);

    setValue("subcategories", option, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const subcategories =
    categories.find((category) => category.name === selectedCategory)
      ?.subcategories || [];

  // select size
  useEffect(() => {
    setSizes([]);
    setValue("sizes", [], {
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [selectedSizeCategory, setValue]);

  const handleSizeSelect = (size: string) => {
    if (!sizes.includes(size)) {
      setSizes([...sizes, size]);
      setValue("sizes", [...sizes, size], {
        shouldDirty: true,
        shouldValidate: true,
      });
    } else {
      const updatedSizes = sizes.filter((s) => s !== size);
      setSizes(updatedSizes);
      setValue("sizes", updatedSizes, {
        shouldDirty: true,
        shouldValidate: true,
      });
    }
  };

  const sizeCategory = sizeList.find(
    (category) => category.name === selectedSizeCategory
  );
  const availableSizes = sizeCategory ? sizeCategory.sizes : [];

  const onSubmit: SubmitErrorHandler<FieldValues> = (data) => {
    if (images.length < 2) {
      toast.error("Please upload at least 2 images!!");
      return;
    }

    try {
      const formData = {
        ...data,
        images,
        category: selectedCategory,
        subcategories: selectedSubcategory,
        sizes,
      };

      console.log("Form Data", formData);

      toast.success("Product Created Successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Product Could Not Be Created!");
    }
  };

  const watchedData = watch();
  console.log(watchedData);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center shadow-lx">
      <form
        className="w-[90%] my-1 shadow-xl px-7 py-4 space-y-5 bg-gray-200 rounded-lg flex items-center justify-start flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Heading
          center
          text="Create Product"
          textSize="4xl"
          color="black"
          font="semibold"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center w-full">
          <Input
            label="Name"
            placeholder="Product Name"
            id="name"
            type="text"
            errors={errors}
            register={register}
          />

          <Input
            label="Price"
            placeholder="Product Price"
            id="price"
            type="number"
            min={0}
            max={100000}
            errors={errors}
            register={register}
          />
          <Input
            label="Discount Percent"
            placeholder="Discount Percent"
            id="discountPercent"
            type="number"
            min={0}
            max={99}
            errors={errors}
            register={register}
          />
          <div className="flex gap-3 items-center justify-center">
            <Dropdown
              id="category"
              label="Category"
              register={register}
              errors={errors}
              options={categories.map((cat) => ({
                id: cat.id,
                name: cat.name,
              }))}
              selectedOption={selectedCategory || ""}
              onSelect={handleCategorySelect}
              placeholder="Category"
            />

            <Dropdown
              id="subcategories"
              label="Sub Category"
              required
              options={subcategories.map((sub) => ({
                id: sub.id,
                name: sub.name,
              }))}
              selectedOption={selectedSubcategory || ""}
              onSelect={handleSubcategorySelect}
              placeholder="Subcategories"
              register={register}
              errors={errors}
            />
          </div>

          <RichTextBox
            label="Description"
            id="description"
            placeholder="Product Description"
            required
            errors={errors}
            register={register}
          />

          <Dropdown
            id="sizeCategory"
            label="Size Category"
            errors={errors}
            register={register}
            required
            options={sizeList.map((cat) => ({
              id: cat.id,
              name: cat.name,
            }))}
            selectedOption={selectedSizeCategory || ""}
            onSelect={setSelectedSizeCategory}
            placeholder="Size Category"
          />

          <div className="w-full">
            <Dropdown
              id="sizes"
              label="Sizes"
              register={register}
              errors={errors}
              required
              options={availableSizes.map((size) => ({
                id: size.toString(),
                name: size.toString(),
              }))}
              selectedOption={sizes.join(", ")}
              onSelect={handleSizeSelect}
              placeholder="Boyut Seçin"
            />
          </div>
          <div>
            <h4> Selected Sizes:</h4>
            <p className="bg-primary w-full h-10  text-mywhite rounded-lg flex items-center justify-center px-2 ">
              {sizes.join(", ")}
            </p>
          </div>

          <div className="flex justify-around items-center space-x-4 w-full">
            <CheckBox
              label="Is the product active?"
              id="isActive"
              register={register}
            />
            <CheckBox
              label="New season?"
              id="isNewSeason"
              register={register}
            />
          </div>
        </div>

        <div className="flex flex-col items-start w-full">
          <FileInput
            id="image-upload"
            label="Upload Images"
            onChange={handleImageChange}
            multiple
            errors={errors}
            register={register}
            FileButton={false}
            Filespan={false}
            required
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 w-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-between space-y-3 space-x-2 border rounded-lg p-2 ${
                  index === 0 ? "border-red-500" : "border-black"
                }`}
              >
                {index === 0 && (
                  <p className="text-lg font-semibold text-red-500">
                    Front Image
                  </p>
                )}
                {index === 1 && (
                  <p className="text-lg font-semibold text-red-500">
                    Back Image
                  </p>
                )}

                <div className="relative">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-[70px] object-contain"
                  />
                </div>

                <Button
                  onClick={() => handleImageRemove(index)}
                  animation
                  text="Delete"
                  size="small"
                  className="h-10"
                  color="primary"
                />
              </div>
            ))}
          </div>
        </div>

        <Button
          animation
          color="secondary"
          size="small"
          text="Ürünü Oluştur"
          onClick={handleSubmit(onSubmit)}
          className="w-5/6"
        />
      </form>
    </div>
  );
}

export default ProductCreateForm;
