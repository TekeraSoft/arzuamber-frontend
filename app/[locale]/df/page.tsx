"use client"

import React, {useEffect, useState} from 'react';
import {Link} from "@/i18n/routing";
import {Paginator} from "primereact/paginator";
import {colors} from "@/data/filterData";
import Loading from "@/components/utils/Loading";
import DfFilter from "@/components/general/Filter/DfFilter";

function Page() {
    const [products,setProducts] = useState([]);
    const [pageable,setPageable] = useState({currentPage:0,size:20})
    const [loading, setLoading] = useState(false)
    const [genderState, setGenderState] = useState(null)
    const [sizeState, setSizeState] = useState(null)
    const [colorState, setColorState] = useState(null)


    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);

            // Determine the base API URL
            let baseUrl = "";
            const activeFilters = genderState || sizeState || colorState;

            if (activeFilters) {
                baseUrl = process.env.NEXT_PUBLIC_TEKERA_API_FILTER_PRODUCT as string;
            } else {
                baseUrl = process.env.NEXT_PUBLIC_TEKERA_API_URI as string;
            }

            // Create an array to hold query parameters
            const params = [];

            // Add filters only if they are active
            if (genderState) {
                params.push(`gender=${genderState}`);
            }
            if (sizeState) {
                params.push(`size=${sizeState}`);
            }
            if (colorState) {
                params.push(`color=${colorState}`);
            }

            // Always add pagination parameters
 /*           params.push(`page=${pageable.currentPage}`);
            params.push(`size=${pageable.size}`);*/

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
    }, [pageable, genderState, sizeState, colorState]);
    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if(loading) {
        return <Loading />
    }

    return (
        <main className=" flex flex-col justify-center items-center  w-full   overflow-hidden md:mt-6 lg:mt-2 ">
            <div className="flex w-full h-full gap-2 items-start justify-center mt-4 md:mt-0 SliderContainer">
                <DfFilter gender={genderState} size={sizeState} color={colorState} setGender={setGenderState} setSize={setSizeState} setColor={setColorState} />

                <div className="w-full my-5 h-full">
                            <>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 items-start">
                                    {
                                        products?.content?.map((item,index)=> (
                                            <div key={index} className={'flex flex-col rounded-lg bg-white mt-4'}>
                                                <Link href={`/df/${item?.slug}`} key={index} className={'bg-white rounded-lg'}>
                                                    <img className={'rounded-lg h-80 w-full object-cover'}
                                                         src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.variations[0].images[0]}`}
                                                         alt={item.variations[0].images[0]}/>
                                                </Link>
                                                <div className={'my-2 p-2 flex flex-col relative gap-y-2'}>
                                                    <h3 className={'text-lg font-semibold'}>{item.name}</h3>
                                                    <div className="flex gap-2 flex-wrap mt-1">
                                                        {item?.variations?.map((variation) => {
                                                            const colorHex = colors.find(
                                                                (col) => col.name === variation.color
                                                            )?.hex;
                                                            return (
                                                                <div
                                                                    key={variation.id}
                                                                    className="relative inline-block"
                                                                >
                                                                    <div
                                                                        className={`${variation.color === 'Beyaz' && 'border'} w-2.5 h-2.5 rounded-full outline-1 cursor-pointer peer`}
                                                                        style={{ backgroundColor: colorHex }}
                                                                    ></div>

                                                                    <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity whitespace-nowrap select-none z-10">
                              {variation.color}
                            </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    <div className={'flex flex-row w-full justify-between items-center'}>
                                                        <h3 className={'font-semibold'}>{item.variations[0]?.attributes[0]?.price?.toLocaleString("tr-TR", {
                                                            style: "currency",
                                                            currency: "TRY",
                                                        })}</h3>
                                                        <Link href={`/df/${item?.slug}`}
                                                              className={'p-2 border px-4 text-sm hover:scale-105 transition-transform ' +
                                                                  'duration-100 rounded-lg'}>
                                                            İncele
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
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
            </div>
        </main>
    );
}

export default Page;
