"use client";

import Carousel from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import HomeSliderItem from "./HomeSliderItem";
import { CarouselType } from "@/constans/HomeSlider";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "@/components/general/Button";

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

// Özel buton grubu bileşeni
const CustomButtonGroup = ({
  next,
  previous,
}: {
  next: () => void;
  previous: () => void;
}) => {
  return (
    <div className="absolute bottom-4  flex justify-around w-full">
      <Button
        onClick={previous}
        icon={FaChevronLeft}
        size="cartIcon"
        iconSize={14}
      />
      <Button
        onClick={next}
        icon={FaChevronRight}
        iconSize={14}
        size="cartIcon"
      />
    </div>
  );
};

function HomeSlider() {
  const { images, loading } = useSelector((state: RootState) => state.general);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="homepage-slider-div relative">
      {loading ? (
        <Loading />
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={!isMobile}
          arrows={false}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          keyBoardControl={true}
          customTransition="all .7s"
          transitionDuration={1000}
          containerClass="carousel-container"
          itemClass="flex justify-center items-center bg-center bg-cover"
          renderButtonGroupOutside={isMobile} // Buton grubu dışarıda
          customButtonGroup={
            isMobile ? (
              <CustomButtonGroup next={() => {}} previous={() => {}} />
            ) : undefined
          }
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
