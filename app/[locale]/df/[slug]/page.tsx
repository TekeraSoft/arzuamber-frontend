"use client"
import "yet-another-react-lightbox/styles.css";
import React, {useEffect, useRef, useState} from 'react';
import {useParams} from "next/navigation";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import {CustomLeftArrow, CustomRightArrow} from "@/components/productDetail/utils/CustomArrows";
import Loading from "@/components/utils/Loading";
import PaymentShippingCards from "@/components/productDetail/utils/PaymentShippingCards";
import { FaMinus, FaPlus } from "react-icons/fa";
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
import Tabs from '@/components/productDetail/utils/ProductTabs/Tabs';
import QRCode from "react-qr-code";
import {Skeleton} from "primereact/skeleton";
import DfSharedButton from "@/components/productDetail/utils/DfSharedButton";
import {usePathname} from "@/i18n/routing";

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
    const pathName = usePathname();
    const dispatch = useDispatch()
    const t = useTranslations();
    const [product,setProduct] = useState()
    const [photoIndex,setPhotoIndex] = useState(0)
    const [loading,setLoading] = useState(false)
    const [variationState,setVariationState] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [findPrice, setFindPrice] = useState({price:0,discountPrice:0})
    const [targetPicture,setTargetPicture] = useState();
    const [qrValue, setQrValue] = useState()
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
        color: variationState?.color,
        totalStock: "",
        stockSizeId: "",
        price: "",
        quantity: 1,
    });

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

    useEffect(() => {
        const fetchTargetPic = async () => {
            if (product?.id) { // Only fetch if product.id exists
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_TEKERA_API_GET_TARGET_PIC}?productId=${product.id}`);
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const json = await response.json();
                    console.log(json)
                    setTargetPicture(json);
                    setQrValue(`${process.env.NEXT_PUBLIC_AR_BASE_URL}?id=${json.id}`)
                } catch (error) {
                    console.error("Failed to fetch target picture:", error);
                    // Optionally show a toast here if this is critical
                }
            }
        };

        fetchTargetPic();
    }, [product?.id]);

    useEffect(() => {
        if (product?.variations?.length > 0) {
            const initialVariation = product.variations[0];
            setVariationState(initialVariation);
            // Ensure attributes exist before trying to access them
            if (initialVariation.attributes && initialVariation.attributes.length > 0) {
                setFindPrice({
                    price: initialVariation.attributes[0].price,
                    discountPrice: initialVariation.attributes[0].discountPrice
                });
                setStateProduct(prevState => ({
                    ...prevState,
                    color: initialVariation.color || "",
                    price: initialVariation.attributes[0].price, // Set initial price
                    totalStock: initialVariation.attributes[0].stock, // Set initial stock
                    stockSizeId: initialVariation.attributes[0].id // Set initial stockSizeId
                }));
            }
        }
    }, [product]);

    const toggleOpen = () => {
        setIsModalOpen(!isModalOpen);
    };

    const openCart = () => {
        dispatch(openCartModal());
    };

    const updateIndex = ({ index: current }: { index: number }) => {
        setPhotoIndex(current);
    };

    const carouselRef = useRef<any>(null);


       if(loading) {
        return <Loading />
    }

    return (
        <div className=" md:container md:mx-auto flex flex-col gap-3 mt-10 md:mt-12 lg:mt-5  ">

            <div className="container mx-auto flex flex-col lg:flex-row md:gap-x-2 justify-center items-start
                md:items-center lg:items-start  md:rounded-lg w-full h-full ">
                {/* Image Section with Carousel */}
              <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-4/6 lg:w-3/6 md:h-full relative">
                  <div className="hidden md:flex flex-col items-start space-y-2 w-full md:w-1/6">
                      {variationState?.images?.map((img, index) => (
                          <div
                              key={index}
                              onClick={() => {
                                  setPhotoIndex(index); // bu index, Carousel'e gidecek
                                  carouselRef.current?.goToSlide(index); // burası çalışmalı
                              }}
                              className="w-full h-auto cursor-pointer"
                          >
                              <img
                                  className="w-full h-auto object-cover rounded-lg"
                                  src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${img}`}
                                  alt={`${img}`}
                              />
                          </div>
                      ))}
                      {
                          product?.videoUrl && (
                              <video
                                  className="w-full h-auto object-cover rounded-lg"
                                  controls       // kullanıcıya play/pause verecek
                                  preload="metadata"
                              >
                                  <source
                                      src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${product?.videoUrl}`}
                                      type="video/mp4"
                                  />
                                  Tarayıcınız video etiketini desteklemiyor.
                              </video>
                          )
                      }
                  </div>
                  {variationState?.images?.length > 0 && (
                      <Carousel
                          responsive={responsive}
                          infinite
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
                          {variationState?.images?.length === 0 || loading ? (
                              <div className="flex justify-center items-center w-full h-full rounded-lg">
                                  <Skeleton className="w-full min-h-[750px]" />
                              </div>
                          ) : (
                              variationState?.images?.map((img, index) => (
                                  <div
                                      key={index}
                                      className="flex justify-center items-center w-full h-full rounded-lg"
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
                          )}
                          {
                              product?.videoUrl && (
                                  <video
                                      className="w-full h-full object-cover rounded-lg"
                                      controls       // kullanıcıya play/pause verecek
                                      preload="metadata"
                                  >
                                      <source
                                          src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}/${product?.videoUrl}`}
                                          type="video/mp4"
                                      />
                                      Tarayıcınız video etiketini desteklemiyor.
                                  </video>
                              )
                          }
                      </Carousel>
                  )}
                  {qrValue && (
                      <div className={'hidden md:flex flex-col z-30 gap-y-4 items-center justify-center pb-4 absolute bottom-0 right-0'}>
                          <QRCode
                              size={256}
                              style={{ height: "auto", maxWidth: "120px", width: "100%" }}
                              value={qrValue}
                              viewBox={`0 0 256 256`}
                          />
                          <button className={''}>Ürün videosunu oynat !</button>
                      </div>
                  )}
               </div>
                {qrValue && (
                    <div className={'md:hidden flex flex-col z-30 gap-y-4 w-full items-center justify-center mt-4 pb-4'}>
                        <QRCode
                            size={150}
                            style={{ height: "auto", maxWidth: "120px", width: "100%" }}
                            value={qrValue}
                            viewBox={`0 0 256 256`}
                        />
                        <button className={''}>Ürün videosunu oynat !</button>
                    </div>
                )}
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
              {variationState?.color}
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
                                        color: item?.color,
                                        stock: 0,
                                        variationId: "",
                                        price: 0,
                                        quantity: 1,
                                    });
                                }}
                                key={index}
                                className={`${
                                    variationState?.color === item?.color
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
              {findPrice.discountPrice !== 0 &&
              findPrice.discountPrice !== findPrice.price && findPrice.discountPrice !== null && (
                      <p
                          className={
                              "  md:text-xl text-red-600 line-through font-semibold"
                          }
                      >
                          {findPrice.price.toLocaleString("tr-TR", {
                              style: "currency",
                              currency: "TRY",
                          })}{" "}
                      </p>
                  )}
                {findPrice.discountPrice !== 0 ? (
                    <p className={"  md:text-xl font-semibold text-green-600"}>
                        {findPrice.discountPrice.toLocaleString("tr-TR", {
                            style: "currency",
                            currency: "TRY",
                        })}
                    </p>
                ) : (
                    <p className={"md:text-xl font-semibold text-secondaryDark"}>
                        {findPrice.price.toLocaleString("tr-TR", {
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
                {variationState?.color}
              </span>
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 w-full">
                             {product?.variations.map((item, index) => (
                                 <button
                                   onClick={() => {
                                     setVariationState(item);
                                     setStateProduct({
                                       modelCode: "",
                                       color: item?.color || "",
                                       stock: 0,
                                       variationId: "",
                                       price: 0,
                                       quantity: 1,
                                     });
                                   }}
                                   key={`${index}-${index}`}
                                   className={`${
                                     variationState?.color === item?.color
                                       ? "border-2 border-secondary rounded"
                                       : "border border-secondary"
                                   } flex flex-col items-center justify-center p-0.5 w-16`}
                                 >
                                   <Image
                                     src={`${process.env.NEXT_PUBLIC_DF_RESOURCE_URI}${item.images[0]}`}
                                     width={56}
                                     height={56}
                                     alt="product variation image"
                                     className="border border-gray-400"
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
                            <div className={"flex flex-row flex-wrap gap-4 "}>
                               {variationState?.attributes
                                     .filter((item, index, self) =>
                                       self.findIndex(
                                         a => a.attributeDetails.find(attr => attr.key === "size")?.value ===
                                              item.attributeDetails.find(attr => attr.key === "size")?.value
                                       ) === index
                                     )
                                     .map((item, index) =>
                                       item.stock === 0 ? (
                                         <button
                                           key={index}
                                           className="bg-mywhite cursor-not-allowed text-red-600 border border-secondary line-through rounded-lg opacity-45 min-w-6 h-7 px-2"
                                           disabled
                                         >
                                           {item.attributeDetails.find(s => s.key === "size")?.value}
                                         </button>
                                       ) : (
                                         <button
                                           onClick={() => {
                                             setStateProduct({
                                               ...stateProduct,
                                               stockSizeId: item.id,
                                               totalStock: item.stock,
                                               size: item.attributeDetails?.find(a => a.key === "size")?.value,
                                               quantity: 1,
                                             });
                                             setFindPrice({price: item.price,discountPrice:item.discountPrice})
                                             setErrorState({ ...errorState, sizeError: false });
                                           }}
                                           key={index}
                                           className={`${
                                             stateProduct.size === item.attributeDetails?.find(a => a.key === "size")?.value
                                               ? "bg-secondary text-mywhite border-none outline-double outline-secondary"
                                               : "bg-mywhite text-secondary border border-secondary"
                                           } rounded-md min-w-6 h-7 px-2`}
                                         >
                                           {item.attributeDetails.find(s => s.key === "size")?.value}
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
                                                    findPrice.discountPrice !== 0 && findPrice.discountPrice
                                                        ? findPrice.discountPrice
                                                        : findPrice.price,
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
                            pathName={pathName}
                            productName={product?.name}
                            productLink={product?.slug}
                            productColor={stateProduct?.color}
                            productSize={stateProduct?.size}
                        />
                    </div>

                    <div className="w-full flex  justify-center items-center">
                        <DfSharedButton
                            shareUrl={product?.slug}
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
            {
        <Tabs
          description={product?.description}
          productId={product?.id}
          //productComments={product?.comments}
        />
      }
        </div>
    );
}

export default Page;