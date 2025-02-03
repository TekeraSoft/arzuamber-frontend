"use client";

import Image from "next/image";
import Counter from "../general/Counter";
import { useEffect, useState } from "react";
import Button from "../general/Button";
import Comment from "./Comment";
import Heading from "../general/Heading";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, CartItem, removeFromCart } from "@/store/cartSlice";
import { RootState } from "../../store/store";
import Rating from "@mui/material/Rating";
import Carousel from "react-multi-carousel";
import TextClip from "../utils/TextClip";
import { IoShareSocialSharp } from "react-icons/io5";
import { Alert, Snackbar } from "@mui/material";
import { FaHeart } from "react-icons/fa";
import PageContainer from "../Containers/PageContainer";
import { addToFav, FavItem, removeFromFav } from "@/store/favoritesSlice";
import { toast } from "react-toastify";
import { CardProductProps, Product, Review } from "@/types/Props";
import { useTranslations } from "next-intl";

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

  const [cardProduct, setcardProduct] = useState<CardProductProps>({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    quantity: 1,
    image: product.images[0],
    inStock: product.inStock,
  });

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
      return toast.error("Please Select Size.");
      // return toast.error(t("productDetail.sizeError"));
    }
    const cartData = {
      id: product?.id,
      name: product?.name,
      image: product.images[0],
      price: product?.price,
      quantity: cardProduct?.quantity,
      description: product?.description || "No description",
      inStock: product?.inStock || false,
      size: selectedSize,
    };
    toast.success("Product Added.");
    // toast.success(t("productDetail.productAddedCartSuccess"));
    dispatch(addToCart(cartData));
  };

  const removeToBasket = (id: string) => {
    dispatch(removeFromCart(id));
    toast.warning(t("productDetail.productRemovedCart"));
  };

  const removeToFav = (id: string) => {
    dispatch(removeFromFav(id));
    // toast.warning(t("productDetail.productRemovedFav"));
  };

  const AddToFav = () => {
    if (!selectedSize) {
      return toast.error("Please Select Size.");
      // return toast.error(t("productDetail.sizeError"));
    }

    const favData = {
      id: product?.id,
      name: product?.name,
      image: product.images[0],
      price: product?.price,
      quantity: cardProduct?.quantity,
      description: product?.description || "No description",
      inStock: product?.inStock || false,
      size: selectedSize,
    };
    toast.success("Product Added Favorites.");
    // toast.success(t("productDetail.productAddedFavSuccess"));
    dispatch(addToFav(favData));
  };

  const [displayButton, setDisplayButton] = useState<boolean>(false);
  const [displayFav, setDisplayFav] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

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

  return (
    <PageContainer>
      <div className="detail-page-main-div  ">
        <div className="flex flex-col lg:flex-row  justify-center items-start md:items-center lg:items-start gap-8 p-8 bg-gray-50 md:rounded-lg md:shadow-xl mb-10 w-full h-full border-y md:border-none">
          {/* Image Section with Carousel */}
          <div className=" w-full md:w-1/2 h-[500px] relative">
            <Carousel
              responsive={responsive}
              infinite
              autoPlay
              autoPlaySpeed={3000}
              transitionDuration={500}
            >
              {product.images.map((img, index) => (
                <div key={index} className=" w-full h-[500px] relative ">
                  <Image
                    className="object-contain absolute"
                    src={img}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              ))}
            </Carousel>
            <div className="w-full h-full"></div>
          </div>

          {/* Product Details Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-6 items-center md:items-start text-center md:text-left">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-2">
              {/* Product Name*/}
              <h1 className=" capitalize  text-4xl lg:text-3xl font-serif font-extrabold text-secondaryDark text-center">
                {TextClip(product.name)}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 text-lg">
                <Rating
                  name="read-only"
                  value={ratingResult}
                  precision={0.5}
                  readOnly
                  size="large"
                />
              </div>
            </div>
            <hr className="w-full border-black" />

            {/* price and category */}
            <div className="flex flex-col md:flex-row flex-wrap justify-between items-center w-full gap-3">
              <div className="text-2xl font-semibold text-primary border  rounded-lg px-2 border-myblack">
                {discountPercent > 0 ? (
                  <div className="flex justify-center items-center gap-2">
                    <span className=" text-myblack text-4xl">
                      {discountedPrice}₺
                    </span>
                    <span className="line-through text-red-500 text-md">
                      {product.price.toFixed(2)}
                      {/* {t("productDetail.priceSymbol")} */}₺
                    </span>
                  </div>
                ) : (
                  <span>
                    {product.price.toFixed(2)}
                    {/* {t("productDetail.priceSymbol")} */}₺
                  </span>
                )}
              </div>

              <div className="flex items-center justify-start gap-2 text-md font-medium p-3 rounded-lg text-white bg-gradient-to-r from-secondary to-secondary ">
                <span className="font-bold text-lg tracking-wide">
                  Category:
                  {/* {t("productDetail.productCategory")}: */}
                </span>
                <span className="bg-white text-primary px-3 py-1 rounded-md shadow-sm font-semibold">
                  {product.category}
                </span>
                <span className="text-gray-200">/</span>
                <span className="bg-white text-primary px-3 py-1 rounded-md shadow-sm font-semibold">
                  {product.subcategories}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col">
              <p
                className={`font-sans text-gray-700 text-md leading-relaxed ${
                  lineClamp ? "line-clamp-4" : ""
                }`}
              >
                {product.description}
              </p>
              <span
                onClick={handleClamp}
                className="w-full mt-1 text-primary text-md font-bold cursor-pointer  hover:underline text-end no-underline"
              >
                {/* {lineClamp ? t("productDetail.readMore") : t("productDetail.readLess")} */}
                {lineClamp ? "Daha fazla" : "Daha az"}
              </span>
            </div>

            {/* Stock Status */}
            <div className="w-full flex justify-between items-center 0 ">
              <div
                className={` w-1/4 flex items-center justify-center md:text-lg font-semibold  p-2 rounded-lg  text-mywhite text-sm ${
                  product.inStock ? "bg-primary " : "bg-thirdLight"
                }`}
              >
                {product.inStock ? (
                  <p>
                    Stock In
                    {/* {t("productDetail.productİnStock")} */}
                  </p>
                ) : (
                  <p>
                    Out Of Stock
                    {/* {t("productDetail.productOutStock")} */}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end md:justify-center w-3/4 gap-2">
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

            {/* Counter and Add to Cart Button */}
            <div className="w-full flex justify-between  md:justify-center  items-center gap-4 flex-wrap ">
              <div className="w-full flex flex-row  justify-center items-center gap-10 lg:gap-8 ">
                <div className="md:w-1/4">
                  <Counter
                    increaseFunc={increaseFunc}
                    descreaseFunc={descreaseFunc}
                    cardProduct={cardProduct}
                  />
                </div>
                <div className="w-full">
                  {displayButton ? (
                    <Button
                      disabled={!displayButton}
                      onClick={() => removeToBasket(product.id)}
                      text={"Product In Cart"}
                      // title={t("productDetail.productInCart")}
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
                            ? "Add To Cart"
                            : // {t("productDetail.productAddCart")}
                              "Product Out of Stock "
                          // {t("productDetail.productOutStock")}
                        }
                        outline={!product.inStock}
                        color="primary"
                        size="large"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="w-full flex justify-end items-center gap-4">
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

                {/* Snackbar bildirim */}
                <Snackbar
                  open={open}
                  autoHideDuration={2000}
                  onClose={handleClose}
                >
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    className="w-full"
                  >
                    {/* {t("  SnackBar.coypLinkSuccess")} */}
                    Share link copied!
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
        </div>

        <Heading text="Reviews" center textSize="3xl" hr />

        {/* Reviews Section */}
        <div className=" space-y-4 mb-5">
          {product?.reviews?.map((prd: Review) => (
            <Comment key={prd.id} prd={prd} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default DetailClient;
