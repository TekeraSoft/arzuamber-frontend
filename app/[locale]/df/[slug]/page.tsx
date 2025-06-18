"use client"
import React, {useEffect, useRef, useState} from 'react';
import DetailClient from "@/components/productDetail/DetailClient";
import {useParams} from "next/navigation";
import {Skeleton} from "primereact/skeleton";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import {CustomLeftArrow, CustomRightArrow} from "@/components/productDetail/utils/CustomArrows";
import Loading from "@/components/utils/Loading";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 1,
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
    },
};

function Page() {
    const params = useParams()

    const [product,setProduct] = useState()
    const [photoIndex,setPhotoIndex] = useState()
    const [loading,setLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [variationState,setVariationState] = useState(product?.variations[0])

    const carouselRef = useRef<any>(null);

    const fetchProductData = async () => {
        setLoading(true)
        const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_DETAIL_URI}/${params.slug}`)
        const json = await response.json()
        setProduct(json)
        setLoading(false)
    }

    useEffect(() => {
        fetchProductData()
    }, []);

    if(loading) {
        return <Loading />
    }

    return (
        <div className={'container'}>
           <div className={'flex flex-row items-center justify-between'}>
              <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-4/6 lg:w-3/6 md:h-full">
                   <div className="hidden  w-full md:w-1/6 xs:grid grid-cols-6  md:flex  flex-col max-h-34  gap-1 ">
                       {product?.variations?.images.map((img, index) => (
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
                                       src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`}
                                       alt={product.name}
                                       width={300}
                                       height={500}
                                       priority
                                   />
                               )}
                           </div>
                       ))}
                   </div>
                  {variationState?.images?.length > 0 && (
                      <Carousel
                          responsive={responsive}
                          infinite
                          autoPlay
                          ref={carouselRef}
                          autoPlaySpeed={3000}
                          transitionDuration={500}
                          customLeftArrow={<CustomLeftArrow />}
                          customRightArrow={<CustomRightArrow />}
                          className="w-full rounded-lg h-full"
                          swipeable={true}
                          draggable={true}
                      >
                          {
                              variationState.images.map((img, index) => (
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
                                          src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`}
                                          alt={product.name}
                                          width={1000}
                                          height={1000}
                                          priority
                                      />
                                  </div>
                              ))
                          }
                      </Carousel>
                  )}
               </div>
               <div className={'flex-1'}>
                   Right-Content
               </div>
           </div>
        </div>
    );
}

export default Page;