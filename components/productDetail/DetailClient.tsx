"use client";

import Image from "next/image";
import Carousel, { ArrowProps } from "react-multi-carousel";
import PageContainer from "../Containers/PageContainer";
import {Product} from "@/types";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";

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

interface productProps {
  product: Product;
}

const DetailClient = ({ product }: productProps) => {

  function CustomLeftArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full left-0 z-5 opacity-70 bg-secondary p-3 hover:opacity-100"
        onClick={onClick}
      >
        <BiLeftArrow className="text-white" size={24} />
      </button>
    );
  }

  function CustomRightArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full right-0 z-5 opacity-70 bg-secondary p-3 hover:opacity-100"
        onClick={onClick}
      >
        <BiRightArrow className="text-white" size={24} />
      </button>
    );
  }

  console.log(product)

  return (
    <PageContainer>
      <div
          className="flex flex-col lg:flex-row  justify-center items-start md:items-center lg:items-start gap-8 p-8  md:rounded-lg  mb-10 w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}
        <div className=" w-full md:w-1/2 h-[300px]  md:h-[700px] relative">
          <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              transitionDuration={500}
              customLeftArrow={<CustomLeftArrow/>}
              customRightArrow={<CustomRightArrow/>}
          >
            {product.colorSize[0].images?.map((img, index) => (
                <div
                    key={index}
                    className=" w-full h-[300px]  md:h-[700px]  relative "
                >
                  <Image
                      className="object-contain absolute "
                      src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                      alt={product.name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
            ))}
          </Carousel>
        </div>
        <div className=" w-full md:w-1/2 h-[300px]  md:h-[700px] relative">
          <h3 className={'text-2xl font-semibold text-secondaryDark'}>{product.name}</h3>
          <span className={'flex flex-col gap-x-4 mt-5'}>
            {
                product.discountPrice !== 0 && (
                    <p className={'text-xl text-red-600 line-through font-semibold'}>{product.price.toFixed(2)} ₺</p>
                )
            }
            {
              product.discountPrice !== 0 ?
                  <p className={'text-xl font-semibold'}>{product.discountPrice.toFixed(2)} ₺</p> :
                  <p className={'text-xl font-semibold'}>{product.price.toFixed(2)} ₺</p>
            }
          </span>
          <div className={'flex flex-row flex-wrap gap-x-4 my-8'}>
            {
              product.colorSize.map((item, index) => (
                  <div key={index}>
                  <button><Image src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`} width={40} height={60}
                                 className={'rounded'} alt={item.images[0]}/></button>
                    <button></button>
                  </div>
              ))
            }
          </div>

        </div>

      </div>
    </PageContainer>
  );
};

export default DetailClient;
