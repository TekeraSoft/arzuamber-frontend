"use client";

import ProductUpdateForm from "@/app/components/admin/Product/ProductUpdateForm";
import Loading from "@/app/components/utils/Loading";
import WarningText from "@/app/components/utils/WarningText";
import { RootState } from "@/store/store";
import { Product } from "@/types/Props";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function AdminUpdateProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState<string | null>(null);
  const { products, loading } = useSelector(
    (state: RootState) => state.products
  );

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
        <ProductUpdateForm product={product} />
      ) : (
        <WarningText
          title="Product Not Found"
          text="The product you're looking for could not be found."
        />
      )}
    </div>
  );
}
export default AdminUpdateProductPage;
