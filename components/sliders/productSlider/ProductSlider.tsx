import React, { useEffect } from "react";
import Carousel, { ArrowProps } from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ProductsSliderItem from "./ProductSliderItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import {
  getNewSeasonProductsDispatch,
  getPopulateProductsDispatch,
} from "@/store/productSlice";
import { Product } from "@/types";

function ProductSlider() {
  const dispatch = useDispatch<AppDispatch>();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 }, // 1400px üstü büyük ekran
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 }, // Standart masaüstü
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 }, // Tablet ekranı için düzeltme
      items: 2,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 }, // Küçük tabletler için
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 }, // Küçük mobil için
      items: 2,
    },
  };

  const { newSeasonProducts, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getNewSeasonProductsDispatch(0, 10));
  }, [dispatch]);

  function CustomLeftArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full left-0 z-5 opacity-70 bg-secondary p-1 md:p-3  hover:opacity-100"
        onClick={onClick}
      >
        <BiLeftArrow className="text-white" size={24} />
      </button>
    );
  }

  function CustomRightArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full right-0 z-5 opacity-70 bg-secondary p-1 md:p-3 hover:opacity-100"
        onClick={onClick}
      >
        <BiRightArrow className="text-white" size={24} />
      </button>
    );
  }

  return (
    <div className="homepage-slider-div relative z-5 ">
      {loading ? (
        <Loading />
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={false}
          arrows={true}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          customTransition="all .7s"
          transitionDuration={1000}
          containerClass="carousel-container"
          itemClass="flex justify-center items-center py-2 gap-2   "
        >
          {newSeasonProducts?.map((product: Product) => (
            <ProductsSliderItem product={product} key={product.id} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ProductSlider;
