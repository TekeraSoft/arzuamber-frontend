import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function ManualWhatsappMessage() {
  const phone = "905342608385";
  const message = encodeURIComponent(
    "Merhaba, bir siparişim var. Yardımcı olabilir misiniz?"
  );
  const whatsappLink = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="flex justify-center items-center ">
      <div className="text-center  rounded-lg max-w-md w-full">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success shadow-md text-xs md:text-sm flex justify-center items-center gap-2 bg-green-500 text-white w-full   px-3 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp size={24} />
          Siparişinizle ilgili hemen iletişime geçebilirsiniz.
        </a>
      </div>
    </div>
  );
}

export default ManualWhatsappMessage;
