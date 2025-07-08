"use client"
import React, {useEffect} from 'react';
import Category from "@/components/home/Category";
import {Link} from "@/i18n/routing";
import {colors} from "@/data/filterData";
import {Paginator} from "primereact/paginator";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'

function Page(props) {

    const [pageable, setPageable] = React.useState({currentPage:0,size:20});
    const [collections, setCollections] =  React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        const fetchCollections = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_COLLECTION}/getAllFashionCollection`);
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                }
                const json = await response.json();
                setCollections(json);
            } catch (error) {
                setCollections({ content: [], page: { totalElements: 0 } }); // Reset products on error
            } finally {
                setLoading(false);
            }
        };

        fetchCollections();
    }, []);

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
                                    <h3 className={'text-md font-semibold'}>{item.collectionName}</h3>
                                    <ReactMarkdown children={`${item.description.slice(0,40)}...`} remarkPlugins={[remarkGfm]} />
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