"use client";

import BackGroundImageContainer from "@/components/Containers/BackGroundImageContainer";
import HomeContainer from "@/components/Containers/HomeContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
import { useTranslations } from "next-intl";
import PopulateProductSlider from "@/components/sliders/productSlider/PopulateProductSlider";
import Category from "@/components/home/Category";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import Map from "@/components/utils/Map";

export default function Home() {
  const t = useTranslations();

  const CategoryBrand = dynamic(
    () => import("@/components/home/CategoryBrand"),
    { ssr: false },
  );

  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "PageView");
    }
  }, []);

  return (
    <>
      <Category />
      <HomeSlider />

      <BackGroundImageContainer>
        <HomeContainer>
          <Heading
            text={t("HomePage.sliderFeaturedTitle")}
            textSize="xl"
            font="extrabold"
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
            textSize="xl"
          />
          <PopulateProductSlider />
        </HomeContainer>

        <Brand
          title={t("brand.title")}
          description={t("brand.description")}
          buttonText={t("brand.buttonText")}
          desktopImageUrl="/images/Brand/all-product-cat-image.jpg"
          mobileImageUrl="/images/Brand/all-product-cat-image.jpg"
          color="black"
          link="/products"
        />
        <CategoryBrand />
      </BackGroundImageContainer>
      <Map />
    </>
  );
}
