"use client"

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Link} from "@/i18n/routing";

function Page() {

    const [products,setProducts] = useState([]);
    const [page,setPage] = useState({})

    const fetchProductData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DF_URI}`)
        const json = await response.json()
        setProducts(json.content)
    }

    useEffect(() => {
        fetchProductData()
    }, []);

    return (
        <div className={'my-8 grid grid-cols-4 gap-4 container'}>
            {
                products.map((item,index)=> (
                    <div key={index} className={'flex flex-col rounded bg-white'}>
                    <Link href={`/df/${item.slug}`} key={index} className={'bg-white'}>
                        <img className={'rounded'}
                             src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.variations[0].images[0]}`}
                             alt={item.variations[0].images[0]}/>
                    </Link>
                        <div className={'my-2 p-2 flex flex-col gap-y-2'}>
                            <h3 className={'text-lg font-semibold'}>{item.name}</h3>
                            <div className={'flex flex-row gap-x-2 items-center justify-start'}>
                                {
                                    item.variations.flatMap((variant,varIndex)=> (
                                        <Image
                                            key={varIndex}
                                            src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_FOLDER_URI}${variant.images[0]}`}
                                            className={'rounded'}
                                            alt={variant.images[0]}
                                            width={30}
                                            height={30}/>
                                    ))
                                }
                            </div>
                            <div className={'flex flex-row w-full justify-between items-center'}>
                                <h3 className={'font-semibold'}>{item.variations[0].price.toLocaleString("tr-TR", {
                                    style: "currency",
                                    currency: "TRY",
                                })}</h3>
                                <Link href={`/df/${item.slug}`}
                                      className={'p-2 border px-4 text-sm hover:scale-105 transition-transform duration-100 rounded-lg'}>
                                    İncele
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Page;