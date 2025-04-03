"use client";

import { Accordion, AccordionTab } from "primereact/accordion";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  FaStar,
  FaShippingFast,
  FaUndoAlt,
  FaCreditCard,
  FaMoneyBillWave,
} from "react-icons/fa";
import { BiShieldAlt } from "react-icons/bi";
import { IconType } from "react-icons";

function HelpPage() {
  const { helpItems } = useSelector((state: RootState) => state.general);

  // İkon ismine göre bileşeni eşleştiren nesne
  const iconMap: Record<string, IconType> = {
    FaStar,
    FaShippingFast,
    FaUndoAlt,
    FaCreditCard,
    FaMoneyBillWave,
    BiShieldAlt,
  };

  return (
    <div className="min-h-[70vh] mx-2 md:container mt-10 md:mt-0  mb-5">
      <Card title="Sıkça Sorulan Sorular" className="rounded-lg text-center">
        <TabView>
          {helpItems.map((category) => {
            const IconComponent = iconMap[category.icon];

            return (
              <TabPanel
                key={category.id}
                header={
                  <div className="flex items-center gap-2 text-xs md:text-base">
                    {IconComponent && (
                      <IconComponent className="text-blue-500" size={18} />
                    )}
                    <span className="font-semibold">{category.title}</span>
                  </div>
                }
              >
                <Accordion activeIndex={0}>
                  {category.questions.map((q) => (
                    <AccordionTab
                      key={q.id}
                      header={q.question}
                      className="text-[10px] md:text-sm"
                    >
                      <p className="text-start text-xs md:text-sm">
                        {q.answer}
                      </p>
                    </AccordionTab>
                  ))}
                </Accordion>
              </TabPanel>
            );
          })}
        </TabView>
      </Card>
    </div>
  );
}

export default HelpPage;
