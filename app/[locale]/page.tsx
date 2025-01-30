"use client";

import GradientColorContainer from "@/app/components/Containers/GradientColorContainer";
import Heading from "@/app/components/general/Heading";
import Brand from "@/app/components/home/Brand";
import Category from "@/app/components/home/Category";
import HomeSlider from "@/app/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/app/components/sliders/productSlider/ProductSlider";
import { useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation("common");

  return (
    <>
      <HomeSlider />

      <GradientColorContainer>
        <Category />
        <Heading text="Featured Products" center textSize="3xl" color="white" />
        <ProductSlider />
      </GradientColorContainer>

      <Heading text={t("hello")} center font="bold" textSize="3xl" />
      <Brand />
    </>
  );
}
