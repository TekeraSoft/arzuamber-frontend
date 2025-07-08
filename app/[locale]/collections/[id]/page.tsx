"use client"
import React, {useEffect, useState} from 'react';
import {useParams} from "next/navigation";
import {Link} from "@/i18n/routing";
import {colors} from "@/data/filterData";
import Loading from "@/components/utils/Loading";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import Image from "next/image";


function Page() {

    const param = useParams();
    const [collection,setCollection] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCollections = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_COLLECTION}/getFashionCollection?id=${param.id}`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const json = await response.json();
                setCollection(json);
            } catch (error) {
                setCollection({ content: [], page: { totalElements: 0 } }); // Reset products on error
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, [param.id]);

    if(loading) {
        <Loading />
    }


    return (
        <div className={'container bg-white rounded-lg p-4 md:p-6 mb-4'}>
            <div className={'flex items-center justify-center'}>
                <img src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${collection?.image}`} alt={collection?.image}
                     className={'w-full blur-sm md:h-80 h-36 brightness-75 object-cover rounded-lg'} />
                <h3 className={'text-center absolute text-white md:w-[80rem] w-[20rem] font-bold text-2xl md:text-5xl md:mt-0 mt-4'}>{collection?.collectionName}</h3>
            </div>
        <div className={'grid grid-cols-2 md:grid-cols-4 flex-wrap gap-4 my-6 mb-12'}>
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
            <div className={'border p-3 rounded-lg'}>
                <ReactMarkdown children={collection?.description} remarkPlugins={[remarkGfm]} />
            </div>
        </div>
    );
}

export default Page;