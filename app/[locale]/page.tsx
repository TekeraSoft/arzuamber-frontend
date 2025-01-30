"use client";

import GradientColorContainer from "@/app/components/Containers/GradientColorContainer";
import Heading from "@/app/components/general/Heading";
import Brand from "@/app/components/home/Brand";
import Category from "@/app/components/home/Category";
import HomeSlider from "@/app/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/app/components/sliders/productSlider/ProductSlider";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <HomeSlider />
      <GradientColorContainer>
        <Category />
        <Heading
          text={t("HomePage.title")}
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
