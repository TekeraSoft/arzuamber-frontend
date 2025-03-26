"use client";

import { Accordion, AccordionTab } from "primereact/accordion";
import { TabView, TabPanel } from "primereact/tabview";
import { Card } from "primereact/card";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

function HelpPage() {
  const { helpItems } = useSelector((state: RootState) => state.general);

  return (
    <div className="min-h-[70vh] mx-2 md:container mt-12 md:mt-0 my-2">
      <Card
        title="Sıkça Sorulan Sorular"
        className="rounded-lg text-center text-"
      >
        <TabView>
          {helpItems.map((category) => (
            <TabPanel
              key={category.id}
              header={
                <div className="flex items-center gap-2 text-xs md:text-base">
                  <category.icon className="text-blue-500" size={18} />
                  <span className="font-semibold">{category.title}</span>
                </div>
              }
            >
              <Accordion activeIndex={0}>
                {category.questions.map((q) => (
                  <AccordionTab
                    key={q.id}
                    header={q.question}
                    className="text-xs md:text-sm"
                  >
                    <p className="text-start text-xs md:text-sm">{q.answer}</p>
                  </AccordionTab>
                ))}
              </Accordion>
            </TabPanel>
          ))}
        </TabView>
      </Card>
    </div>
  );
}

export default HelpPage;
