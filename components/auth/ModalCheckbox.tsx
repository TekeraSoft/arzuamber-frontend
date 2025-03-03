import { useState } from "react";
import { useDispatch } from "react-redux";
import { openDynamicModal } from "@/store/modalsSlice";
import { useTranslations } from "next-intl";

const ModalCheckbox = () => {
  const dispatch = useDispatch();
  const [checkedItems, setCheckedItems] = useState({});
  const t = useTranslations();

  const handleCheckboxChange = (title) => {
    setCheckedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const handleOpenModal = (title, content) => {
    dispatch(openDynamicModal({ title, content }));
  };

  const items = [
    { title: "KVKK Onayı", content: "Burada KVKK onay metni olacak..." },
    { title: "Gizlilik Politikası", content: "Gizlilik politikası metni..." },
    { title: "Kullanım Koşulları", content: "Kullanım koşulları metni..." },
    { title: "Hizmet Şartları", content: "Hizmet şartları metni..." },
  ];

  return (
    <div className="flex flex-col space-y-3">
      {items.map((item) => (
        <label
          key={item.title}
          className="flex justify-between items-center p-3 border border-secondary rounded-md cursor-pointer transition-all duration-300 hover:bg-gray-100"
        >
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={checkedItems[item.title] || false}
              onChange={() => handleCheckboxChange(item.title)}
              className="w-5 h-5 text-secondary border-secondary focus:ring-secondary"
            />
            <span className="text-secondary">{item.title}</span>
          </div>

          {/* Oku butonu */}
          <button
            type="button"
            onClick={() => handleOpenModal(item.title, item.content)}
            className="text-secondary  hover:underline"
          >
            Oku
          </button>
        </label>
      ))}
    </div>
  );
};

export default ModalCheckbox;
