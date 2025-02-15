"use client";
import "yet-another-react-lightbox/styles.css"
import Image from "next/image";
import Carousel, { ArrowProps } from "react-multi-carousel";
import PageContainer from "../Containers/PageContainer";
import {Product} from "@/types";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import {useEffect, useState} from "react";
import Lightbox from "yet-another-react-lightbox";
import {FaMinus, FaPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/store/store";
import {addToCart} from "@/store/cartSlice";

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
  const dispatch = useDispatch<AppDispatch>();
  const [stockSizeState, setStockSizeState] = useState(product.colorSize[0])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(1);
  const [stateProduct, setStateProduct] = useState<{size:string; color:string; image:string; totalStock: number; price: number; quantity: number}>({
    size: '',
    color:stockSizeState.color,
    totalStock: '',
    price: '',
    quantity: 1
  });

  const toggleOpen = (state: boolean) => () => setIsModalOpen(state);

  const updateIndex = ({ index: current }: { index: number }) =>
      setPhotoIndex(current);

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

  return (
    <PageContainer>
      <div
          className="flex flex-col lg:flex-row  justify-center items-start md:items-center lg:items-start gap-8 p-8  md:rounded-lg  mb-10 w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}
        <div className="w-full md:w-4/6 h-[300px]">
          <Carousel
              responsive={responsive}
              infinite
              autoPlay
              slidesPerView={1}
              autoPlaySpeed={3000}
              transitionDuration={500}
              customLeftArrow={<CustomLeftArrow/>}
              customRightArrow={<CustomRightArrow/>}
          >
            {stockSizeState?.images?.map((img, index) => (
                <div key={index} className="flex justify-center items-center w-full">
                  <Image
                      className="cursor-zoom-in"
                      onClick={() => {
                        setPhotoIndex(0);
                        setIsModalOpen(true);
                      }}
                      objectFit="cover"
                      src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                      alt={product.name}
                      width={500}
                      height={700}
                      priority
                  />
                </div>
            ))}
          </Carousel>
        </div>
        <div className=" w-full md:w-2/6 mt-40 md:mt-0">
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
          <div className={'flex flex-col gap-x-4 mt-5'}>
            <h4 className={'text-lg text-secondaryDark font-semibold'}>Renk: </h4>
            <div className={'flex flex-row flex-wrap gap-x-4 my-4'}>
              {
                product.colorSize.map((item, index) => (
                    <button
                        onClick={() => {
                          setStockSizeState(item)
                          setStateProduct({size:'',color: item.color,totalStock:0,price:0, quantity:1})
                        }}
                        key={index}><Image src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                                           width={40} height={60}
                                           className={`${stockSizeState?.color === item.color ? 'border-2 border-secondary' : 'border-0'} rounded`}
                                           alt={item.images[0]}/></button>
                ))
              }
            </div>
          </div>

          <div className={'flex flex-col gap-x-4 mt-2'}>
            <h4 className={'text-lg text-secondaryDark font-semibold'}>Beden: </h4>
            <div className={'flex flex-row flex-wrap gap-x-4 my-4'}>
              {
                stockSizeState?.stockSize.map((item, index) => (
                    <button onClick={()=> setStateProduct({...stateProduct,totalStock: item.stock, size:item.size})} key={index}
                            className={`${stateProduct.size === item.size && 'bg-secondaryDark'} bg-secondary text-white rounded-lg px-2 py-1`}>{item.size}</button>
                ))
              }
            </div>
          </div>

          <p className="text-lg text-secondaryDark font-semibold my-2">Adet: </p>
          <span className="py-3 px-4 flex w-64 gap-x-8 flex-row items-center justify-between border border-secondary rounded">
          {stateProduct?.quantity <= 1 ? (
              <FaMinus
                  className={`${
                      stateProduct.quantity <= 1 && "text-gray-300 cursor-not-allowed"
                  }`}
              />
          ) : (
              <FaMinus
                  className="cursor-pointer"
                  onClick={() =>
                      setStateProduct({
                        ...stateProduct,
                        quantity: stateProduct.quantity - 1,
                      })
                  }
              />
          )}
            <p className={'text-xl font-semibold'}>{stateProduct.quantity}</p>
          <FaPlus
              className={`${
                  stateProduct?.totalStock <= 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "cursor-pointer"
              }`}
              onClick={() => {
                if (stateProduct.quantity < stateProduct.totalStock) {
                  setStateProduct({
                    ...stateProduct,
                    quantity: stateProduct.quantity + 1,
                  });
                }
              }}
          />
        </span>

          <button
              onClick={()=> dispatch(addToCart(
                  {
                    id: product.id,
                    name: product.name,
                    color: stateProduct.color,
                    image: stockSizeState?.images[0],
                    size: stateProduct.size,
                    quantity: stateProduct.quantity,
                    price: product.price,
                  }
              ))}
              className={'bg-secondary mt-10 p-2 w-64 rounded-lg text-xl text-white font-semibold'}>Sepete Ekle</button>

          <p className={'text-secondary text-lg mt-4'}>{product.description}</p>

        </div>
        <Lightbox
            open={isModalOpen}
            close={toggleOpen(false)}
            index={photoIndex}
            slides={stockSizeState?.images?.map(img => ({
              src: `${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`
            }))}
            on={{view: updateIndex}}
            animation={{fade: 0}}
            controller={{closeOnPullDown: true, closeOnBackdropClick: true}}
        />
      </div>
    </PageContainer>
  );
};

export default DetailClient;
