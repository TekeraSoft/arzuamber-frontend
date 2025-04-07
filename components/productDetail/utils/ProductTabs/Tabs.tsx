"use client";

import { useTranslations } from "next-intl";
import { TabView, TabPanel } from "primereact/tabview";
import ProductDescriptions from "./ProductDescriptions";
import Comments from "./Comments";
import CommentCreate from "./CommentCreate";
import SizeTable from "./SizeTable";

function Tabs({ description }) {
  const t = useTranslations();

  // Dinamik sekme listesi
  const tabItems = [
    {
      label: "Yorumlar",
      //   label: t("productDetail.reviews"),
      key: "reviews",
      content: <Comments />,
    },
    {
      label: "Yorum Ekle",
      //   label: t("productDetail.addReview"),
      key: "addReview",
      content: <CommentCreate />,
    },
    {
      label: t("productDetail.productDescription"),
      key: "description",
      content: <ProductDescriptions description={description} />,
    },
    {
      //   label: t("productDetail.sizeChart"),
      label: "Beden Tablosu",
      key: "sizeChart",
      content: <SizeTable />,
    },
  ];

  return (
    <div className="mb-3">
      <TabView>
        {tabItems.map((tab) => (
          <TabPanel key={tab.key} header={tab.label}>
            {tab.content}
          </TabPanel>
        ))}
      </TabView>
    </div>
  );
}

export default Tabs;
