"use client";

import GradientColorContainer from "@/components/Containers/GradientColorContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
import Category from "@/components/home/Category";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
// import { useTranslations } from "next-intl";

export default function Home() {
  // const t = useTranslations();

  return (
    <>
      <HomeSlider />
      <GradientColorContainer>
        <Category />
        <Heading
          // text={t("HomePage.title")}
          text="Featured Products"
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
