"use client";
import "@/app/[locale]/globals.css";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { useFormik } from "formik";
import { FiUpload } from "react-icons/fi";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { filterData } from "@/data/filterData";
import { Checkbox } from "primereact/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  getAllColorsDispatch,
  getCategoriesDispatch,
  getProductDispatch,
  updateProductDispatch,
} from "@/store/adminSlice";
import Resizer from "react-image-file-resizer";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import TextEditor from "@/components/admin/Product/TextEditor/TextEditor";

export default function UpdateProductPage() {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const locale = useLocale();
  const { categories, loading, product, colors } = useSelector(
    (state: RootState) => state.admin,
  );
  const [subCategoriesState, setSubCategoriesState] = useState([]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: product?.id || "",
      name: product?.name || "",
      slug: product?.slug || "",
      category: product?.category || "",
      subCategory: product?.subCategory || "",
      description: product?.description || "",
      populate: product?.populate || false,
      newSeason: product?.newSeason || false,
      length: product?.length || "",
      colorSize: product?.colorSize?.map((item) => ({
        color: item.color,
        stockSize:
          item.stockSize?.map((s) => ({ size: s.size, stock: s.stock })) || [],
        stockCode: item.stockCode,
        images: [...item.images],
      })) || [{ color: "", stockSize: [{ size: "", stock: 0 }], images: [] }],
      price: product?.price || 0,
      purchasePrice: product?.purchasePrice || 0,
      discountPrice: product?.discountPrice || 0,
      deletedImages: [],
    },
    onSubmit: async (values) => {
      const formData = new FormData();

      // ✅ JSON verisini string olarak ekle
      const cleanedValues = {
        ...values,
        colorSize: values.colorSize.map((colorItem) => ({
          ...colorItem,
          images: colorItem.images.filter((image) => typeof image === "string"), // ✅ Sadece string URL'leri tut
        })),
      };

      formData.append("data", JSON.stringify(cleanedValues));

      // ✅ Resimleri `{color}_{filename}` formatında FormData'ya ekle
      values.colorSize.forEach((colorItem) => {
        colorItem.images
          .filter((image) => image instanceof File) // ❌ `{}` olanları tamamen filtrele
          .forEach((image) => {
            const fileName = `${colorItem.color}_${image.name}`;
            formData.append(
              "images",
              new File([image], fileName, { type: image.type }),
            );
          });
      });
      try {
        await dispatch(updateProductDispatch(formData));
      } catch (error) {
        console.error("Ürün güncelleme hatası:", error);
      }
    },
  });

  useEffect(() => {
    dispatch(getCategoriesDispatch());
    dispatch(getProductDispatch(params.id));
    dispatch(getAllColorsDispatch());
    handleSelectSubCategories(formik.values.category);
  }, [dispatch, params.id]);

  const handleSelectSubCategories = (name) => {
    const updateState = categories.find((c) => c.name === name);
    setSubCategoriesState(updateState?.subCategories);
  };

  const handleImageChange = async (event, index, imageIndex) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const resizeImage = (file) => {
        return new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1200,
            2400,
            "WEBP",
            100,
            0,
            (resizedFile) => {
              resolve(new File([resizedFile], file.name, { type: file.type }));
            },
            "file",
          );
        });
      };

      try {
        const resizedImage = await resizeImage(file);

        formik.setValues((prevValues) => {
          const newColorSize = prevValues.colorSize.map((item, i) => {
            if (i === index) {
              let updatedImages = [...item.images];

              // Eğer eski resim URL ise kaldır
              if (typeof updatedImages[imageIndex] === "string") {
                updatedImages.splice(imageIndex, 1);
              }

              // Yeni resmi ekle veya değiştir
              if (imageIndex >= updatedImages.length) {
                updatedImages.push(resizedImage);
              } else {
                updatedImages[imageIndex] = resizedImage;
              }

              return { ...item, images: updatedImages };
            }
            return item;
          });
          return { ...prevValues, colorSize: newColorSize };
        });
      } catch (error) {
        console.error("Resim küçültme hatası:", error);
      }
    }
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex flex-col">
        <div className={"flex flex-row items-center justify-between"}>
          <h1 className="text-3xl text-secondary">Update Product</h1>
          <button
            type={"button"}
            onClick={() =>
              formik.setFieldValue("colorSize", [
                ...formik.values.colorSize,
                { color: "", stockSize: [{ size: "", stock: 0 }], images: [] },
              ])
            }
            className={
              "rounded-full border bg-secondary w-fit h-fit p-2 px-4 text-mywhite flex flex-row gap-x-2 items-center"
            }
          >
            Add Color And Size
            <FaPlus />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-x-2 mt-12 relative">
          {formik.values.colorSize?.map((item, index) => (
            <div
              key={index}
              className="rounded bg-white relative flex flex-col justify-center items-center gap-y-4 p-6 border"
            >
              <button
                type={"button"}
                onClick={() => {
                  const selectDeletedImages =
                    formik.values.colorSize[index].images;
                  const newColorSizeState = formik.values.colorSize.filter(
                    (_, i) => i !== index,
                  );
                  formik.setFieldValue("colorSize", newColorSizeState);
                  formik.setFieldValue("deletedImages", selectDeletedImages);
                }}
                className={`${index === 0 ? "hidden" : "block"} absolute right-2 top-2 text-red-600`}
              >
                <MdCancel size={20} />
              </button>

              <div className="flex flex-row gap-x-4">
                {[0, 1, 2, 3, 4, 5].map((imageIndex) => (
                  <div
                    key={imageIndex}
                    className="flex flex-col items-center space-y-2 relative"
                  >
                    <input
                      type="file"
                      id={`file-upload-${index}-${imageIndex}`}
                      className="hidden"
                      onChange={(e) => handleImageChange(e, index, imageIndex)}
                    />
                    <label
                      htmlFor={`file-upload-${index}-${imageIndex}`}
                      className="w-16 h-32 flex items-center justify-center border cursor-pointer"
                    >
                      {formik.values.colorSize[index]?.images?.[imageIndex] ? (
                        <div>
                          <MdCancel
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              const updatedColorSize =
                                formik.values.colorSize.map((item, i) => {
                                  if (i === index) {
                                    const removedImage =
                                      item.images[imageIndex]; // 🚨 Silinen resmi al
                                    if (typeof removedImage === "string") {
                                      // Sadece eski resimler için
                                      formik.setFieldValue("deletedImages", [
                                        ...formik.values.deletedImages,
                                        removedImage,
                                      ]);
                                    }
                                    return {
                                      ...item,
                                      images: item.images.filter(
                                        (_, i) => i !== imageIndex,
                                      ), // ❌ Resmi kaldır
                                    };
                                  }
                                  return item;
                                });
                              formik.setFieldValue(
                                "colorSize",
                                updatedColorSize,
                              );
                            }}
                            className="text-red-600 z-40 absolute right-6 -top-4 cursor-pointer"
                            size={16}
                          />
                          <img
                            src={
                              formik.values.colorSize[index].images[
                                imageIndex
                              ] instanceof File
                                ? URL.createObjectURL(
                                    formik.values.colorSize[index].images[
                                      imageIndex
                                    ],
                                  )
                                : `${process.env.NEXT_PUBLIC_RESOURCE_API}${formik.values.colorSize[index].images[imageIndex]}`
                            }
                            alt="Preview"
                            className="w-16 h-32 object-cover"
                          />
                        </div>
                      ) : (
                        <FiUpload className="text-2xl" />
                      )}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col w-full gap-y-2 relative">
                <div className="flex flex-col w-full">
                  <label>Color</label>
                  <Dropdown
                    options={colors.map((c) => c.name)}
                    value={formik.values.colorSize[index].color}
                    onChange={(e) =>
                      formik.setFieldValue(`colorSize[${index}].color`, e.value)
                    }
                  />
                </div>
                {formik.values.colorSize[index].stockSize.map(
                  (item, sizeStockIndex) => (
                    <div
                      key={sizeStockIndex}
                      className={"grid grid-cols-2 gap-x-2 mt-2"}
                    >
                      <div className="flex flex-col w-2/3">
                        <label>Size</label>
                        <Dropdown
                          value={
                            formik.values.colorSize[index].stockSize[
                              sizeStockIndex
                            ].size
                          }
                          options={filterData.sizes.values}
                          onChange={(e) =>
                            formik.setFieldValue(
                              `colorSize[${index}].stockSize[${sizeStockIndex}].size`,
                              e.value,
                            )
                          }
                        />
                      </div>

                      <div className="flex flex-col relative w-2/3">
                        <label>Stock</label>
                        <InputNumber
                          onChange={(e) =>
                            formik.setFieldValue(
                              `colorSize[${index}].stockSize[${sizeStockIndex}].stock`,
                              e.value,
                            )
                          }
                          value={
                            formik.values.colorSize[index].stockSize[
                              sizeStockIndex
                            ].stock
                          }
                        />
                        <div
                          className={
                            "flex flex-row gap-x-4 absolute -right-20 top-9"
                          }
                        >
                          <button
                            type={"button"}
                            onClick={() => {
                              formik.setFieldValue(
                                `colorSize[${index}].stockSize`,
                                [
                                  ...formik.values.colorSize[index].stockSize,
                                  {
                                    size: "",
                                    stock: 0,
                                  },
                                ],
                              );
                            }}
                            className={
                              "bg-blue-600 rounded-full p-1 text-white"
                            }
                          >
                            <FaPlus />
                          </button>
                          <button
                            type={"button"}
                            onClick={() => {
                              const newState = formik.values.colorSize[
                                index
                              ].stockSize.filter(
                                (_, i) => i !== sizeStockIndex,
                              );
                              formik.setFieldValue(
                                `colorSize[${index}].stockSize`,
                                newState,
                              );
                            }}
                            className={"bg-red-600 rounded-full p-1 text-white"}
                          >
                            <FaMinus />
                          </button>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 items-center gap-y-9 gap-x-4 my-8">
          <span className="p-float-label">
            <InputText
              id="name"
              type="text"
              className="w-full"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <label htmlFor="username">Product Name</label>
          </span>
          <span className="p-float-label">
            <InputNumber
              id="price"
              name="price"
              className="w-full"
              onValueChange={formik.handleChange}
              value={formik.values.price}
              mode="currency"
              currency="TRY"
            />
            <label htmlFor="price">Price</label>
          </span>

          <div className={"flex flex-row gap-x-2 w-full"}>
            <span className="p-float-label w-full">
              <Dropdown
                options={categories.map((i) => i.name)}
                id="category"
                className="w-full"
                value={formik.values.category}
                onChange={(e) => {
                  formik.setFieldValue(`category`, e.target.value);
                  handleSelectSubCategories(e.target.value);
                }}
              />
              <label htmlFor="username">Category</label>
            </span>
            <span className="p-float-label w-full">
              <Dropdown
                options={subCategoriesState}
                id="subCategory"
                className="w-full"
                value={formik.values.subCategory}
                onChange={(e) => {
                  formik.setFieldValue(`subCategory`, e.target.value);
                }}
              />
              <label>Sub Category</label>
            </span>
          </div>

          <span className="p-float-label">
            <Dropdown
              options={filterData?.lengths.values}
              id="length"
              className="w-full"
              value={formik.values.length}
              onChange={formik.handleChange}
            />
            <label htmlFor="username">Length</label>
          </span>

          <span className="p-float-label">
            <InputNumber
              id="discountPrice"
              name="discountPrice"
              className="w-full"
              onValueChange={formik.handleChange}
              value={formik.values.discountPrice}
              mode="currency"
              currency="TRY"
            />
            <label htmlFor="price">Discount Price</label>
          </span>

          <span className="p-float-label">
            <InputNumber
              id="purchasePrice"
              name="purchasePrice"
              className="w-full"
              onValueChange={formik.handleChange}
              value={formik.values.purchasePrice}
              mode="currency"
              currency="TRY"
            />
            <label htmlFor="price">Purchase Price</label>
          </span>
        </div>
      </div>
      <div className={"flex flex-row items-center gap-x-6 mb-6"}>
        <div className="flex align-items-center">
          <Checkbox
            id={"populate"}
            onChange={(e) => formik.setFieldValue("populate", e.checked)}
            checked={formik.values.populate === true}
          />
          <label htmlFor="ingredient1" className="ml-2">
            İs Populate
          </label>
        </div>

        <div className="flex align-items-center">
          <Checkbox
            id={"newSeason"}
            onChange={(e) => formik.setFieldValue("newSeason", e.checked)}
            checked={formik.values.newSeason === true}
          />
          <label htmlFor="ingredient1" className="ml-2">
            New Season
          </label>
        </div>
      </div>
      <div className="w-full">
        <TextEditor
          content={formik.values.description}
          onChange={(value) => formik.setFieldValue("description", value)}
        />
      </div>
      <div className="flex w-100 justify-end">
        <Button
          loading={loading}
          type="button"
          onClick={formik.handleSubmit}
          className="font-bold"
        >
          Send
        </Button>
      </div>
    </form>
  );
}
