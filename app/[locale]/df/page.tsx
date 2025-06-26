"use client"

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Link} from "@/i18n/routing";
import {Paginator} from "primereact/paginator";
import {Tree} from "primereact/tree";
import {dfFilter} from "@/data/filterData";
import {Checkbox} from "primereact/checkbox";
import {toast} from "react-toastify";

function Page() {

    const [products,setProducts] = useState([]);
    const [pageable,setPageable] = useState({currentPage:0,size:20})
    const [ingredients, setIngredients] = useState([]);

    const fetchProductData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_URI}?page=${pageable.currentPage}&size=${pageable.size}`)
        const json = await response.json()
        setProducts(json)
    }

    useEffect(() => {
        fetchProductData()
    }, []);

    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const onIngredientsChange = (e) => {
        let _ingredients = [...ingredients];

        if (e.checked)
            _ingredients.push(e.value);
        else
            _ingredients.splice(_ingredients.indexOf(e.value), 1);

        setIngredients(_ingredients);
    }

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_DETAIL_URI}/${params.slug}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const json = await response.json();
                setProduct(json);
            } catch (error) {
                console.error("Failed to fetch product data:", error);
                toast.error("Ürün bilgileri yüklenirken bir hata oluştu.");
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [params.slug]);

    return (
        <div className={'container'}>
            <div className={'flex flex-row gap-x-4'}>
                <div className="card flex w-1/6 bg-white justify-content-center rounded-lg">
                    <ul>
                        {
                            dfFilter.size.map((item,index) => (
                                <li className={'flex align-items-center'}>
                                    <Checkbox inputId="ingredient1" name="pizza" value={item} onChange={onIngredientsChange} checked={ingredients.includes(item)} />
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
                                <div key={index} className={'flex flex-col rounded bg-white mt-4'}>
                                    <Link href={`/df/${item?.slug}`} key={index} className={'bg-white'}>
                                        <img className={'rounded h-80 w-full object-cover'}
                                             src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.variations[0].images[0]}`}
                                             alt={item.variations[0].images[0]}/>
                                    </Link>
                                    <div className={'my-2 p-2 flex flex-col relative gap-y-2'}>
                                        <h3 className={'text-lg font-semibold'}>{item.name}</h3>
                                        <div className={'flex flex-row gap-x-2 flex-wrap gap-y-2 items-center justify-start'}>
                                            {
                                                item.variations.flatMap((variant,varIndex)=> (
                                                    <Image
                                                        key={varIndex}
                                                        src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${variant.images[0]}`}
                                                        className={'rounded'}
                                                        alt={`${variant.images[varIndex]}`}
                                                        width={30}
                                                        height={30}/>
                                                ))
                                            }
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