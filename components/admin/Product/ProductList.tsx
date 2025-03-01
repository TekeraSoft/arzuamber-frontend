"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import Button from "../../general/Button";
import Image from "next/image";
import ReactPaginate from "react-paginate";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLongArrowAltRight,
} from "react-icons/fa";
import TextClip from "../../utils/TextClip";
import Loading from "../../utils/Loading";
import Heading from "../../general/Heading";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";

function ProductList() {
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  const productsPerPage = 8; // Her sayfada gösterilecek ürün sayısı
  const [currentPage, setCurrentPage] = useState(0);

  const handleDelete = (productId: string) => {

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
  const currentProducts = products.slice(offset, offset + productsPerPage);

  // Toplam sayfa sayısını hesaplamak
  const pageCount = Math.ceil(products.length / productsPerPage);

  // Edit Product route

  const router = useRouter();

  const editProduct = (id: string) => {
    router.push(`/admin/product/update/${id}`);
  };

  const productDetail = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <main className="w-full flex flex-col items-center p-4">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Heading text="Product List" color="white" textSize="4xl" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-7xl">
            {currentProducts.map((product) => (
              <div
                key={product.id}
                className="shadow-lg p-3 rounded-lg bg-white flex flex-col items-center w-full"
              >
                <div className="w-full h-[150px] mb-3 relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <h2 className="text-md font-semibold text-center">
                  {TextClip(product.name)}
                </h2>
                <p className="text-gray-600 text-xs mb-3 text-center line-clamp-3">
                  {product.description}
                </p>
                <div className="flex  w-full gap-2 items-center justify-center flex-wrap md:flex-nowrap">
                  <Button
                    text="Delete"
                    color="third"
                    icon={TiDeleteOutline}
                    size="small"
                    onClick={() => handleDelete(product.id)}
                    className="w-full h-8"
                  />
                  <Button
                    text="Edit"
                    color="third"
                    size="small"
                    icon={FaRegEdit}
                    iconSize={16}
                    onClick={() => editProduct(product.id)}
                    className="w-full h-8 "
                  />
                  <Button
                    text="Detail"
                    color="third"
                    size="small"
                    icon={FaLongArrowAltRight}
                    iconSize={16}
                    onClick={() => productDetail(product.id)}
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

export default ProductList;
