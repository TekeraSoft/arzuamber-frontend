import React, { useEffect } from "react";
import Carousel, { ArrowProps } from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import ProductsSliderItem from "./ProductSliderItem";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { getPopulateProductsDispatch } from "@/store/productSlice";
import { Product } from "@/types";

function PopulateProductSlider() {
  const dispatch = useDispatch<AppDispatch>();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1400 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 1400, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const { populateProducts, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(getPopulateProductsDispatch(0, 10));
  }, [dispatch]);

  function CustomLeftArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full left-2 opacity-70 bg-white p-1 md:p-3  hover:opacity-100"
        onClick={onClick}
      >
        <BiLeftArrow className="text-secondary" size={24} />
      </button>
    );
  }

  function CustomRightArrow({ onClick }: ArrowProps) {
    return (
      <button
        className="absolute rounded-full right-2 z-5 opacity-70 bg-white p-1 md:p-3 hover:opacity-100"
        onClick={onClick}
      >
        <BiRightArrow className="text-secondary" size={24} />
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
          itemClass="flex justify-center items-center py-5 px-0.5 md:px-0"
        >
          {populateProducts?.map((product: Product) => (
            <ProductsSliderItem product={product} key={product.id} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default PopulateProductSlider;
