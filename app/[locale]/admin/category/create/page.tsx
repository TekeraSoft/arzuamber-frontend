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
import { Formik } from "formik";
import { TiMinus, TiPlus } from "react-icons/ti";

function AdminCreateCategory() {
  const locale = useLocale();
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading } = useSelector(
    (state: RootState) => state.admin
  );

  const [localCategories, setLocalCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
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

  return (
    <div className="flex flex-col items-center justify-center">
      <h3 className="text-gray-500 font-bold text-xl text-center">
        Product Category
      </h3>
      <Formik
        initialValues={{
          categoryName: "",
          subCategories: [{ subCategoryName: "" }],
        }}
        onSubmit={() => {
          const changeCat = localCategories.map((lc) => ({
            id: lc.id,
            name: lc.name,
            lang: locale,
            subCategories: lc.subCategories,
          }));
          dispatch(createCategoryDispatch(changeCat));
        }}
      >
        {({ handleSubmit }) => (
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
                type="submit"
                className="w-44 bg-primary text-white flex justify-content-center rounded-lg p-2 font-bold"
                onClick={() => handleSubmit()}
              >
                Güncelle
              </Button>
            </div>
          </>
        )}
      </Formik>
    </div>
  );
}

export default AdminCreateCategory;
