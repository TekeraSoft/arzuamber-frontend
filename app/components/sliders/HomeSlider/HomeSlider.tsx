"use client";

import Carousel from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import HomeSliderItem from "./HomeSliderItem";
import { CarouselType } from "@/constans/HomeSlider";

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

function HomeSlider() {
  const { images, loading } = useSelector((state: RootState) => state.general);

  return (
    <div className="homepage-slider-div ">
      {loading ? (
        <Loading />
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={true}
          arrows={false}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .7s"
          transitionDuration={1000}
          containerClass="carousel-container "
          itemClass="flex justify-center items-center bg-center bg-cover "
        >
          {images?.map((image: CarouselType) => (
            <HomeSliderItem image={image} key={image.id} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default HomeSlider;
