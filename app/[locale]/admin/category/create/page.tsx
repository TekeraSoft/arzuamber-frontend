"use client";
import React, { useEffect, useState } from "react";
import { OrderList } from "primereact/orderlist";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  createCategoryDispatch,
  getCategoriesDispatch,
} from "@/store/adminSlice";
import { useLocale } from "next-intl";
import { Category } from "@/types";
import Resizer from 'react-image-file-resizer'
import { TiMinus, TiPlus } from "react-icons/ti";
import {FiUpload} from "react-icons/fi";
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import image = mockSession.user.image;

function AdminCreateCategory() {
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.admin
  );

  const [localCategories, setLocalCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [images, setImages] = useState([]);
  const [categoryInput, setCategoryInput] = useState({
    name: "",
    subCategoryName: "",
  });

  useEffect(() => {
    setLocalCategories(categories); // categories güncellenince localCategories de güncellenir
  }, [categories]);

  useEffect(() => {
    dispatch(getCategoriesDispatch());
  }, [dispatch]);

  const handleAddMainCategory = () => {
    if (categoryInput.name.trim() !== "") {
      const newCategory = {
        id: crypto.randomUUID(),
        name: categoryInput.name,
        subCategories: [],
      };
      setLocalCategories((prev) => [...prev, newCategory]);
      setCategoryInput({ ...categoryInput, name: "" });
    }
  };

  const handleRemoveMainCategory = (categoryId: string) => {
    setLocalCategories((prev) =>
      prev.filter((category) => category.id !== categoryId)
    );
    if (selectedCategoryId === categoryId) setSelectedCategoryId(null);
  };

  const handleSelectMainCategory = (category: Category) => {
    setSelectedCategoryId(category.id);
  };

  const handleAddSubCategory = () => {
    if (selectedCategoryId && categoryInput.subCategoryName.trim() !== "") {
      setLocalCategories((prev) =>
        prev.map((category) =>
          category.id === selectedCategoryId
            ? {
                ...category,
                subCategories: [
                  ...category.subCategories,
                  categoryInput.subCategoryName,
                ],
              }
            : category
        )
      );
      setCategoryInput({ ...categoryInput, subCategoryName: "" });
    }
  };

  const handleRemoveSubCategory = (subCategoryName: string) => {
    setLocalCategories((prev) =>
      prev.map((category) =>
        category.id === selectedCategoryId
          ? {
              ...category,
              subCategories: category.subCategories.filter(
                (sub) => sub !== subCategoryName
              ),
            }
          : category
      )
    );
  };

  const selectedCategory = localCategories.find(
    (cat) => cat.id === selectedCategoryId
  );

  const handleCategoryImageChange = async (categoryName: string, file: File) => {
      const resizeImage = (file) => {
          return new Promise((resolve) => {
              Resizer.imageFileResizer(
                  file,
                  920, // ✅ Genişlik
                  1840, // ✅ Yükseklik
                  "WEBP", // ✅ Format (PNG, WEBP de olabilir)
                  100, // ✅ Kalite (0-100 arasında)
                  0, // ✅ Rotasyon
                  (resizedFile) => {
                      resolve(new File([resizedFile], `${categoryName}_${file.name}`, { type: file.type }));
                  },
                  "file" // ✅ Çıktıyı doğrudan File olarak al
              );
          });
      };
        const image = await resizeImage(file);
        setImages(prev => [...prev, image]);
  };

  const _handleSubmit = () => {
    const formData = new FormData();
    const categoryData = localCategories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        lang: locale,
        subCategories: category.subCategories
      };
    });
    formData.append("categoriesJson", new Blob([JSON.stringify(categoryData)], { type: "application/json" }));
    images.forEach(image => {
        formData.append("images", image);
    })
    dispatch(createCategoryDispatch(categoryData));
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold text-xl text-center">
        Product Category
      </h3>
          <>
            <div className="grid grid-cols-2 mt-12 gap-x-24">
              <div className="flex flex-col">
                <span className="p-float-label">
                  <InputText
                    value={categoryInput.name}
                    onChange={(e) =>
                      setCategoryInput({
                        ...categoryInput,
                        name: e.target.value,
                      })
                    }
                    className="px-4 text-md w-full"
                  />
                  <label htmlFor="main-category">Main Category</label>
                  <TiPlus
                    size={24}
                    onClick={handleAddMainCategory}
                    className="absolute -right-10 top-2 bg-blue-600 w-8 h-8 text-white rounded-full cursor-pointer"
                  />
                </span>
                <OrderList
                  className="mt-12 w-96"
                  value={localCategories}
                  onChange={(e) => setLocalCategories(e.value)}
                  dataKey="id"
                  itemTemplate={(item) => (
                      <div
                          className="flex justify-between items-center"
                          onClick={() => handleSelectMainCategory(item)}
                      >
                         <div className="flex flex-col items-center space-y-2">
                          <label htmlFor={`file-upload-${item.id}`}
                                 className="w-10 h-10 flex items-center justify-center rounded-full border cursor-pointer transition duration-200 overflow-hidden">
                            <input
                                type="file"
                                id={`file-upload-${item.id}`}
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  if (e.target.files?.[0]) {
                                    handleCategoryImageChange(item.name, e.target.files[0]);
                                  }
                                }}
                            />
                              {(() => {
                                  const file = images.find(i => i.name.split("_")[0] === item.name);
                                  return (item.image instanceof File || (images.length > 0 && file)) ? (
                                      <img
                                          src={item.image
                                              ? `${process.env.NEXT_PUBLIC_RESOURCE_API}${item.image}`
                                              : file ? URL.createObjectURL(file) : ""
                                          }
                                          alt="Preview"
                                          className="w-16 h-16 object-cover rounded-lg"
                                      />
                                  ) : (
                                      <FiUpload className="text-2xl"/>
                                  );
                              })()}
                          </label>
                        </div>
                        <span
                            className={`cursor-pointer ${
                                selectedCategoryId === item.id ? "font-bold" : ""
                            }`}
                        >
                        {item.name}
                      </span>
                        <TiMinus
                            size={20}
                            onClick={() => handleRemoveMainCategory(item.id)}
                            className="cursor-pointer text-red-500 ml-4"
                        />
                      </div>
                  )}
                  header="Main Category"
                />
              </div>

              <div className="flex flex-col">
                <span className="p-float-label">
                  <InputText
                      value={categoryInput.subCategoryName}
                      onChange={(e) =>
                          setCategoryInput({
                            ...categoryInput,
                            subCategoryName: e.target.value,
                          })
                      }
                      className="px-4 text-md w-full"
                  />
                  <label htmlFor="sub-category">Sub Category</label>
                  <button
                      onClick={handleAddSubCategory}
                      disabled={!selectedCategoryId}
                  >
                    <TiPlus
                      size={24}
                      className="absolute -right-10 top-2 bg-blue-600 w-8 h-8 text-white rounded-full cursor-pointer"
                    />
                  </button>
                </span>
                {selectedCategory && (
                  <OrderList
                    className="mt-12 w-96"
                    value={selectedCategory.subCategories}
                    onChange={(e) => {
                      setLocalCategories((prev) =>
                        prev.map((category) =>
                          category.id === selectedCategoryId
                            ? { ...category, subCategories: e.value }
                            : category
                        )
                      );
                    }}
                    dataKey="tourSubCategoryName"
                    itemTemplate={(sub) => (
                      <div className="flex justify-between">
                        <span>{sub}</span>
                        <TiMinus
                          size={20}
                          onClick={() => handleRemoveSubCategory(sub)}
                          className="cursor-pointer text-red-500"
                        />
                      </div>
                    )}
                    header={`Sub Categories of ${selectedCategory.mainCategoryName}`}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center w-full justify-center">
              <Button
                loading={loading}
                type="button"
                className="w-44 bg-primary text-white flex justify-content-center rounded-lg p-2 font-bold"
                onClick={() => _handleSubmit()}
              >
                Güncelle
              </Button>
            </div>
          </>
    </div>
  );
}

export default AdminCreateCategory;
