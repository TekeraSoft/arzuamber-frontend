"use client"

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Link} from "@/i18n/routing";
import {Paginator} from "primereact/paginator";
import {Tree} from "primereact/tree";
import {colors, dfFilter} from "@/data/filterData";
import {Checkbox} from "primereact/checkbox";
import {toast} from "react-toastify";
import Loading from "@/components/utils/Loading";
import {RadioButton} from "primereact/radiobutton";

function Page() {
    const [products,setProducts] = useState([]);
    const [pageable,setPageable] = useState({currentPage:0,size:20})
    const [ingredient, setIngredient] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProductData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_URI}?page=${pageable.currentPage}&size=${pageable.size}`)
            const json = await response.json()
            setProducts(json)
        }
        fetchProductData()
    }, [pageable]);

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
        <div className={'container'}>
            <div className={'flex flex-row gap-x-4'}>
                <div className="sticky top-4 w-1/6 py-4 h-fit bg-white rounded-lg">

                    <ul className={'w-full pb-4 h-fit border-b border-gray-200 px-4'}>
                        <h4>Cinsiyet</h4>
                        {
                            dfFilter.gender.map((item,index) => (
                                <li className={'flex align-items-center mt-2'}>
                                    <RadioButton inputId="ingredient1" name="pizza" value={item} onChange={(e) => setIngredient(e.value)} checked={ingredient === item} />
                                    <label htmlFor="ingredient1" className="ml-2">{item}</label>
                                </li>
                            ))
                        }
                    </ul>

                    <ul className={'w-full pb-4 h-fit border-b border-gray-200 mt-4 px-4'}>
                        <h4>Beden</h4>
                        {
                            dfFilter.size.map((item,index) => (
                                <li className={'flex align-items-center mt-2'}>
                                    <RadioButton inputId="ingredient1" name="pizza" value={item} onChange={(e) => setIngredient(e.value)} checked={ingredient === item} />
                                    <label htmlFor="ingredient1" className="ml-2">{item}</label>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <div className={'flex flex-col gap-y-2 w-5/6'}>
                    <div className={'grid md:grid-cols-4 grid-cols-1 gap-4'}>
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
                    <div className={'w-full'}>
                        <Paginator
                            className={"my-4"}
                            style={{width:'100%'}}
                            first={pageable.currentPage * pageable.size}
                            rows={pageable.size}
                            totalRecords={products?.page?.totalElements}
                            rowsPerPageOptions={[9, 20, 30]}
                            onPageChange={onPageChange}
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Page;