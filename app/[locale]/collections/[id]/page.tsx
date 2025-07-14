"use client"
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {Link} from "@/i18n/routing";
import {colors} from "@/data/filterData";
import Loading from "@/components/utils/Loading";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import {getFashionCollectionDispatch, setCollection} from "@/store/fashionCollectionSlice";
import {AppDispatch, RootState} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";


function Page() {

    const param = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const {collection, loading}  = useSelector((state:RootState) => state.fashionCollection);

    useEffect(() => {
        dispatch(getFashionCollectionDispatch(param?.id))

        return () => {
            dispatch(setCollection(null))
        }
    }, [param.id]);

    if(loading) {
        <Loading />
    }

    console.log(collection)

    return (
        <div className={'container bg-white rounded-lg p-4 md:p-6 mb-4 md:mt-0 -mt-4'}>
           <div className={'flex flex-row gap-x-4 w-full justify-center mb-4'}>
               <Link
                   href={"/products"}
                   className="flex flex-col items-center justify-center  cursor-pointer"
               >
                   {/* Kategori Resmi ve İsim */}
                   <div className="flex flex-col items-center">
                       {/* Kategori Resmi */}
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

                       {/* Kategori İsmi */}
                       <h3 className="text-center text-xs md:text-sm max-w-[5rem] truncate">
                           Tüm Ürünler
                       </h3>
                   </div>
               </Link>
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
                           Koleksiyonlar
                       </h3>
                   </div>
               </Link>
               <Link
                   href={"/df"}
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
               </Link>
           </div>
            <div className={'flex items-center justify-center'}>
                <img src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${collection?.image}`} alt={collection?.image}
                     className={'w-full blur-sm md:h-80 h-36 brightness-75 object-cover rounded-lg'} />
                <h3 className={'text-center absolute text-white md:w-[80rem] w-[20rem] font-bold text-2xl md:text-5xl md:mt-0 mt-4'}>{collection?.collectionName}</h3>
            </div>
        <div className={'grid grid-cols-2 md:grid-cols-4 flex-wrap gap-4 my-3 mb-12'}>
            {
                collection?.products?.map((item,index) => (
                    <div key={index} className={'flex flex-col rounded-lg bg-white mt-4 border shadow-lg'}>
                        <Link href={`/df/${item?.slug}`} key={index} className={'bg-white rounded-lg'}>
                            <img className={'rounded-lg h-80 w-full object-cover'}
                                 src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.variations[0].images[0]}`}
                                 alt={item.variations[0].images[0]}/>
                        </Link>
                        <div className={'my-2 p-2 flex flex-col relative gap-y-2'}>
                            <h3 className={'text-md font-semibold'}>{item.name}</h3>
                            <div className="flex gap-1 flex-wrap mt-1 items-center">
                                {(() => {
                                    const variations = item?.variations || [];
                                    const firstNine = variations.slice(0, 6); // ilk 9 renk
                                    const remainingCount = variations.length - firstNine.length;

                                    return (
                                        <>
                                            {firstNine.map((variation) => {
                                                const colorHex = colors?.find(
                                                    (col) => col.name === variation.color
                                                )?.hex;
                                                return (
                                                    <div
                                                        key={variation.id}
                                                        className="relative inline-block mr-1"
                                                    >
                                                        <div
                                                            className={`${variation.color === 'Beyaz' ? 'border' : ''} w-2.5 h-2.5 rounded-full outline-1 cursor-pointer peer`}
                                                            style={{ backgroundColor: colorHex }}
                                                        ></div>

                                                        <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 pointer-events-none peer-hover:opacity-100 transition-opacity whitespace-nowrap select-none z-10">
                                                        {variation.color}
                                                        </span>
                                                    </div>
                                                );
                                            })}

                                            {remainingCount > 0 && (
                                                <div className="inline-block ml-1 text-[9px] text-gray-600 bg-gray-200 rounded px-2 py-0.5">
                                                    +{remainingCount}
                                                </div>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                            <div className={'flex flex-row w-full justify-between items-center'}>
                                <h3 className={'font-semibold'}>{item?.price?.toLocaleString("tr-TR", {
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
            <div className={'border p-3 rounded-lg'}>
                <ReactMarkdown children={collection?.description} remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    );
}

export default Page;