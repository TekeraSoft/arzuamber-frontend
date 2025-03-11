"use client";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import PageContainer from "../Containers/PageContainer";
import { Product } from "@/types";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addToCart } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { CustomLeftArrow, CustomRightArrow } from "./utils/CustomArrows";
import NextSeoHead from "../utils/NextSeoHead";
import ShareButtons from "../utils/ShareButtons";
import { openCartModal } from "@/store/modalsSlice";

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
  const t = useTranslations();

  const [stockSizeState, setStockSizeState] = useState(product.colorSize[0]);
  const [errorState, setErrorState] = useState({
    sizeError: false,
    colorError: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lineClamp, setLineClamp] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(1);
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
    color: stockSizeState.color,
    totalStock: "",
    stockSizeId: "",
    price: "",
    quantity: 1,
  });

  const toggleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateIndex = ({ index: current }: { index: number }) => {
    setPhotoIndex(current);
  };

  const toggleClamp = () => {
    setLineClamp(!lineClamp);
  };

  const openCart = () => {
    dispatch(openCartModal());
  };

  return (
    <div className="container mx-auto md:mt-24 ">
      <NextSeoHead
        name={product.name}
        description={product.description}
        image={product.colorSize[0].images[0]}
      />

      <div className="flex flex-col lg:flex-row md:gap-x-7 justify-center items-start md:items-center lg:items-start  md:rounded-lg w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}

        <h3 className=" md:hidden text-start text-lg font-semibold text-secondaryDark  overflow-hidden text-ellipsis whitespace-nowrap w-full mt-7 mb-5 ">
          {product.name}
        </h3>

        <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-3/6 h-[520px] md:h-full ">
          <div className="hidden  w-full md:w-1/6 xs:grid grid-cols-6  md:flex  flex-col max-h-34  gap-1 ">
            {stockSizeState?.images?.map((img, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-full h-full"
              >
                <Image
                  className=" w-full h-full object-cover rounded-lg "
                  onClick={() => {
                    setPhotoIndex(0);
                    setIsModalOpen(true);
                  }}
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`}
                  alt={product.name}
                  width={500}
                  height={700}
                  priority
                />
              </div>
            ))}
          </div>
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            // slidesPerView={1}
            autoPlaySpeed={3000}
            transitionDuration={500}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            className="w-full rounded-lg h-full"
          >
            {stockSizeState?.images?.map((img, index) => (
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
                  width={500}
                  height={700}
                  priority
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div
          className={
            "md:hidden flex  flex-col justify-center items-start gap-2  my-3 w-full "
          }
        >
          <div className="flex justify-center items-center gap-2">
            <h4 className="text-lg text-secondaryDark font-semibold my-1 after:content-[':']">
              {t("productDetail.color")}
            </h4>
            <span className="w-full first-letter:uppercase text-center text-white bg-secondary px-2  py-0.5 rounded-lg font-normal text-sm">
              {stockSizeState.color}
            </span>
          </div>

          <div className={"flex flex-row flex-wrap gap-4 w-full"}>
            {product.colorSize.map((item, index) => (
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setStockSizeState(item);
                  setStateProduct({
                    size: "",
                    color: item.color,
                    totalStock: 0,
                    stockSizeId: "",
                    price: 0,
                    quantity: 1,
                  });
                }}
                key={index}
                className={`  ${
                  stockSizeState?.color === item.color
                    ? "border-2 border-secondary  rounded"
                    : " border border-secondary "
                } flex flex-col items-center  justify-center p-0.5  w-16 `}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                  width={56}
                  height={15}
                  alt={item.images[0]}
                  className="border border-gray-400  "
                />
              </button>
            ))}
          </div>
        </div>

        <div className=" w-full md:w-3/6 mt-6  lg:mt-0 flex flex-col gap-4  border-secondary h-full px-1 rounded-lg min-h-[800px] ">
          <div className="w-full flex flex-col  justify-between items-start  gap-2">
            <h3 className=" hidden md:flex text-xl md:text-2xl font-semibold text-secondaryDark  overflow-hidden text-ellipsis whitespace-nowrap w-full">
              {product.name}
            </h3>
            <p className="bg-secondary text-sm flex justify-center items-start text-mywhite px-2 py-1 rounded-md  w-1/2">
              {t("productDetail.stockCode")} {stockSizeState.stockCode}
            </p>
          </div>

          <div className="w-full flex  items-start justify-between gap-x-1">
            <span className={"flex flex-col gap-x-4 "}>
              {product.discountPrice !== 0 &&
                product.discountPrice !== product.price && (
                  <p
                    className={
                      "  md:text-xl text-red-600 line-through font-semibold"
                    }
                  >
                    {product.price.toLocaleString("tr-TR", {
                      style: "currency",
                      currency: "TRY",
                    })}{" "}
                  </p>
                )}
              {product.discountPrice !== 0 ? (
                <p className={"  md:text-xl font-semibold text-green-600"}>
                  {product.discountPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}
                </p>
              ) : (
                <p className={"md:text-xl font-semibold text-secondaryDark"}>
                  {product.price.toLocaleString("tr-TR", {
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

          <div className="w-full flex flex-col justify-center items-start gap-3 py-4">
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-sm font-semibold text-mywhite bg-secondary text-center rounded-lg py-2 px-4 overflow-hidden text-ellipsis whitespace-nowrap">
                {t("productDetail.productCategory")}: {product.category}
              </div>

              {product.length && (
                <div className="text-center text-sm font-semibold text-mywhite bg-secondary rounded-lg py-2 px-4 overflow-hidden text-ellipsis whitespace-nowrap">
                  {t("productDetail.length")}: {product.length}
                </div>
              )}

              {product.newSeason && (
                <div className="text-sm font-semibold text-mywhite bg-secondary text-center rounded-lg py-2 px-4 overflow-hidden text-ellipsis whitespace-nowrap">
                  {t("productDetail.newSeason")}
                </div>
              )}
            </div>
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
                {stockSizeState.color}
              </span>
            </div>

            <div className={"flex flex-row flex-wrap gap-4 w-full"}>
              {product.colorSize.map((item, index) => (
                <button
                  onClick={() => {
                    setStockSizeState(item);
                    setStateProduct({
                      size: "",
                      color: item.color,
                      totalStock: 0,
                      stockSizeId: "",
                      price: 0,
                      quantity: 1,
                    });
                  }}
                  key={index}
                  className={`  ${
                    stockSizeState?.color === item.color
                      ? "border-2 border-secondary  rounded"
                      : " border border-secondary "
                  } flex flex-col items-center  justify-center p-0.5  w-16 `}
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
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
                {stockSizeState?.stockSize.map((item, index) =>
                  item.stock === 0 ? (
                    <button
                      key={index}
                      className={
                        "bg-mywhite cursor-not-allowed text-red-600 border border-secondary line-through rounded-lg opacity-45 min-w-6 h-7  px-2"
                      }
                      disabled={item.stock === 0}
                    >
                      {item.size}
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setStateProduct({
                          ...stateProduct,
                          stockSizeId: item.id,
                          totalStock: item.stock,
                          size: item.size,
                          quantity: 1,
                        });
                        setErrorState({ ...errorState, sizeError: false });
                      }}
                      key={index}
                      className={`${
                        stateProduct.size === item.size
                          ? "bg-secondary text-mywhite  border-none outline-double outline-secondary"
                          : "bg-mywhite text-secondary border border-secondary"
                      }  rounded-md min-w-6 h-7  px-2`}
                    >
                      {item.size}
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

          <p className="text-lg text-secondaryDark font-semibold my-2">
            {t("productDetail.quantity")}:
          </p>
          <span className="py-3 px-4 flex w-64 gap-x-8 flex-row items-center justify-between border border-secondary rounded">
            {/* Azaltma butonu */}
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

            {/* Miktar */}
            <p className="text-xl font-semibold">{stateProduct?.quantity}</p>

            {/* Arttırma butonu */}
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

          <div className="flex justify-start items-center gap-2 h-12">
            <button
              onClick={() => {
                if (!stateProduct.size) {
                  setErrorState({ ...errorState, sizeError: true });
                  toast.error(t("productDetail.sizeError"));
                } else {
                  dispatch(
                    addToCart({
                      id: product.id,
                      name: product.name,
                      category1: product.category,
                      category2: product.subCategory,
                      color: stateProduct.color,
                      image: stockSizeState?.images[0],
                      size: stateProduct.size,
                      stockSizeId: stateProduct?.stockSizeId,
                      stockCode: stockSizeState?.stockCode,
                      quantity: stateProduct.quantity,
                      price:
                        product.discountPrice !== 0 && product.discountPrice
                          ? product.discountPrice
                          : product.price,
                    })
                  );
                  toast.success(t("productDetail.productAddedCartSuccess"));
                  openCart();
                }
              }}
              className={
                "bg-secondary h-12 w-3/4 rounded-lg text-xl text-white font-semibold  hover:opacity-85  transition-all duration-300"
              }
            >
              {t("productDetail.productAddCart")}
            </button>
          </div>

          <div className="w-full flex  justify-center items-center">
            <ShareButtons
              shareUrl={`product/` + product.slug}
              title={product.name}
              imageUrl={product.colorSize[0].images[0]}
              description={product.description}
            />
          </div>

          <div className="mt-2">
            <div className="col-span-full sm:col-span-2 lg:col-span-3">
              <h3 className="text-xl text-secondary font-semibold">
                {t("productDetail.productDescription")}:
              </h3>
            </div>
            <p
              className={`text-secondary text-base ${
                lineClamp ? "line-clamp-3" : "line-clamp-none"
              }`}
            >
              {product.description}
            </p>
            {product.description.length > 250 && (
              <button
                onClick={toggleClamp}
                className="text-secondary font-semibold text-end mt-1 hover:underline"
              >
                {lineClamp
                  ? t("productDetail.readMore")
                  : t("productDetail.readLess")}
              </button>
            )}
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
          slides={stockSizeState?.images?.map((img) => ({
            src: `${process.env.NEXT_PUBLIC_RESOURCE_API}${img}`,
          }))}
          on={{ view: updateIndex }}
          animation={{ fade: 0 }}
          controller={{ closeOnPullDown: true, closeOnBackdropClick: true }}
        />
      </div>
    </div>
  );
};

export default DetailClient;
