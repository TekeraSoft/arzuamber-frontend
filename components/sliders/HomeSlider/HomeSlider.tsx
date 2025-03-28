"use client";

import Carousel from "react-multi-carousel";
import Loading from "../../utils/Loading";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import HomeSliderItem from "./HomeSliderItem";
import { useState, useEffect } from "react";
// import Button from "@/components/general/Button";
// import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { CarouselType } from "@/types";
import { getAllHomeSliderImages } from "@/store/generalSlice";

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

interface CustomDotProps {
  onClick: () => void;
  active: boolean;
}

const CustomDot: React.FC<CustomDotProps> = ({ onClick, active }) => {
  return (
    <li
      onClick={onClick}
      className={` flex justify-center items-center w-8 h-2 rounded-lg cursor-pointer transition-all duration-300  my-10  ${
        active ? "bg-primary scale-125" : "bg-secondary"
      }`}
    ></li>
  );
};

// // Özel buton grubu bileşeni
// const CustomButtonGroup = ({
//   next,
//   previous,
// }: {
//   next: () => void;
//   previous: () => void;
// }) => {
//   return (
//     <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between px-1">
//       <Button
//         color="secondary"
//         onClick={previous}
//         icon={BiLeftArrow}
//         size="icon"
//         type="button"
//         className="hover:scale-105 transition duration-300"
//       />
//       <Button
//         color="secondary"
//         onClick={next}
//         icon={BiRightArrow}
//         size="icon"
//         type="button"
//         className="hover:scale-105 transition duration-300"
//       />
//     </div>
//   );
// };

function HomeSlider() {
  const { homeSliderImages, loading } = useSelector(
    (state: RootState) => state.general
  );
  const dispatch = useDispatch<AppDispatch>();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    dispatch(getAllHomeSliderImages());
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="homepage-slider-div relative w-full   h-full flex justify-center items-center   ">
      {loading ? (
        <Loading />
      ) : (
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          showDots={!isMobile}
          customDot={<CustomDot onClick={() => {}} active={true} />}
          arrows={false}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={7000}
          keyBoardControl={true}
          renderDotsOutside={false}
          customTransition="all 300ms"
          transitionDuration={2000}
          containerClass="carousel-container  w-full  h-full HomeSliderContainer"
          itemClass="flex justify-center items-center"
          renderButtonGroupOutside={isMobile}
          //customButtonGroup={
          //  isMobile ? (
          //    <CustomButtonGroup next={() => {}} previous={() => {}} />
          //  ) : undefined
          //}
          dotListClass="flex justify-center items-center gap-2  z-10 "
        >
          {homeSliderImages?.map((image: CarouselType, index) => (
            <HomeSliderItem image={image} key={index} />
          ))}
        </Carousel>
      )}
    </div>
  );
}

export default HomeSlider;
