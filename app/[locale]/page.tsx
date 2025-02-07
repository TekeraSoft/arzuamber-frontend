"use client";

import GradientColorContainer from "@/components/Containers/GradientColorContainer";
import HomeContainer from "@/components/Containers/HomeContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
// import Category from "@/components/home/Category";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
// import { useTranslations } from "next-intl";

export default function Home() {
  // const t = useTranslations();

  return (
    <>
      <HomeSlider />
      <GradientColorContainer>
        <HomeContainer>
          <Heading
            text="Popular Products"
            // text={t("HomePage.categoryTitle")}
            textSize="3xl"
            center={true}
            color="white"
          />
          <ProductSlider />
        </HomeContainer>
        <Brand />
        {/* <Category /> */}
        <HomeContainer>
          <Heading
            // text={t("HomePage.sliderTitle")}
            text="Featured Products"
            center
            textSize="3xl"
            color="white"
          />
          <ProductSlider />
        </HomeContainer>
      </GradientColorContainer>
    </>
  );
}
