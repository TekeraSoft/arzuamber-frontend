"use client";

import GradientColorContainer from "@/components/Containers/BackGroundImageContainer";
import HomeContainer from "@/components/Containers/HomeContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
import { useTranslations } from "next-intl";
import PopulateProductSlider from "@/components/sliders/productSlider/PopulateProductSlider";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <HomeSlider />
      <GradientColorContainer>
        <HomeContainer>
          <Heading
            text={t("HomePage.sliderFeaturedTitle")}
            textSize="3xl"
            center={true}
          />
          <ProductSlider />
        </HomeContainer>

        <Brand
          color="standart"
          title={t("brand.title")}
          description={t("brand.description")}
          buttonText={t("brand.buttonText")}
          desktopImageUrl="/images/Brand/brand3.png"
          mobileImageUrl="/images/Brand/brand3-mobile.png"
          link="/products"
        />

        {/* <Category /> */}
        <HomeContainer>
          <Heading
            text={t("HomePage.sliderPopulateTitle")}
            center
            textSize="3xl"
          />
          <PopulateProductSlider />
        </HomeContainer>
        <Brand
          title={t("brand.title")}
          description={t("brand.description")}
          buttonText={t("brand.buttonText")}
          desktopImageUrl="/images/Brand/brand2.jpg"
          mobileImageUrl="/images/Brand/brand2.jpg"
          color="standart"
          link="/products"
        />
      </GradientColorContainer>
    </>
  );
}
