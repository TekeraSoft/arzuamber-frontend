"use client";

import Image from "next/image";
import Counter from "../general/Counter";
import { useEffect, useState } from "react";
import Button from "../general/Button";
// import Comment from "./Comment";
// import Heading from "../general/Heading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartItem, removeFromCart } from "@/store/cartSlice";
import { RootState } from "../../store/store";
import Rating from "@mui/material/Rating";
import Carousel, { ArrowProps } from "react-multi-carousel";
import TextClip from "../utils/TextClip";
import { IoShareSocialSharp } from "react-icons/io5";
import { Snackbar, SnackbarContent } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import PageContainer from "../Containers/PageContainer";
import { addToFav, FavItem, removeFromFav } from "@/store/favoritesSlice";
import { toast } from "react-toastify";
import { CardProductProps, Product, Review } from "@/types/Props";
import { useTranslations } from "next-intl";
import ColorPicker from "../general/ColorPicker";
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
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cart.carts);
  const favs = useSelector((state: RootState) => state.favorites.favs);
  const t = useTranslations();

  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const [displayFav, setDisplayFav] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<{ name: string } | null>(
    null
  );

  const [cardProduct, setcardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    discountPercent: product.discountPercent,
    quantity: 1,
    image: product.images[0],
    inStock: product.inStock,
    size: selectedSize,
    color: selectedColor ? selectedColor.name : "",
  });

  console.log(selectedSize);

  const increaseFunc = () => {
    if (cardProduct.quantity === 10) return;
    setcardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const descreaseFunc = () => {
    if (cardProduct.quantity === 1) return;
    setcardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  const addToBasket = () => {
    if (!selectedSize) {
      return toast.error(t("productDetail.sizeError"));
    }

    if (!selectedColor) {
      return toast.error(t("productDetail.sizeError"));
    }

    const cartData = {
      id: product?.id,
      name: product?.name,
      image: product.images[0],
      price: product?.price,
      discountPercent: product.discountPercent,
      quantity: cardProduct?.quantity,
      description: product?.description || "No description",
      inStock: product?.inStock || false,
      size: selectedSize,
      color: selectedColor?.name,
    };
    console.log(cartData);
    toast.success(t("productDetail.productAddedCartSuccess"));
    dispatch(addToCart(cartData));
  };

  console.log(selectedColor?.name);

  const removeToBasket = (id: string) => {
    dispatch(removeFromCart(id));
    toast.warning(t("productDetail.productRemovedCart"));
  };

  const removeToFav = (id: string) => {
    dispatch(removeFromFav(id));
    toast.warning(t("productDetail.productRemovedFav"));
  };

  const AddToFav = () => {
    if (!selectedSize) {
      return toast.error(t("productDetail.colorError"));
    }

    const favData = {
      id: product?.id,
      name: product?.name,
      image: product.images[0],
      price: product?.price,
      quantity: cardProduct?.quantity,
      discountPercent: product.discountPercent,
      description: product?.description || "No description",
      inStock: product?.inStock || false,
      size: selectedSize,
      color: cardProduct?.color,
    };

    console.log(favData);

    toast.success(t("productDetail.productAddedFavSuccess"));
    dispatch(addToFav(favData));
  };

  // Cart ve Fav kontrolü için ortak useEffect
  useEffect(() => {
    const isProductInCart = carts.some(
      (cart: CartItem) => cart.id === product.id
    );
    const isProductInFav = favs.some((fav: FavItem) => fav.id === product.id);

    // Stok kontrolü: sepete eklemeyi etkiler ama favoriyi etkilemez
    if (product.inStock === false) {
      setDisplayButton(false); // Sepet butonunu devre dışı bırak
    } else {
      setDisplayButton(isProductInCart); // Stok varsa ve ürün sepette varsa, butonu göster
    }

    setDisplayFav(isProductInFav); // Favori butonu, stok durumu ile bağımsız çalışmalı
  }, [carts, favs, product.id, product.inStock]);

  // Ürün indirim oranını hesaplama
  const discountPercent = product.discountPercent || 0;
  const discountedPrice = (product.price * (1 - discountPercent / 100)).toFixed(
    2
  );

  // Rating hesaplama
  const productRating =
    product?.reviews && product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: Review) => acc + (item.rating || 0),
          0
        ) / product.reviews.length
      : 0;

  const ratingResult = isNaN(productRating) ? 0 : productRating;

  const [open, setOpen] = useState(false);

  // line clamp state
  const [lineClamp, setLineClamp] = useState<boolean>(true);
  const handleClamp = () => {
    setLineClamp(!lineClamp);
  };

  // copy link func
  const copyPath = () => {
    const productUrl = window.location.href;
    navigator.clipboard
      .writeText(productUrl)
      .then(() => {
        setOpen(true);
      })
      .catch((err) => {
        if (err) {
          return toast.error("The link could not be copied.");
          // return toast.error(t("SnackBar.coypLinkUnsuccess"));
        }
      });
  };

  // more details func
  const handleClose = () => {
    setOpen(false);
  };

  // sizes select func
  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  // color select func
  const handleColorSelect = (color: string) => {
    setSelectedColor({ name: color }); // Doğru şekilde nesne olarak atandı
  };

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
      <div className="flex flex-col lg:flex-row  justify-center items-start md:items-center lg:items-start gap-8 p-8  md:rounded-lg  mb-10 w-full h-full border-y md:border-none">
        {/* Image Section with Carousel */}
        <div className=" w-full md:w-1/2 h-[300px]  md:h-[700px] relative">
          <Carousel
            responsive={responsive}
            infinite
            autoPlay
            autoPlaySpeed={3000}
            transitionDuration={500}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {product.images.map((img, index) => (
              <div
                key={index}
                className=" w-full h-[300px]  md:h-[700px]  relative "
              >
                <Image
                  className="object-contain absolute "
                  src={img}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-2">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 w-full ">
              {/* Product Name*/}
              <h1 className=" capitalize  text-4xl lg:text-3xl font-serif font-extrabold text-secondaryDark text-center">
                {TextClip(product.name)}
              </h1>

              {/* Rating */}
              <Rating
                name="read-only"
                value={ratingResult}
                precision={0.5}
                readOnly
                size="large"
              />
            </div>
          </div>
          <hr className="w-full bg-secondary" />

          {/* price and category */}
          <div className="flex flex-col justify-center items-start w-full gap-4 md:gap-2">
            <div className="w-full flex flex-col md:flex-row gap-3">
              {/* Price Section */}
              <div className="w-full md:w-2/4 font-semibold text-primary border rounded-lg px-3 py-1 border-myblack">
                {discountPercent > 0 ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className="text-myblack text-md md:text-2xl">
                      {discountedPrice}₺
                    </span>
                    <span className="line-through text-red-500 text-xs md:text-sm">
                      {product.price.toFixed(2)}{" "}
                      {t("productDetail.priceSymbol")}
                    </span>
                  </div>
                ) : (
                  <span>
                    {product.price.toFixed(2)} {t("productDetail.priceSymbol")}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`w-full md:w-2/4 flex items-center justify-center text-sm md:text-lg  px-2 py-2 rounded-lg  ${
                  product.inStock
                    ? "bg-primary text-mywhite"
                    : "bg-transparent text-myblack border border-secondary "
                }`}
              >
                {product.inStock ? (
                  <p>{t("productDetail.productİnStock")}</p>
                ) : (
                  <p>{t("productDetail.productOutStock")}</p>
                )}
              </div>
            </div>

            {/* Category and Subcategory */}
            <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3">
              {/* Category Section */}
              <div className="w-full flex items-center justify-center gap-2 text-md font-medium p-1 md:p-2 rounded-lg text-white bg-transparent border border-secondary">
                <span className="text-xs text-black font-semibold md:text-base tracking-wide">
                  {t("productDetail.productCategory")}:
                </span>
                <span className="bg-white text-primary px-2 md:px-2 md:py-1 rounded-md shadow-sm text-xs ">
                  {product.category}
                </span>
                <span className="text-myblack">/</span>
                <span className="bg-white text-primary px-2 md:px-2 md:py-1 rounded-md shadow-sm text-xs">
                  {product.subcategories}
                </span>
              </div>

              {/* Length Section */}
              <div className="w-full flex items-center justify-center gap-2 text-md font-medium p-2 md:p-2 rounded-lg text-white border  border-secondary">
                <span className="bg-transparent  text-myblack  w-1/2 text-center px-1 md:px-2  rounded-md shadow-sm text-sm md:text-lg ">
                  {product.length}
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <p
              className={`font-sans text-gray-700 text-xs md:text-sm leading-relaxed ${
                lineClamp ? "line-clamp-4" : ""
              }`}
            >
              {product.description}
            </p>
            <span
              onClick={handleClamp}
              className="w-full mt-1 text-primary text-sm md:text-md font-bold cursor-pointer  hover:underline text-end no-underline"
            >
              {lineClamp
                ? t("productDetail.readMore")
                : t("productDetail.readLess")}
            </span>
          </div>

          <hr className="w-full bg-secondary" />

          <div className="w-full flex items-center justify-center flex-col md:flex-row gap-5  md:gap-3">
            <div className="w-full flex justify-center items-center ">
              <ColorPicker
                colors={product.colors}
                onColorSelect={handleColorSelect}
                selectedColor={selectedColor}
              />
            </div>

            <div className=" w-full flex justify-center items-center flex-wrap gap-3">
              {product.sizes.map((size, i) => (
                <Button
                  key={i}
                  onClick={() => handleSizeSelect(size)}
                  outline={size !== selectedSize}
                  color={size === selectedSize ? "primary" : "secondary"}
                  animation
                  size="icon"
                  text={`${size}`}
                  disabled={displayFav}
                />
              ))}
            </div>
          </div>

          <hr className="w-full bg-secondary" />

          {/* Counter and Add to Cart Button */}
          <div className="w-full flex justify-between  md:justify-center  items-center gap-4 flex-wrap ">
            <div className="w-full flex flex-col md:flex-row  justify-center items-center gap-10 lg:gap-10 ">
              <div className=" w-1/4">
                <Counter
                  increaseFunc={increaseFunc}
                  descreaseFunc={descreaseFunc}
                  cardProduct={cardProduct}
                />
              </div>
              <div className="w-3/4">
                {displayButton ? (
                  <Button
                    disabled={!displayButton}
                    onClick={() => removeToBasket(product.id)}
                    text={t("productDetail.productInCart")}
                    outline={!product.inStock}
                    color="secondary"
                    size="large"
                  />
                ) : (
                  <>
                    <Button
                      disabled={!product.inStock}
                      onClick={addToBasket}
                      text={
                        product.inStock
                          ? t("productDetail.productAddCart")
                          : t("productDetail.productOutStock")
                      }
                      outline={!product.inStock}
                      color="primary"
                      size="large"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="w-full flex justify-center md:justify-end items-center gap-4">
              {displayFav ? (
                <>
                  <Button
                    disabled={!displayFav}
                    onClick={() => removeToFav(product.id)}
                    outline={displayFav}
                    color="primary"
                    icon={FaHeart}
                    size="icon"
                    animation={!displayFav}
                  />
                </>
              ) : (
                <>
                  <Button
                    disabled={displayFav}
                    onClick={AddToFav}
                    outline={displayFav}
                    color="primary"
                    icon={FaHeart}
                    size="icon"
                    animation={!displayFav}
                  />
                </>
              )}

              <Button
                onClick={copyPath}
                color="primary"
                size="icon"
                icon={IoShareSocialSharp}
                iconSize={25}
                animation
              />

              <Snackbar
                open={open}
                autoHideDuration={1500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <SnackbarContent
                  message=" Share Link Copied ✓ "
                  // message={t("  SnackBar.coypLinkSuccess")}
                  sx={{
                    backgroundColor: "#8174A0",
                    color: "white",
                  }}
                />
              </Snackbar>
            </div>
          </div>
        </div>
      </div>
      {/* 
      <Heading text="Reviews" center textSize="3xl" hr /> */}

      {/* Reviews Section */}
      {/* <div className=" flex flex-col justify-center items-center mb-5">
        {product?.reviews?.map((prd: Review) => (
          <Comment key={prd.id} prd={prd} />
        ))}
      </div> */}
    </PageContainer>
  );
};

export default DetailClient;
