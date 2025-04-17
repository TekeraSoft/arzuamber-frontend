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
      <div className="flex justify-center items-center text-center  rounded-lg w-full md:max-w-md">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success text-xs md:text-sm flex justify-center items-center gap-1 bg-green-500 text-white w-11/12   px-3 py-2 rounded-lg hover:bg-green-600 transition duration-300"
        >
          <FaWhatsapp className="text-xl " />
          <p> Siparişinizle ilgili iletişime geçebilirsiniz.</p>
        </a>
      </div>
    </div>
  );
}

export default ManualWhatsappMessage;
