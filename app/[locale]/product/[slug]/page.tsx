"use client";

import DetailClient from "@/components/productDetail/DetailClient";
import Loading from "@/components/utils/Loading";
import WarningText from "@/components/utils/WarningText";
import { RootState } from "@/store/store";
import { Product } from "@/types/Props";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslations } from "next-intl";

function ShopDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState<string | null>(null);
  const { products, loading } = useSelector(
      (state: RootState) => state.products
  );
  const t = useTranslations("");

  useEffect(() => {
    const fetchSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };

    fetchSlug();
  }, [params]);

  const product = products.find((product: Product) => product.id === slug);

  return (
      <div>
        {loading || !slug ? (
            <Loading />
        ) : product ? (
            <DetailClient product={product} />
        ) : (
            <WarningText
                title={t("warningText.ProductNotFoundTitle")}
                text={t("warningText.ProductNotFoundText")}
            />
        )}
      </div>
  );
}
export default ShopDetailPage;