"use client"
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "next/navigation";
import {Skeleton} from "primereact/skeleton";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import {CustomLeftArrow, CustomRightArrow} from "@/components/productDetail/utils/CustomArrows";
import Loading from "@/components/utils/Loading";
import PaymentShippingCards from "@/components/productDetail/utils/PaymentShippingCards";
import {FaHeart, FaMinus, FaPlus} from "react-icons/fa";
import {Button} from "primereact/button";
import {toast} from "react-toastify";
import {addToCart, addToCartNotification} from "@/store/cartSlice";
import OrderButtons from "@/components/productDetail/utils/OrderButtons/OrderButtons";
import ShareButtons from "@/components/productDetail/utils/ShareButtons";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {useTranslations} from "next-intl";
import {useDispatch} from "react-redux";
import {openCartModal} from "@/store/modalsSlice";
import {useSession} from "next-auth/react";

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
    const { data: session } = useSession();
    const dispatch = useDispatch()
    const t = useTranslations();
    const [product,setProduct] = useState()
    const [photoIndex,setPhotoIndex] = useState(1)
    const [loading,setLoading] = useState(false)
    const [variationState,setVariationState] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorState, setErrorState] = useState({
        sizeError: false,
        colorError: false,
    });
    const [stateProduct, setStateProduct] = useState<{
        size: string;
        color: string;
        image: string;
        totalStock: number;
        stockSizeId: string;
        price: number;
        quantity: number;
    }>({
        size: "",
        color: variationState?.attributes[0]?.stockAttribute?.find(a => a.key === 'color')?.value,
        totalStock: "",
        stockSizeId: "",
        price: "",
        quantity: 1,
    });

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

    useEffect(() => {
        if (product?.variations?.length > 0) {
            setVariationState(product.variations[0]);
        }
    }, [product]);

    if(loading) {
        return <Loading />
    }

    const toggleOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openCart = () => {
        dispatch(openCartModal());
    };

    const updateIndex = ({ index: current }: { index: number }) => {
        setPhotoIndex(current);
    };

    console.log(variationState)

    return (
        <div className=" md:container md:mx-auto flex flex-col gap-3 mt-10 md:mt-12 lg:mt-5  ">
            {/* <NextSeoHead
        name={product.name}
        description={product.description}
        image={product.colorSize[0].images[0]}
      /> */}

            <div className="  container mx-auto flex flex-col lg:flex-row md:gap-x-2 justify-center items-start md:items-center lg:items-start  md:rounded-lg w-full h-full ">
                {/* Image Section with Carousel */}
              <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-4/6 lg:w-3/6 md:h-full">
                   <div className="hidden  w-full md:w-1/6 xs:grid grid-cols-6  md:flex  flex-col max-h-34  gap-1 ">
                       {variationState?.images?.map((img, index) => (
                           <div
                               key={index}
                               onClick={() => {
                                   setPhotoIndex(index);
                                   carouselRef.current?.goToSlide(index);
                               }}
                               className="flex justify-center w-full h-full "
                           >
                               {loading ? (
                                   // Skeleton resim yüklenene kadar gösterilecek
                                   <Skeleton className="w-full min-h-28 " />
                               ) : (
                                   // Gerçek resim yüklendiğinde gösterilecek
                                   <img
                                       className="w-full h-44 object-cover rounded-lg cursor-pointer"
                                       onClick={() => {
                                           // Resme tıklama fonksiyonu
                                       }}
                                       src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`}
                                       alt={`${img}`}
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
                                      className="flex w-full h-full rounded-lg mb-5"
                                  >
                                      <img
                                          className="cursor-zoom-in w-full md:h-[650px] h-[400px] object-cover rounded-lg"
                                          onClick={() => {
                                              setPhotoIndex(index);
                                              setIsModalOpen(true);
                                          }}
                                          src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`}
                                          alt={`${img}`}
                                      />
                                  </div>
                              ))
                          }
                      </Carousel>
                  )}
               </div>
                <h3 className=" md:hidden my-1 text-start text-2xl font-semibold text-secondaryDark  overflow-hidden text-ellipsis  w-full ">
                    {product?.name}
                </h3>
                <div
                    className={
                        "md:hidden flex  flex-col justify-center items-start gap-2  my-1 w-full "
                    }
                >
                    <div className="flex justify-center items-center gap-2">
                        <h4 className="text-lg text-secondaryDark font-semibold my-1 after:content-[':']">
                            Renk
                        </h4>
                        <span className="w-full first-letter:uppercase text-center text-white bg-secondary px-2  py-0.5 rounded-lg font-normal text-sm">
              {variationState?.attributes[0]?.stockAttribute.find(a => a === 'color')?.value}
            </span>
                    </div>

                    <div className={"flex flex-row flex-wrap gap-4 w-full"}>
                        {product?.variations?.map((item, index) => (
                            <button
                                onClick={() => {
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                    setVariationState(item);
                                    setStateProduct({
                                        modelCode: "",
                                        color: item?.attributes[index].stockAttribute.find(a => a.key === "color")?.value,
                                        stock: 0,
                                        variationId: "",
                                        price: 0,
                                        quantity: 1,
                                    });
                                }}
                                key={index}
                                className={`${
                                    variationState?.attributes[index].stockAttribute.find(a => a.key === "color")?.value === item.attributes[index].stockAttribute.find(a => a.key === "color")?.value
                                        ? "border-2 border-secondary  rounded"
                                        : " border border-secondary "
                                } flex flex-col items-center  justify-center p-0.5  w-16 `}
                            >
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.images[0]}`}
                                    width={56}
                                    height={15}
                                    alt={item.images[0]}
                                    className="border border-gray-400  "
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className=" w-full md:w-4/6 lg:w-3/6 mt-2  lg:mt-0 flex flex-col gap-4  border-secondary h-full px-2 rounded-lg md:min-h-[800px]  ">
                    <div className="w-full flex flex-col  justify-between items-start  gap-2">
                        <h3 className=" hidden md:flex text-xl md:text-2xl font-semibold text-secondaryDark  overflow-hidden text-ellipsis  w-full">
                            {product?.name}
                        </h3>
                        <p className="bg-secondary text-sm flex justify-center items-start text-mywhite px-2 py-1 rounded-md  w-full">
                            Model Kodu:  {variationState?.modelCode}
                        </p>
                    </div>

                    <div className="w-full flex bg-white  items-center justify-between gap-x-1 rounded-lg px-2 py-2 md:py-1  ">
            <span className={"flex  gap-x-4 "}>
              {variationState?.attributes[0].discountPrice !== 0 &&
              variationState?.attributes[0].discountPrice !== variationState?.stockAttribute?.price && variationState?.attributes[0].discountPrice !== null && (
                      <p
                          className={
                              "  md:text-xl text-red-600 line-through font-semibold"
                          }
                      >
                          {variationState?.attributes[0].price?.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                          })}{" "}
                      </p>
                  )}
                {variationState?.attributes[0].discountPrice !== 0 ? (
                    <p className={"  md:text-xl font-semibold text-green-600"}>
                        {variationState?.attributes[0].discountPrice?.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                        })}
                    </p>
                ) : (
                    <p className={"md:text-xl font-semibold text-secondaryDark"}>
                        {variationState?.attributes[0].price?.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                        })}{" "}
                    </p>
                )}
            </span>
                        <div className="text-xs font-bold underline underline-offset-1">
                            {t("productDetail.KDV")}
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-2">
                        <PaymentShippingCards />
                    </div>

                    <div className="w-full flex flex-col justify-center items-start gap-3">
                       {/* <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="text-sm font-semibold text-mywhite bg-secondary text-center rounded-lg py-2 px-4 overflow-hidden text-ellipsis whitespace-nowrap">
                                {t("productDetail.productCategory")}: {product.category}
                            </div>
                        </div>*/}
                    </div>

                    <div
                        className={
                            "hidden  md:flex flex-col justify-center items-start gap-2 "
                        }
                    >
                        <div className="flex justify-center items-center gap-2">
                            <h4 className="text-lg text-secondaryDark font-semibold my-1 after:content-[':']">
                                {t("productDetail.color")}
                            </h4>
                            <span className="w-full first-letter:uppercase text-center text-white bg-secondary px-2  py-0.5 rounded-lg font-normal text-sm">
                {stateProduct?.color}
              </span>
                        </div>
                        <div className={"flex flex-row flex-wrap gap-4 w-full"}>
                            {product?.variations.map((item, index) => (
                                <button
                                    onClick={() => {
                                        setVariationState(item);
                                        setStateProduct({
                                            modelCode: "",
                                            color: item?.attributes[index].stockAttribute.find(a => a.key === "color").value,
                                            stock: 0,
                                            variationId: "",
                                            price: 0,
                                            quantity: 1,
                                        });
                                    }}
                                    key={index}
                                    className={`  ${
                                        variationState?.attributes[index]?.stockAttribute.find(a => a.key === 'color') === item?.attributes[index]?.stockAttribute.find(a => a.key === 'color')
                                            ? "border-2 border-secondary  rounded"
                                            : " border border-secondary "
                                    } flex flex-col items-center  justify-center p-0.5  w-16 `}
                                >
                                    <Image
                                        src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.images[0]}`}
                                        width={56}
                                        height={15}
                                        alt={item.images[0]}
                                        className="border border-gray-400  "
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={"flex flex-col "}>
                        <div className="flex justify-start items-center gap-2">
                            <h4 className={"text-lg text-secondaryDark font-semibold"}>
                                {t("productDetail.size")}:
                            </h4>
                            <div className={"flex flex-row flex-wrap gap-x-4 "}>
                                {variationState?.attributes.map((item, index) =>
                                    item.stock === 0 ? (
                                        <button
                                            key={index}
                                            className={
                                                "bg-mywhite cursor-not-allowed text-red-600 border border-secondary line-through rounded-lg opacity-45 min-w-6 h-7  px-2"
                                            }
                                            disabled={item.stock === 0}
                                        >
                                            {item?.key === 'size'}
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setStateProduct({
                                                    ...stateProduct,
                                                    stockSizeId: item.id,
                                                    totalStock: item.stock,
                                                    size: item.stockAttribute?.find(a => a.key === 'size').value,
                                                    quantity: 1,
                                                });
                                                setErrorState({ ...errorState, sizeError: false });
                                            }}
                                            key={index}
                                            className={`${
                                                stateProduct.size === item?.stockAttribute.find(a => a.key === 'size').value
                                                    ? "bg-secondary text-mywhite  border-none outline-double outline-secondary"
                                                    : "bg-mywhite text-secondary border border-secondary"
                                            }  rounded-md min-w-6 h-7  px-2`}
                                        >
                                            {item.stockAttribute.find(s => s.key === "size").value}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        <small
                            className={`${
                                errorState.sizeError
                                    ? "text-xs text-red-600 font-semibold"
                                    : "hidden"
                            } `}
                        >
                            {t("productDetail.sizeError")}*
                        </small>
                    </div>

                    <div className="flex justify-start items-center gap-4">
                        <p className="text-lg text-secondaryDark font-semibold my-2">
                            {t("productDetail.quantity")}:
                        </p>
                        <span className="py-3 px-4 flex w-64 gap-x-8 flex-row items-center justify-between border border-secondary rounded">
                            <FaMinus
                                className={`${
                                    stateProduct?.quantity <= 1
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "cursor-pointer hover:scale-110 transition-all duration-300"
                                }`}
                                onClick={() => {
                                    if (stateProduct?.quantity > 1) {
                                        setStateProduct({
                                            ...stateProduct,
                                            quantity: stateProduct.quantity - 1,
                                        });
                                    }
                                }}
                            />
                            <p className="text-xl font-semibold">{stateProduct?.quantity}</p>
                            <FaPlus
                                className={`${
                                    stateProduct?.quantity >= stateProduct?.totalStock
                                        ? "text-gray-300 cursor-not-allowed"
                                        : "cursor-pointer hover:scale-110 transition-all duration-300"
                                } `}
                                onClick={() => {
                                    if (stateProduct?.quantity < stateProduct?.totalStock) {
                                        setStateProduct({
                                            ...stateProduct,
                                            quantity: stateProduct.quantity + 1,
                                        });
                                    }
                                }}
                            />
            </span>
                    </div>

                    <div className="flex flex-col justify-start items-start gap-2 ">
                        <div className="w-full flex  flex-col md:flex-row justify-start items-center gap-2 md:gap-5">
                            <Button
                                loading={loading}
                                onClick={() => {
                                    if (!stateProduct.size) {
                                        setErrorState({ ...errorState, sizeError: true });
                                        toast.error(t("productDetail.sizeError"));
                                    } else {
                                        /*console.log(
                                            {
                                                id: product.id,
                                                name: product.name,
                                                category1: "digital-fashion",
                                                category2: "Digital Fashion",
                                                color: stateProduct.color,
                                                image: variationState?.images[0],
                                                size: stateProduct.size,
                                                stockSizeId: variationState?.id,
                                                stockCode: variationState?.modelCode,
                                                quantity: stateProduct.quantity,
                                                price:
                                                    variationState.attributes[0].discountPrice !== 0 && variationState.attributes[0].discountPrice
                                                        ? variationState.attributes[0].discountPrice
                                                        : variationState.attributes[0].price,
                                            }
                                        )*/
                                        dispatch(
                                            addToCart({
                                                id: product.id,
                                                name: product.name,
                                                category1: "digital-fashion",
                                                category2: "Digital Fashion",
                                                color: stateProduct.color,
                                                image: variationState?.images[0],
                                                size: stateProduct.size,
                                                stockSizeId: variationState?.id,
                                                stockCode: variationState?.modelCode,
                                                quantity: stateProduct.quantity,
                                                price:
                                                    variationState.attributes[0].discountPrice !== 0 && variationState.attributes[0].discountPrice
                                                        ? variationState.attributes[0].discountPrice
                                                        : variationState.attributes[0].price,
                                            }),
                                        );
                                        dispatch(
                                            addToCartNotification({
                                                productName: product.name,
                                                count: stateProduct.quantity,
                                                stockCode: variationState?.modelCode,
                                                userName: session?.user.name
                                                    ? session?.user?.name
                                                    : "Guest",
                                            }),
                                        );
                                        toast.success(t("productDetail.productAddedCartSuccess"));
                                        openCart();
                                    }
                                }}
                                className={
                                    "!bg-secondary h-12 w-full md:w-9/12  !border-none !outline-0 flex justify-center rounded-lg text-xl text-white font-semibold  hover:opacity-85 hover:scale-105  !transition-all !duration-300 "
                                }
                            >
                                {t("productDetail.productAddCart")}
                            </Button>

                            {/*<button
                                onClick={handleAddToFav}
                                className="w-full md:w-4/12 text-white flex justify-center items-center gap-2 y h-10 md:h-12 rounded-lg bg-red-400 hover:scale-105 hover:opacity-85 transition duration-300"
                            >
                                <FaHeart className="text-white" />
                                <span className={"text-sm font-bold"}>Favorilere Ekle</span>
                            </button>*/}
                        </div>

                        <OrderButtons
                            productName={product?.name}
                            productLink={product?.slug}
                            productColor={stateProduct?.color}
                            productSize={stateProduct?.size}
                        />
                    </div>

                    <div className="w-full flex  justify-center items-center">
                        <ShareButtons
                            shareUrl={`product/` + product?.slug}
                            title={product?.name}
                            imageUrl={product?.variations[0].images[0]}
                            description={product?.description}
                        />
                    </div>
                </div>
                <Lightbox
                    open={isModalOpen}
                    plugins={[Zoom]}
                    close={() => toggleOpen()}
                    index={photoIndex}
                    zoom={{
                        maxZoomPixelRatio: 3,
                        zoomInMultiplier: 2,
                        doubleTapDelay: 300,
                    }}
                    slides={variationState?.images?.map((img) => ({
                        src: `${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`,
                    }))}
                    on={{ view: updateIndex }}
                    animation={{ fade: 0 }}
                    controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
                    styles={{
                        container: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                    }}
                />
           </div>
        </div>
    );
}

export default Page;