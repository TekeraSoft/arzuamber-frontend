"use client"

import React, {useEffect, useState} from 'react';
import {Link} from "@/i18n/routing";
import {Paginator} from "primereact/paginator";
import {colors} from "@/data/filterData";
import Loading from "@/components/utils/Loading";
import DfFilter from "@/components/general/Filter/DfFilter";
import Image from "next/image";
import ProductCartItem from "@/components/products/ProductCartItem";

function Page() {
    const [products,setProducts] = useState([]);
    const [themes, setThemes] = useState([])
    const [pageable,setPageable] = useState({currentPage:0,size:20})
    const [loading, setLoading] = useState(false)
    const [genderState, setGenderState] = useState(null)
    const [sizeState, setSizeState] = useState(null)
    const [colorState, setColorState] = useState(null)
    const [themeState, setThemeState] = useState(null)

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);

            let baseUrl = "";

            baseUrl = `${process.env.NEXT_PUBLIC_TEKERA_API_URI}/product/filterProduct` as string;


            const params = [];
            params.push(`subCategoryName=Digital Fashion`);
            if (genderState) {
                params.push(`tags=${genderState}`);
            }
            if(themeState) {
                params.push(`tags=${themeState}`);
            }

            if (sizeState) {
                params.push(`size=${sizeState}`);
            }
            if (colorState) {
                params.push(`color=${colorState}`);
            }

            // Always add pagination parameters
            params.push(`page=${pageable.currentPage}`);
            params.push(`size=${pageable.size}`);

            // Construct the final API URL
            let apiUrl = baseUrl;
            if (params.length > 0) {
                apiUrl += `?${params.join('&')}`;
            }

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const json = await response.json();
                setProducts(json);
            } catch (error) {
                setProducts({ content: [], page: { totalElements: 0 } }); // Reset products on error
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [pageable, sizeState, colorState, genderState, themeState]);


    useEffect(() => {
        const fetchThemeData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_URI}/theme/getAllTheme`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setThemes(json);
                setLoading(false)
            } catch (error) {
                console.error("Failed to fetch target picture:", error);
                // Optionally show a toast here if this is critical
            }
            finally {
                setLoading(false)
            }
        }
        fetchThemeData()
    }, []);

    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };


    return (
        <main className=" flex flex-col justify-center items-center  w-full   overflow-hidden ">
            <div className="flex w-full h-full gap-2 items-start justify-center SliderContainer">
                <DfFilter gender={genderState} size={sizeState} color={colorState} setGender={setGenderState}
                          setSize={setSizeState} setColor={setColorState} />

                {loading ? <Loading /> : (
                    <div className="w-full h-full">
                        <div
                            className="  flex items-center justify-between overflow-x-auto  space-x-4 p-0.5 md:py-0.5 mb-2 mt-8 md:mt-0"
                            style={{
                                scrollbarWidth: "none", // Firefox'ta kaydırma çubuğunu gizler
                                msOverflowStyle: "none", // Internet Explorer ve Edge tarayıcıları için
                            }}
                        >
                            {themes?.length > 0 &&
                                themes.map((t, index) => (
                                    <div
                                        onClick={() => setThemeState(t.name)}
                                        key={index}
                                        className="flex flex-col items-center justify-center  cursor-pointer"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className={`${t.name === themeState && 'border-green-600'} relative w-12 h-12 md:w-16 md:h-16 mb-2 overflow-hidden rounded-full border-2 border-secondary shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105  hover:border-green-600`}>
                                                <Image
                                                    src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${t.image}`}
                                                    alt={t.name}
                                                    fill
                                                    priority
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            </div>
                                            <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                                                {t.name}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-start">
                                {
                                    products?.content?.map((item,index)=> (
                                      <ProductCartItem product={item} key={index} />
                                    ))
                                }
                            </div>

                            <Paginator
                                className={"my-4 "}
                                first={pageable.currentPage * pageable.size}
                                rows={pageable.size}
                                totalRecords={products?.page?.totalElements}
                                rowsPerPageOptions={[9, 20, 30]}
                                onPageChange={onPageChange}
                            />
                        </>
                    </div>
                )}
            </div>
        </main>
    );
}

export default Page;
