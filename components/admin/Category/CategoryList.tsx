"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/store/store";
import Button from "../../general/Button";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import TextClip from "../../utils/TextClip";
import Loading from "../../utils/Loading";
import Heading from "../../general/Heading";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";

function CategoryList() {
  const { categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  const productsPerPage = 8; // Her sayfada gösterilecek ürün sayısı
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (categoryId: string) => {
    try {
      toast.success("Ürün başarıyla silindi!");
    } catch (error) {
      console.error("Silme hatası:", error);
      toast.error("Ürün silinirken bir hata oluştu!");
    }
  };

  // Sayfa değiştiğinde çalışacak fonksiyon
  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  // Sayfa başına ürünleri almak
  const offset = currentPage * productsPerPage;
  const currentCategory = categories.slice(offset, offset + productsPerPage);

  // Toplam sayfa sayısını hesaplamak
  const pageCount = Math.ceil(categories.length / productsPerPage);

  return (
    <main className="w-full flex flex-col items-center p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Heading text="Product List" color="white" textSize="4xl" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-7xl">
            {currentCategory.map((category) => (
              <div
                key={category.id}
                className="shadow-lg p-3 rounded-lg bg-white flex flex-col items-center w-full"
              >
                <div className="w-full h-[150px] mb-3 relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-md font-semibold text-center">
                  {TextClip(category.name)}
                </h2>

                <div className="flex  w-full gap-2 items-center justify-center">
                  <Button
                    color="third"
                    icon={TiDeleteOutline}
                    size="small"
                    animation
                    onClick={() => handleDelete(category.id)}
                    className="w-full h-8"
                  />
                  <Button
                    color="third"
                    size="small"
                    icon={FaRegEdit}
                    iconSize={16}
                    animation
                    onClick={() => {}}
                    className="w-full h-8"
                  />
                </div>
              </div>
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <span className="flex items-center justify-center w-8 h-8 text-mywhite bg-primary rounded-md hover:bg-primaryLight ">
                <FaChevronRight />
              </span>
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <span className="flex items-center justify-center w-8 h-8 text-mywhite bg-primary rounded-md hover:bg-primaryLight  ">
                <FaChevronLeft />
              </span>
            }
            renderOnZeroPageCount={null}
            containerClassName="flex items-center justify-center space-x-2 mt-4  "
            pageClassName="mx-1 "
            pageLinkClassName="px-3 py-1 border rounded-md text-mywhite bg-primary hover:bg-secondaryLight "
            activeClassName="font-bold rounded-md border-2 border-primary bg-primary text-white"
            disabledClassName="text-myblack cursor-not-allowed "
            breakClassName="text-secondary "
          />
        </>
      )}
    </main>
  );
}

export default CategoryList;
