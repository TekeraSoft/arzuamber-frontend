import React from "react";
import { FaUser, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function OrderSummaryCustomerInfo() {
  return (
    <div className="w-full h-full px-2">
      <div className="border rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-300 text-[11px] sm:text-[13px] md:text-[14px]">
        <h2 className="text-gray-800 font-semibold mb-3 text-[14px] flex items-center gap-2 justify-center">
          Müşteri Bilgileri
        </h2>

        <div className="mb-4 space-y-2">
          <p className="flex items-start gap-2 text-gray-700">
            <FaUser className="mt-1 text-gray-600" />
            <span>
              <span className="font-bold text-gray-800">İsim: </span>
              Berk Certel
            </span>
          </p>

          <p className="flex items-start gap-2 text-gray-700">
            <FaPhoneAlt className="mt-1 text-gray-600" />
            <span>
              <span className="font-bold text-gray-800">Telefon: </span>
              0546 546 5857
            </span>
          </p>

          <p className="flex items-start gap-2 text-gray-700">
            <FaEnvelope className="mt-1 text-gray-600" />
            <span>
              <span className="font-bold text-gray-800">Email: </span>
              m.berkcertel@outlook.com
            </span>
          </p>
        </div>

        <div className="text-gray-700 flex flex-col items-start gap-2">
          <div className="flex items-center justify-start gap-1 min-w-[120px]">
            <FaMapMarkerAlt className="text-gray-600  text-lg" />
            <span className="font-bold text-gray-800">Sipariş Adresi:</span>
          </div>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            corrupti sapiente minus, ducimus eum est accusamus nisi repellendus
            explicabo? Debitis amet dolore, sapiente nulla aperiam qui minima
            ratione voluptas dolorem, molestias repellendus. Id fuga,
            consectetur tenetur quam quia expedita totam eligendi ipsum placeat
            culpa quidem laboriosam velit. Vero, explicabo a.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryCustomerInfo;
