import Image from "next/image";
import PageContainer from "../Containers/PageContainer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

function CategoryClient({ filterProducts }) {
  const t = useTranslations();

  return (
    <PageContainer>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Ürünler</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProducts.map((product) => (
          <div
            key={product.id}
            className="  flex flex-col justify-between items-start border rounded-lg p-4 shadow-md"
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_RESOURCE_API}${product.colorSize[0].images[0]}`}
              alt={product.name}
              width={300}
              height={150}
              className="w-full object-cover mb-2 rounded-md"
              priority
            />
            <h3 className="text-lg font-medium">{product.name}</h3>
            <div className="flex  justify-between items-center w-full">
              <p className="text-gray-600">{product.price}₺</p>
              <Link
                href={`/product/${product.id}`}
                className="block mt-2 text-center px-1 md:px-3 md:py-2 bg-green-500 text-white rounded-md"
              >
                {t("productDetail.detail")}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}

export default CategoryClient;
