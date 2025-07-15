"use client";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import ProductCartItem from "@/components/products/ProductCartItem";
import React, { useEffect, useState } from "react";
import Loading from "@/components/utils/Loading";
import { Paginator } from "primereact/paginator";
import Image from "next/image";
import DfFilter from "@/components/general/Filter/DfFilter";
import {Link} from "@/i18n/routing";
import {categories, colors} from "@/data/filterData";
import { useRouter, useSearchParams } from 'next/navigation';

function Products() {
    const [products, setProducts] = useState();
    const [pageable, setPageable] = useState({ currentPage: 0, size: 20 }); // size sabit tutulacak
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();

    const updateQueryParams = (key, value) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value !== null && value !== undefined) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        router.push(`?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);

            const gender = searchParams.get("gender");
            const clothSize = searchParams.get("clothSize");
            const color = searchParams.get("color");
            const theme = searchParams.get("theme");
            const subcategory = searchParams.get("subcategory");
            const page = searchParams.get("page") || 0;

            const activeFilters = gender || clothSize || color || theme || subcategory;

            const baseUrl = activeFilters
                ? `${process.env.NEXT_PUBLIC_TEKERA_API_URI}/product/filterProduct`
                : `${process.env.NEXT_PUBLIC_TEKERA_API_URI}/product/getAllProduct`;

            const params = [];

            if (gender) params.push(`tags=${gender}`);
            if (theme) params.push(`tags=${theme}`);
            if (subcategory) params.push(`subCategoryName=${subcategory}`);
            if (clothSize) params.push(`clothSize=${clothSize}`);
            if (color) params.push(`color=${color}`);

            // sadece page ve sabit size gönderiyoruz
            params.push(`page=${page}`);
            params.push(`size=${pageable.size}`); // URL'den değil state'ten

            const apiUrl = `${baseUrl}?${params.join("&")}`;
            try {
                const response = await fetch(apiUrl);
                console.log(apiUrl)
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const json = await response.json();
                setProducts(json);
            } catch (error) {
                console.error("Fetch error:", error);
                setProducts({ content: [], page: { totalElements: 0 } });
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [searchParams, pageable.size]); // sadece size state'ten değişirse tekrar çalışsın

    const onPageChange = (event) => {
        updateQueryParams("page", event.page);
        setPageable((prev) => ({
            ...prev,
            currentPage: event.page,
        }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearFilter = () => {

        const params = new URLSearchParams();
        params.set("page", "0"); // sadece page'i sıfırla
        router.push(`?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        const page = searchParams.get("page");

        setPageable((prev) => ({
            ...prev,
            currentPage: Number(page) || 0,
        }));
    }, []);

  return (
      <main className=" flex flex-col justify-center items-center  w-full   overflow-hidden ">
          <div className="flex w-full h-full gap-2 items-start justify-center mt-4 md:mt-0 SliderContainer">
              <DfFilter updateQueryParams={updateQueryParams} />

              <div className="w-full h-full">
                  <div
                      className="  flex items-center justify-between overflow-x-auto  space-x-4 p-0.5 md:py-0.5 mb-2 "
                      style={{
                          scrollbarWidth: "none", // Firefox'ta kaydırma çubuğunu gizler
                          msOverflowStyle: "none", // Internet Explorer ve Edge tarayıcıları için
                      }}
                  >
                      <button
                          onClick={clearFilter}
                          className="flex flex-col items-center justify-center  cursor-pointer"
                      >
                          <div className="flex flex-col items-center">
                              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                                  <Image
                                      src={`/images/Brand/all-product-cat-image.jpg`}
                                      alt={"brandDescription"}
                                      fill
                                      priority
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                              </div>
                              <h3 className="text-center w-16 md:w-20 text-xs md:text-sm">
                                  Tüm Ürünler
                              </h3>
                          </div>
                      </button>
                      <Link
                          href={"/collections"}
                          className="flex flex-col items-center justify-center  cursor-pointer"
                      >
                          <div className="flex flex-col items-center">
                              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                                  <Image
                                      src={`/images/logo/collection-img.webp`}
                                      alt={"brandDescription"}
                                      fill
                                      priority
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                              </div>
                              <h3 className="text-center w-16 md:w-20 text-xs md:text-sm">
                                  Koleksiyon
                              </h3>
                          </div>
                      </Link>

                      <button
                          onClick={()=> updateQueryParams("subcategory", "Digital Fashion")}
                          className="flex flex-col items-center justify-center  cursor-pointer"
                      >
                          <div className="flex flex-col items-center">
                              <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg hover:border-green-400 transition-all duration-300 ease-in-out transform hover:scale-105">
                                  <Image
                                      src={`/images/logo/df-img.gif`}
                                      alt={"brandDescription"}
                                      fill
                                      priority
                                      className="object-cover"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                  />
                              </div>
                              <h3 className="text-center w-16 md:w-20 text-xs md:text-sm">
                                  Dijital Giyim
                              </h3>
                          </div>
                      </button>
                      {categories?.length > 0 &&
                          categories.map((category, index) => (
                              <button
                                  key={index}
                                  onClick={() => {
                                      updateQueryParams("subcategory", category.name)
                                  }}
                                  className="flex flex-col items-center justify-center  cursor-pointer"
                              >
                                  {/* Kategori Resmi ve İsim */}
                                  <div className="flex flex-col items-center">
                                      {/* Kategori Resmi */}
                                      <div className="relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105  hover:border-green-600">
                                          <Image
                                              src={category.image}
                                              alt={category.name}
                                              fill
                                              priority
                                              className="object-cover"
                                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                          />
                                      </div>

                                      {/* Kategori İsmi */}
                                      <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                                          {category.name}
                                      </h3>
                                  </div>
                              </button>
                          ))}
                  </div>

                  {loading ? (
                          <Loading />
                      ) : (
                          <>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
                                  {
                                      products?.content?.map((product, i) => (
                                          <ProductCartItem product={product} key={i} />
                                      ))
                                  }
                              </div>

                              <Paginator
                                  className="my-4"
                                  first={pageable.currentPage * pageable.size}
                                  rows={pageable.size}
                                  totalRecords={products?.page.totalElements}
                                  onPageChange={onPageChange}
                              />
                          </>
                      )}
              </div>
          </div>
      </main>
  );
}

export default Products;
