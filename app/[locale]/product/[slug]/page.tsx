"use client";

import DetailClient from "@/components/productDetail/DetailClient";
import Loading from "@/components/utils/Loading";
import WarningText from "@/components/utils/WarningText";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import { getProductBySlugDispatch } from "@/store/productSlice";
import { useParams } from "next/navigation";

function ShopDetailPage() {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { product, loading } = useSelector(
    (state: RootState) => state.products
  );
  const t = useTranslations("");

  useEffect(() => {
    dispatch(getProductBySlugDispatch(params.slug));
  }, [params, dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : product ? (
        <DetailClient product={product} />
      ) : (
        <WarningText
          title={t("warningText.notFoundProduct.title")}
          text={t("warningText.notFoundProduct.message")}
          href="/products"
          buttonText={t("warningText.notFoundProduct.browseMore")}
        />
      )}
    </div>
  );
}
export default ShopDetailPage;
