"use client";

import GradientColorContainer from "@/components/Containers/GradientColorContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
import Category from "@/components/home/Category";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <HomeSlider />
      <GradientColorContainer>
        <Heading
          // text="All Categories"
          text={t("HomePage.categoryTitle")}
          textSize="4xl"
          center={true}
          color="white"
          hr={true}
        />

        <Category />
        <Heading
          text={t("HomePage.sliderTitle")}
          // text="Featured Products"
          center
          textSize="4xl"
          color="white"
        />
        <ProductSlider />
      </GradientColorContainer>

      <Brand />
    </>
  );
}
