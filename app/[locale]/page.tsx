"use client";

import GradientColorContainer from "@/components/Containers/GradientColorContainer";
import HomeContainer from "@/components/Containers/HomeContainer";
import Heading from "@/components/general/Heading";
import Brand from "@/components/home/Brand";
// import Category from "@/components/home/Category";
import HomeSlider from "@/components/sliders/HomeSlider/HomeSlider";
import ProductSlider from "@/components/sliders/productSlider/ProductSlider";
import { useTranslations } from "next-intl";

export default function Home() {
    const t = useTranslations();

    return (
        <>
            <HomeSlider />
            <GradientColorContainer>
                <HomeContainer>
                    <Heading
                        text={t("HomePage.sliderFeaturedTitle")}
                        textSize="4xl"
                        center={true}
                    />
                    <ProductSlider isPopulate />
                </HomeContainer>

                <Brand
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
                        textSize="4xl"
                    />
                    <ProductSlider showNewSeason />

                    <Brand
                        title={t("brand.title")}
                        description={t("brand.description")}
                        buttonText={t("brand.buttonText")}
                        desktopImageUrl="/images/Brand/brand2.jpg"
                        mobileImageUrl="/images/Brand/brand2.png"
                        link="/products"
                    />

                    <Heading
                        text={t("HomePage.sliderAllProduct")}
                        center
                        textSize="4xl"
                    />
                    <ProductSlider />
                </HomeContainer>
            </GradientColorContainer>
        </>
    );
}