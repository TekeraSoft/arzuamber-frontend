"use client"
import React, {useState} from 'react';
import DetailClient from "@/components/productDetail/DetailClient";
import {useParams} from "next/navigation";
import {Skeleton} from "primereact/skeleton";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import {CustomLeftArrow, CustomRightArrow} from "@/components/productDetail/utils/CustomArrows";

function Page() {
    const params = useParams()

    const [product,setProduct] = useState({})

    const fetchProductData = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DF_URI}/${params.slug}`)
        const json = await response.json()
        setProduct(json.content)
    }

    console.log(product)

    return (
        <div className={'container'}>
           <div className={'flex flex-row items-center justify-between'}>
               {/*<div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-4/6 lg:w-3/6 md:h-full">
                   <div className="hidden  w-full md:w-1/6 xs:grid grid-cols-6  md:flex  flex-col max-h-34  gap-1 ">
                       {stockSize?.images?.map((img, index) => (
                           <div
                               key={index}
                               onClick={() => {
                                   setPhotoIndex(index);

                                   carouselRef.current?.goToSlide(index);
                               }}
                               className="flex justify-center items-center w-full h-full "
                           >
                               {loading ? (
                                   // Skeleton resim yüklenene kadar gösterilecek
                                   <Skeleton className="w-full min-h-28 " />
                               ) : (
                                   // Gerçek resim yüklendiğinde gösterilecek
                                   <Image
                                       className="w-full h-full object-cover rounded-lg cursor-pointer"
                                       onClick={() => {
                                           // Resme tıklama fonksiyonu
                                       }}
                                       src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                                       alt={product.name}
                                       width={300}
                                       height={500}
                                       priority
                                   />
                               )}
                           </div>
                       ))}
                   </div>
                   <Carousel
                       responsive={responsive}
                       infinite
                       autoPlay
                       ref={carouselRef}
                       // slidesPerView={1}
                       autoPlaySpeed={3000}
                       transitionDuration={500}
                       customLeftArrow={<CustomLeftArrow />}
                       customRightArrow={<CustomRightArrow />}
                       className="w-full rounded-lg h-full"
                       swipeable={true}
                       draggable={true}
                   >
                       {stockSizeState?.images?.length === 0 || loading ? (
                           <div className="flex justify-center items-center w-full h-full rounded-lg mb-5">
                               <Skeleton className="w-full min-h-[750px]" />
                           </div>
                       ) : (
                           stockSizeState?.images?.map((img, index) => (
                               <div
                                   key={index}
                                   className="flex justify-center items-center w-full h-full rounded-lg mb-5"
                               >
                                   <Image
                                       className="cursor-zoom-in w-full h-full object-cover rounded-lg"
                                       onClick={() => {
                                           setPhotoIndex(index);
                                           setIsModalOpen(true);
                                       }}
                                       src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                                       alt={product.name}
                                       width={1000}
                                       height={1000}
                                       priority
                                   />
                               </div>
                           ))
                       )}
                   </Carousel>
               </div>*/}
               <div className={'flex-1'}>
                   Right-Content
               </div>
           </div>
        </div>
    );
}

export default Page;