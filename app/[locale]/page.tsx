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
import SpecialCarts from "@/components/home/SpecialCarts";
import Image from "next/image";
import {Link} from "@/i18n/routing";

export default function Home() {
  const t = useTranslations();

  const CategoryBrand = dynamic(
    () => import("@/components/home/CategoryBrand"),
    { ssr: false }
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

      <SpecialCarts />

      <BackGroundImageContainer>

{/*        <HomeContainer>
          <div className={'flex md:flex-row flex-col items-center gap-x-12 justify-center my-12'}>
            <Image src={'/images/logo/df-img.gif'}
                   className={'rounded-full w-72 h-72'}
                   width={300} height={300} alt={'df-img.gif'} />
            <div className={'flex flex-col justify-center items-center gap-y-4'}>
              <h2 className={'md:text-4xl text-2xl mt-4 font-bold'}>Dijital Giyim'i keşfedin</h2>
              <Link
                  href={'/df'}
                  className={'p-3 flex items-center justify-center border rounded-lg hover:bg-secondary border-secondary hover:text-white transition-all'}>
                Ürünleri Görüntüle
              </Link>
            </div>
          </div>
        </HomeContainer>*/}

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
