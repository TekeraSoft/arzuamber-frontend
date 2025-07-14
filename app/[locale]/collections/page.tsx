"use client"
import React, {useEffect, useState} from 'react';
import Category from "@/components/home/Category";
import {Link} from "@/i18n/routing";
import {colors} from "@/data/filterData";
import {Paginator} from "primereact/paginator";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import excerpt from '@stefanprobst/remark-excerpt';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import {getAllFashionCollectionDispatch} from "@/store/fashionCollectionSlice";

function Page(props) {
    const dispatch = useDispatch<AppDispatch>();
    const {collections} = useSelector((state:RootState) => state.fashionCollection);
    const [pageable, setPageable] = useState({currentPage: 0, size: 20});

    useEffect(() => {
        dispatch(getAllFashionCollectionDispatch(pageable.currentPage, pageable.size))
    }, [dispatch,pageable]);

    const onPageChange = (event) => {
        setPageable({ size: event.rows, currentPage: event.page });

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className={'mt-24'}>
            <Category />
        <div className={'md:container mx-2'}>

            <h1 className={'my-4 font-bold text-center text-3xl md:text-5xl'}>Arzuamber Koleksiyon</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 items-start">
                    {
                        collections?.content?.map((item,index)=> (
                            <div key={index} className={'flex flex-col rounded-lg bg-white mt-4'}>
                                <Link href={`/collections/${item?.id}`} key={index} className={'bg-white rounded-lg'}>
                                    <img className={'rounded-lg md:h-64 h-40 w-full object-cover'}
                                         src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${item.image}`}
                                         alt={item.image}/>
                                </Link>
                                <div className={'my-2 p-2 flex flex-col relative gap-y-2'}>
                                    <h3 className={'text-lg text-gray-500 font-extrabold'}>{item.collectionName}</h3>
                                    <ReactMarkdown remarkPlugins={[
                                        remarkGfm,
                                        [excerpt, {maxLength: 50}]   // güvenli truncation
                                    ]}>
                                        {item.description}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))
                    }
                </div>

            <Paginator
                className={"my-4 "}
                first={pageable.currentPage * pageable.size}
                rows={pageable.size}
                totalRecords={collections?.page?.totalElements}
                rowsPerPageOptions={[9, 20, 30]}
                onPageChange={onPageChange}
            />
        </div>
        </div>
    );
}

export default Page;