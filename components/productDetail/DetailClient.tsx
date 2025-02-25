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
import { IoMdShare } from "react-icons/io";

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

  console.log(stateProduct);
  const toggleOpen = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateIndex = ({ index: current }: { index: number }) => {
    setPhotoIndex(current);
  };

  const toggleClamp = () => {
    setLineClamp(!lineClamp);
  };

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    // URL'yi kopyalama
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      toast.success(t("SnackBar.coypLinkSuccess"));
    });
  };

  return (
    <PageContainer>
      <div className="flex flex-col lg:flex-row md:gap-x-7 justify-center items-start md:items-center lg:items-start  md:rounded-lg w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}
        <div className=" flex flex-col-reverse md:flex-row gap-2 w-full md:w-3/6">
          <div className="w-full md:w-1/6 grid grid-cols-3  md:flex  flex-col  gap-1 ">
            {stockSizeState?.images?.map((img, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-full h-32 "
              >
                <Image
                  className="cursor-zoom-in w-full h-full object-cover rounded-lg "
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
            className="w-full"
          >
            {stockSizeState?.images?.map((img, index) => (
              <div
                key={index}
                className="flex justify-center items-center w-full h-[800px]"
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
        <div className=" w-full md:w-3/6 mt-6  lg:mt-0 flex flex-col gap-3  border-secondary h-full px-1 rounded-lg min-h-[800px]">
          <div className=" w-full flex flex-col lg:flex-row justify-between items-start lg:items-center   ">
            <h3 className={"text-2xl font-semibold text-secondaryDark"}>
              {product.name}
            </h3>
            <p className="bg-secondary text-sm flex justify-center items-start text-mywhite px-2 rounded-md">
              {t("productDetail.stockCode")} {stockSizeState.stockCode}
            </p>
          </div>
          <div className="w-full flex  justify-between gap-x-1">
            <span className={"flex flex-col gap-x-4 "}>
              {product.discountPrice !== 0 && (
                <p
                  className={"text-xl text-red-600 line-through font-semibold"}
                >
                  {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                  ₺
                </p>
              )}
              {product.discountPrice !== 0 ? (
                <p className={"text-xl font-semibold text-green-600"}>
                  {product.discountPrice.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                  ₺
                </p>
              ) : (
                <p className={"text-xl font-semibold text-green-600"}>
                  {product.price.toLocaleString("tr-TR", {
                    style: "currency",
                    currency: "TRY",
                  })}{" "}
                  ₺
                </p>
              )}
            </span>
            <div className="text-xs font-semibold">
              {" "}
              {t("productDetail.KDV")}
            </div>
          </div>

          <div className="w-full flex flex-col justify-center items-start gap-1 py-1">
            <div className="w-full grid grid-cols-3 gap-2 md:gap-4 items-center">
              {product.newSeason && (
                <p className="text-sm text-mywhite bg-secondary text-center rounded-lg font-medium py-1">
                  {t("productDetail.newSeason")}
                </p>
              )}

              <div className="text-sm font-semibold text-mywhite bg-secondary text-center rounded-lg py-1">
                {t("productDetail.productCategory")}: {product.category}
              </div>

              <div className="text-center text-sm font-semibold text-mywhite bg-secondary rounded-lg py-1">
                {t("productDetail.length")}: {product.length}
              </div>
            </div>
          </div>

          <div className={"flex flex-col gap-2 "}>
            <h4 className={"text-lg text-secondaryDark font-semibold mb1"}>
              {t("productDetail.color")}
            </h4>
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
                      ? "border-2 border-secondary p-0.5 rounded"
                      : "rounded"
                  }`}
                >
                  <p className="text-xs first-letter:uppercase text-center text-white bg-secondary ">
                    {item.color}
                  </p>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${item.images[0]}`}
                    width={40}
                    height={60}
                    alt={item.images[0]}
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
              <div className={"flex flex-row flex-wrap gap-x-4 "}>
                {stockSizeState?.stockSize.map((item, index) => (
                  <button
                    onClick={() => {
                      setStateProduct({
                        ...stateProduct,
                        stockSizeId: item.id,
                        totalStock: item.stock,
                        size: item.size,
                      });
                      setErrorState({ ...errorState, sizeError: false });
                    }}
                    key={index}
                    className={`${
                      stateProduct.size === item.size
                        ? "bg-secondary text-mywhite  border-none outline-double outline-secondary"
                        : "bg-mywhite text-secondary border border-secondary"
                    }  rounded-lg px-2 py-1 `}
                  >
                    {item.size}
                  </button>
                ))}
              </div>
            </div>
            <small
              className={`${
                errorState.sizeError ? "text-red-600 font-semibold" : "hidden"
              } `}
            >
              {t("productDetail.sizeError")}*
            </small>
          </div>

          <p className="text-lg text-secondaryDark font-semibold my-2">
            {t("productDetail.quantity")}:
          </p>
          <span className="py-3 px-4 flex w-64 gap-x-8 flex-row items-center justify-between border border-secondary rounded">
            {stateProduct?.quantity <= 1 ? (
              <FaMinus
                className={`${
                  stateProduct.quantity <= 1 &&
                  "text-gray-300 cursor-not-allowed"
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
            <p className={"text-xl font-semibold"}>{stateProduct.quantity}</p>
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

          <div className="flex justify-start items-center gap-1 h-12">
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
                      quantity: stateProduct.quantity,
                      price:
                        product.discountPrice !== 0 && product.discountPrice
                          ? product.discountPrice
                          : product.price,
                    })
                  );
                  toast.success(t("productDetail.productAddedCartSuccess"));
                }
              }}
              className={
                "bg-secondary  p-2 w-64 rounded-lg text-xl text-white font-semibold"
              }
            >
              {t("productDetail.productAddCart")}
            </button>
            <div className="flex justify-start items-center w-3/4,  h-full gap-1">
              {/* Icon butonu */}
              <button
                onClick={copyToClipboard}
                className="bg-secondary  hover:scale-105 transition-all duration-300  !h-full !w-16 rounded-lg text-white flex items-center justify-center "
              >
                <IoMdShare size={22} />
              </button>
            </div>
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
    </PageContainer>
  );
};

export default DetailClient;
