"use client";

import Carousel from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ProductsSliderItem from "./ProductSliderItem";
import { Product } from "@/types/Props";

function ProductSlider() {
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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

  return (
    <div className="homepage-slider-div py-5   border-b  border-t ">
      {loading ? (
        <Loading />
      ) : (
        <>
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
            itemClass="flex justify-center items-center  md:p-10"
          >
            {products?.map((product: Product) => (
              <ProductsSliderItem product={product} key={product.id} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
}

export default ProductSlider;
