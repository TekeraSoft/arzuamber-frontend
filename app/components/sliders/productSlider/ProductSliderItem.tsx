"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
// import { HiCheckCircle, HiXCircle } from "react-icons/hi";

import Image from "next/image";
import TextClip from "../../utils/TextClip";
import Link from "next/link";
import { Rating } from "@mui/material";
import { Product, Review } from "@/types/Props";
// import { CartItem } from "@/store/cartSlice";
// import { FavItem } from "@/store/favoritesSlice";

interface ProductsSliderItemProps {
  product: Product;
}

function ProductsSliderItem({ product }: ProductsSliderItemProps) {
  // IMAGE HOVER
  const [isHovered, setIsHovered] = useState(false);

  // Rating
  const productRating =
    product?.reviews && product.reviews.length > 0
      ? product.reviews.reduce(
          (acc: number, item: Review) => acc + (item.rating || 0),
          0
        ) / product.reviews.length
      : 0;

  const ratingResult = isNaN(productRating) ? 0 : productRating;

  // Cart and Fav Add

  // const dispatch = useDispatch();
  // const carts = useSelector((state: RootState) => state.cart.carts);
  // const favs = useSelector((state: RootState) => state.favorites.favs);

  // const [cardProduct, setcardProduct] = useState<CardProductProps>({
  //   id: product.id,
  //   name: product.name,
  //   description: product.description,
  //   price: product.price,
  //   quantity: 1,
  //   image: product.images[0],
  //   inStock: product.inStock,
  // });

  // const increaseFunc = () => {
  //   if (cardProduct.quantity === 10) return;
  //   setcardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  // };

  // const descreaseFunc = () => {
  //   if (cardProduct.quantity === 1) return;
  //   setcardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  // };

  // const addToBasket = () => {
  //   if (!selectedSize) {
  //     return toast.error("Please Select Size.");
  //   }

  //   const cartData = {
  //     id: product?.id,
  //     name: product?.name,
  //     image: product.images[0],
  //     price: product?.price,
  //     quantity: cardProduct?.quantity,
  //     description: product?.description || "No description",
  //     inStock: product?.inStock || false,
  //     size: product.si,
  //   };
  //   dispatch(addToCart(cartData));
  // };

  // const AddToFav = () => {
  //   if (!selectedSize) {
  //     return toast.error("Please Select Size.");
  //   }

  //   const favData = {
  //     id: product?.id,
  //     name: product?.name,
  //     image: product.images[0],
  //     price: product?.price,
  //     quantity: cardProduct?.quantity,
  //     description: product?.description || "No description",
  //     inStock: product?.inStock || false,
  //     size: selectedSize,
  //   };

  //   dispatch(addToFav(favData));
  // };

  // const [displayButton, setDisplayButton] = useState<boolean>(false);
  // const [displayFav, setDisplayFav] = useState<boolean>(false);
  // const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // // Cart ve Fav kontrolü için ortak useEffect
  // useEffect(() => {
  //   const isProductInCart = carts.some(
  //     (cart: CartItem) => cart.id === product.id
  //   );
  //   const isProductInFav = favs.some((fav: FavItem) => fav.id === product.id);

  //   // Stok kontrolü: sepete eklemeyi etkiler ama favoriyi etkilemez
  //   if (product.inStock === false) {
  //     setDisplayButton(false); // Sepet butonunu devre dışı bırak
  //   } else {
  //     setDisplayButton(isProductInCart); // Stok varsa ve ürün sepette varsa, butonu göster
  //   }

  //   setDisplayFav(isProductInFav); // Favori butonu, stok durumu ile bağımsız çalışmalı
  // }, [carts, favs, product.id, product.inStock]);

  return (
    <div
      className="flex justify-center items-center flex-col space-y-1  rounded-lg   transition duration-500 h-[500px] p-5 w-[300px] relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative ">
        <div
          className={`flex flex-col items-start justify-start top-3 md:top-6 left-5 space-y-3 z-50 absolute inset-0 ${
            isHovered ? "visible" : " visible md:invisible"
          }`}
        >
          <div className=" absolute  flex flex-col gap-2 w-full transition-all duration-300 ">
            <button className="flex items-center justify-center w-8 h-8 bg-primary text-mywhite rounded-lg hover:bg-primaryLight hover:scale-110  shadow-md">
              <IoCart size={18} />
            </button>
            <button className="flex items-center justify-center w-8 h-8 bg-secondary text-mywhite rounded-lg hover:bg-secondaryLight hover:text-primary hover:scale-110 shadow-md">
              <FaHeart size={16} />
            </button>
            <Link
              href={`/product/${product.id}`}
              className="flex items-center justify-center w-8 h-8 bg-third text-mywhite rounded-lg hover:bg-thirdLight hover:scale-110 shadow-md z-50"
            >
              <IoMdEye size={18} />
            </Link>
          </div>
        </div>
        <div className="w-[300px] md:w-[400px] h-[350px] relative">
          <Image
            className={`absolute object-contain  rounded transition-opacity duration-700  ${
              isHovered ? "opacity-0" : "opacity-100 z-20"
            }`}
            src={product?.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          <Image
            className={` object-contain rounded transition-opacity duration-700  ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={product?.images[1]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>

      <div className="flex flex-col justify-start items-start gap-2 w-full">
        <Rating
          name="read-only"
          value={ratingResult}
          precision={0.5}
          readOnly
          size="small"
        />
        <h2 className="text-start text-secondary font-bold text-md  rounded-lg w-full ">
          {TextClip(product?.name)}
        </h2>

        <hr className="w-full" />
        <p className="text-slate-500 text-xs text-s">
          Original Price: <span className="line-through">{product.price}₺</span>
        </p>
        <p className=" text-sm">
          Discounted Price:
          <strong className="ml-1 text-green-600">
            {(
              product.price -
              (product.price * product.discountPercent) / 100
            ).toFixed(2)}
            ₺
          </strong>
        </p>
      </div>
      {/* <div className="flex items-center justify-center w-full">
        {product.inStock ? (
          <small className="flex items-center justify-center bg-secondary text-white text-md px-2 py-1 rounded-full w-full ">
            <HiCheckCircle className="mr-1" />
            In Stock
          </small>
        ) : (
          <small className="flex items-center justify-center bg-third text-white text-md  px-2 py-1 rounded-full w-full ">
            <HiXCircle className="mr-1" />
            Out of Stock
          </small>
        )}
      </div> */}
    </div>
  );
}

export default ProductsSliderItem;
