import React, {useEffect} from "react";
import Carousel from "react-multi-carousel";
import Loading from "../../utils/Loading";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import ProductsSliderItem from "./ProductSliderItem";
import { Product } from "@/types/Props";
import {getNewSeasonProductsDispatch} from "@/store/productSlice";

interface ProductSliderProps {
  showNewSeason?: boolean;
  isPopulate?: boolean;
}

function ProductSlider({
  showNewSeason = false,
  isPopulate = false,
}: ProductSliderProps) {
  const dispatch = useDispatch<AppDispatch>();

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { newSeasonProducts, loading } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(()=> {
      dispatch(getNewSeasonProductsDispatch(0,15))
  },[dispatch])

  console.log(newSeasonProducts)

  return (
    <div className="homepage-slider-div py-5 border-b border-t border-secondary">
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
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .7s"
          transitionDuration={1000}
          containerClass="carousel-container"
          itemClass="flex justify-center items-center gap-4"
        >
          {newSeasonProducts?.map((product: Product, index) => (
            <ProductsSliderItem product={product} key={index} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default ProductSlider;
